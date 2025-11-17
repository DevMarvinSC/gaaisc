import React, { useState } from 'react';
import { getCurrentUser } from '../../utils/SessionManager';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Formularios.css';

const NuevaTarea = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaEntrega: '',
    materia: '',
    prioridad: 'media',
    estado: 'pendiente'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const usuario = getCurrentUser();

  const prioridades = [
    { value: 'baja', label: 'Baja', color: 'success' },
    { value: 'media', label: 'Media', color: 'warning' },
    { value: 'alta', label: 'Alta', color: 'danger' }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!usuario || !usuario.matricula) {
        throw new Error('No hay usuario autenticado');
      }

      // Validaciones
      if (!formData.titulo.trim()) {
        throw new Error('El título de la tarea es requerido');
      }

      if (!formData.fechaEntrega) {
        throw new Error('La fecha de entrega es requerida');
      }

      // Preparar datos de la tarea
      const tareaData = {
        ...formData,
        matricula: usuario.matricula,
        creadoEn: new Date().toISOString(),
        completado: false
      };

      // Guardar en Firebase
      const tareasRef = ref(database, `tareas/${usuario.matricula}`);
      await push(tareasRef, tareaData);

      setSuccess('Tarea creada correctamente');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/Agenda');
      }, 2000);

    } catch (err) {
      console.error('Error creando tarea:', err);
      setError(err.message || 'Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/Agenda');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-success text-white">
              <h2 className="mb-0 text-center">Nueva Tarea</h2>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">Título de la Tarea *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingresa el título de la tarea"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    rows="3"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Describe la tarea..."
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fechaEntrega" className="form-label">Fecha de Entrega *</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fechaEntrega"
                      name="fechaEntrega"
                      value={formData.fechaEntrega}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="materia" className="form-label">Materia</label>
                    <select
                      className="form-select"
                      id="materia"
                      name="materia"
                      value={formData.materia}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="">Selecciona una materia</option>
                      {materias.map((materia, index) => (
                        <option key={index} value={materia}>{materia}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="prioridad" className="form-label">Prioridad</label>
                    <select
                      className="form-select"
                      id="prioridad"
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      {prioridades.map((prioridad) => (
                        <option key={prioridad.value} value={prioridad.value}>
                          {prioridad.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creando...
                      </>
                    ) : (
                      'Crear Tarea'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaTarea;