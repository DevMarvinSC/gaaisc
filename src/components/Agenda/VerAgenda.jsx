import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../../utils/SessionManager';
import { ref, onValue, update, remove } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './VerAgenda.css';

const VerAgenda = () => {
    const [eventos, setEventos] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('todos');
    const [editingItem, setEditingItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const navigate = useNavigate();
    const usuario = getCurrentUser();
    const matricula = usuario?.matricula; // Extraer solo la matrícula

    // useCallback con dependencia estable (solo matrícula)
    const loadData = useCallback(() => {
        if (!matricula) return;

        setLoading(true);

        // Cargar eventos
        const eventosRef = ref(database, `eventos/${matricula}`);
        const unsubscribeEventos = onValue(eventosRef, (snapshot) => {
            const eventosData = snapshot.val();
            const eventosArray = [];

            if (eventosData) {
                Object.keys(eventosData).forEach(key => {
                    eventosArray.push({
                        id: key,
                        ...eventosData[key],
                        tipo: 'evento'
                    });
                });
            }

            setEventos(eventosArray);
        });

        // Cargar tareas
        const tareasRef = ref(database, `tareas/${matricula}`);
        const unsubscribeTareas = onValue(tareasRef, (snapshot) => {
            const tareasData = snapshot.val();
            const tareasArray = [];

            if (tareasData) {
                Object.keys(tareasData).forEach(key => {
                    tareasArray.push({
                        id: key,
                        ...tareasData[key],
                        tipo: 'tarea'
                    });
                });
            }

            setTareas(tareasArray);
            setLoading(false);
        });

        // Función de limpieza
        return () => {
            unsubscribeEventos();
            unsubscribeTareas();
        };
    }, [matricula]); // ✅ Solo dependencia de matrícula (string estable)

    useEffect(() => {
        if (!matricula) {
            navigate('/login');
            return;
        }
        
        const unsubscribe = loadData();
        
        // Función de limpieza
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [loadData, matricula, navigate]); // ✅ Dependencias estables

    // Actualizar las funciones que usan usuario.matricula
    const handleCompletar = async (item) => {
        try {
            const path = item.tipo === 'evento'
                ? `eventos/${matricula}/${item.id}`
                : `tareas/${matricula}/${item.id}`;

            await update(ref(database, path), {
                completado: !item.completado
            });
        } catch (error) {
            console.error('Error actualizando estado:', error);
        }
    };

    const handleEliminarConfirmado = async () => {
        try {
            const path = itemToDelete.tipo === 'evento'
                ? `eventos/${matricula}/${itemToDelete.id}`
                : `tareas/${matricula}/${itemToDelete.id}`;

            await remove(ref(database, path));
            setShowDeleteModal(false);
            setItemToDelete(null);
        } catch (error) {
            console.error('Error eliminando:', error);
        }
    };

    const handleGuardarEdicion = async (updatedItem) => {
        try {
            const path = updatedItem.tipo === 'evento'
                ? `eventos/${matricula}/${updatedItem.id}`
                : `tareas/${matricula}/${updatedItem.id}`;

            // Remover propiedades que no deben actualizarse
            const { id, tipo, creadoEn, ...dataToUpdate } = updatedItem;

            await update(ref(database, path), dataToUpdate);
            setEditingItem(null);
        } catch (error) {
            console.error('Error actualizando:', error);
        }
    };

     const handleEditar = (item) => {
        setEditingItem(item);
    };

    const handleEliminarClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleCancelarEdicion = () => {
        setEditingItem(null);
    };

    const formatFecha = (fecha) => {
        if (!fecha) return 'Sin fecha';
        try {
            const [year, month, day] = fecha.split('-');
            const fechaLocal = new Date(year, month - 1, day);
            
            return fechaLocal.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            return 'Fecha inválida';
        }
    };

    const getItemsFiltrados = () => {
        const todosItems = [...eventos, ...tareas];

        // Función para obtener la fecha de comparación
        const getFechaComparacion = (item) => {
            if (item.tipo === 'evento') {
                return item.fecha ? new Date(item.fecha) : new Date(8640000000000000); // Fecha muy futura si no tiene fecha
            } else {
                return item.fechaEntrega ? new Date(item.fechaEntrega) : new Date(8640000000000000);
            }
        };

        // Función para obtener el peso de la prioridad
        const getPesoPrioridad = (prioridad) => {
            switch (prioridad) {
                case 'alta': return 3;
                case 'media': return 2;
                case 'baja': return 1;
                default: return 0;
            }
        };

        // Filtrar según la pestaña activa
        let itemsFiltrados;
        switch (activeTab) {
            case 'eventos':
                itemsFiltrados = todosItems.filter(item => item.tipo === 'evento');
                break;
            case 'tareas':
                itemsFiltrados = todosItems.filter(item => item.tipo === 'tarea');
                break;
            case 'completados':
                itemsFiltrados = todosItems.filter(item => item.completado);
                break;
            case 'pendientes':
                itemsFiltrados = todosItems.filter(item => !item.completado);
                break;
            default:
                itemsFiltrados = todosItems;
        }

        // Ordenar los items
        return itemsFiltrados.sort((a, b) => {
            // Primero por completado (los no completados primero)
            if (a.completado !== b.completado) {
                return a.completado ? 1 : -1;
            }

            // Luego por fecha (más próximos primero)
            const fechaA = getFechaComparacion(a);
            const fechaB = getFechaComparacion(b);
            
            if (fechaA.getTime() !== fechaB.getTime()) {
                return fechaA.getTime() - fechaB.getTime();
            }

            // Si tienen la misma fecha, ordenar por prioridad (alta primero)
            if (a.tipo === 'tarea' && b.tipo === 'tarea') {
                const prioridadA = getPesoPrioridad(a.prioridad);
                const prioridadB = getPesoPrioridad(b.prioridad);
                if (prioridadA !== prioridadB) {
                    return prioridadB - prioridadA; // Orden descendente (alta > media > baja)
                }
            }

            // Si todo es igual, ordenar alfabéticamente por título
            return a.titulo.localeCompare(b.titulo);
        });
    };

    const items = getItemsFiltrados();

    if (loading) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-3">Cargando agenda...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="display-5 fw-bold text-primary">Mi Agenda</h1>
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate('/Agenda')}
                        >
                            <i className="fas fa-arrow-left me-2"></i>
                            Volver
                        </button>
                    </div>

                    {/* Filtros */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="btn-group" role="group">
                                        <button
                                            type="button"
                                            className={`btn ${activeTab === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setActiveTab('todos')}
                                        >
                                            Todos
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${activeTab === 'eventos' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setActiveTab('eventos')}
                                        >
                                            Eventos
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${activeTab === 'tareas' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setActiveTab('tareas')}
                                        >
                                            Tareas
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${activeTab === 'pendientes' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setActiveTab('pendientes')}
                                        >
                                            Pendientes
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${activeTab === 'completados' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setActiveTab('completados')}
                                        >
                                            Completados
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-4 text-end">
                                    <small className="text-muted">
                                        Total: {items.length} items
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Items */}
                    {items.length === 0 ? (
                        <div className="text-center py-5">
                            <img className= 'fantasma' src="PublicIMG/nadaaqui.gif" alt="Nadaaqui" />
                            <h4 className="text-muted">No hay eventos o tareas en esta categoría</h4>
                            
                            <p className="text-muted">Crea nuevos eventos o tareas para verlos aquí</p>
                        </div>
                    ) : (
                        <div className="row">
                            {items.map((item) => (
                                <div key={`${item.tipo}-${item.id}`} className="col-lg-6 mb-3">
                                    {editingItem && editingItem.id === item.id ? (
                                        <FormularioEdicion
                                            item={item}
                                            onSave={handleGuardarEdicion}
                                            onCancel={handleCancelarEdicion}
                                        />
                                    ) : (
                                        <TarjetaItem
                                            item={item}
                                            onCompletar={handleCompletar}
                                            onEditar={handleEditar}
                                            onEliminar={handleEliminarClick}
                                            formatFecha={formatFecha}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Confirmación de Eliminación */}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar Eliminación</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de que deseas eliminar <strong>"{itemToDelete?.titulo}"</strong>?</p>
                                <p className="text-muted">Esta acción no se puede deshacer.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleEliminarConfirmado}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Componente para la tarjeta de item
const TarjetaItem = ({ item, onCompletar, onEditar, onEliminar, formatFecha }) => {
    const esEvento = item.tipo === 'evento';
    const esCompletado = item.completado;

    return (
        <div className={`card agenda-item ${esCompletado ? 'completado' : ''}`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center">
                        <span className={`badge bg-${esEvento ? 'primary' : 'success'} me-2`}>
                            {esEvento ? 'Evento' : 'Tarea'}
                        </span>
                        {esCompletado && (
                            <span className="badge bg-success me-2">
                                <i className="fas fa-check me-1"></i>
                                Completado
                            </span>
                        )}
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => onCompletar(item)}
                                >
                                    <i className={`fas ${esCompletado ? 'fa-undo' : 'fa-check'} me-2`}></i>
                                    {esCompletado ? 'Marcar como Pendiente' : 'Marcar como Completado'}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => onEditar(item)}
                                >
                                    <i className="fas fa-edit me-2"></i>
                                    Editar
                                </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button
                                    className="dropdown-item text-danger"
                                    onClick={() => onEliminar(item)}
                                >
                                    <i className="fas fa-trash me-2"></i>
                                    Eliminar
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <h5 className={`card-title ${esCompletado ? 'text-decoration-line-through text-muted' : ''}`}>
                    {item.titulo}
                </h5>

                {item.descripcion && (
                    <p className={`card-text ${esCompletado ? 'text-muted' : ''}`}>
                        {item.descripcion}
                    </p>
                )}

                <div className="item-details">
                    {esEvento ? (
                        <>
                            {item.fecha && (
                                <div className="detail-item">
                                    <i className="fas fa-calendar me-2 text-primary"></i>
                                    <span>{formatFecha(item.fecha)}</span>
                                </div>
                            )}
                            {item.hora && (
                                <div className="detail-item">
                                    <i className="fas fa-clock me-2 text-primary"></i>
                                    <span>{item.hora}</span>
                                </div>
                            )}
                            {item.ubicacion && (
                                <div className="detail-item">
                                    <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                                    <span>{item.ubicacion}</span>
                                </div>
                            )}
                            {item.tipo && item.tipo !== 'evento' && (
                                <div className="detail-item">
                                    <i className="fas fa-tag me-2 text-primary"></i>
                                    <span className="text-capitalize">{item.tipo}</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {item.fechaEntrega && (
                                <div className="detail-item">
                                    <i className="fas fa-calendar me-2 text-success"></i>
                                    <span>Entrega: {formatFecha(item.fechaEntrega)}</span>
                                </div>
                            )}
                            {item.materia && (
                                <div className="detail-item">
                                    <i className="fas fa-book me-2 text-success"></i>
                                    <span>{item.materia}</span>
                                </div>
                            )}
                            {item.prioridad && (
                                <div className="detail-item">
                                    <i className="fas fa-flag me-2 text-success"></i>
                                    <span className={`text-capitalize text-${getPrioridadColor(item.prioridad)}`}>
                                        {item.prioridad}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Componente para el formulario de edición
const FormularioEdicion = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item);
    const esEvento = item.tipo === 'evento';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const tiposEvento = [
        { value: 'academico', label: 'Académico' },
        { value: 'personal', label: 'Personal' },
        { value: 'social', label: 'Social' },
        { value: 'deportivo', label: 'Deportivo' },
        { value: 'otros', label: 'Otros' }
    ];

    const prioridades = [
        { value: 'baja', label: 'Baja' },
        { value: 'media', label: 'Media' },
        { value: 'alta', label: 'Alta' }
    ];

    const materias = [
        'Matemáticas',
        'Programación',
        'Bases de Datos',
        'Redes',
        'Ingeniería de Software',
        'Sistemas Operativos',
        'Inteligencia Artificial',
        'Otra'
    ];

    return (
        <div className="card agenda-item editing">
            <div className="card-body">
                <h5 className="card-title mb-3">Editando {esEvento ? 'Evento' : 'Tarea'}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            name="descripcion"
                            rows="2"
                            value={formData.descripcion || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    {esEvento ? (
                        <>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Fecha *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Hora</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="hora"
                                        value={formData.hora || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Ubicación</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ubicacion"
                                        value={formData.ubicacion || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Tipo</label>
                                    <select
                                        className="form-select"
                                        name="tipo"
                                        value={formData.tipo || 'academico'}
                                        onChange={handleInputChange}
                                    >
                                        {tiposEvento.map(tipo => (
                                            <option key={tipo.value} value={tipo.value}>
                                                {tipo.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Fecha de Entrega *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="fechaEntrega"
                                        value={formData.fechaEntrega}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Materia</label>
                                    <select
                                        className="form-select"
                                        name="materia"
                                        value={formData.materia || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona una materia</option>
                                        {materias.map((materia, index) => (
                                            <option key={index} value={materia}>{materia}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Prioridad</label>
                                <select
                                    className="form-select"
                                    name="prioridad"
                                    value={formData.prioridad || 'media'}
                                    onChange={handleInputChange}
                                >
                                    {prioridades.map(prioridad => (
                                        <option key={prioridad.value} value={prioridad.value}>
                                            {prioridad.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary flex-fill">
                            <i className="fas fa-save me-2"></i>
                            Guardar
                        </button>
                        <button type="button" className="btn btn-secondary flex-fill" onClick={onCancel}>
                            <i className="fas fa-times me-2"></i>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Función auxiliar para colores de prioridad
const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
        case 'alta': return 'danger';
        case 'media': return 'warning';
        case 'baja': return 'success';
        default: return 'secondary';
    }
};

export default VerAgenda;