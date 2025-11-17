import React, { useState } from 'react';
import { getCurrentUser } from '../../utils/SessionManager';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Formularios.css';

const NuevoEvento = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    tipo: 'academico'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const usuario = getCurrentUser();

  const tiposEvento = [
    { value: 'academico', label: 'Académico' },
    { value: 'personal', label: 'Personal' },
    { value: 'social', label: 'Social' },
    { value: 'deportivo', label: 'Deportivo' },
    { value: 'otros', label: 'Otros' }
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
        throw new Error('El título del evento es requerido');
      }

      if (!formData.fecha) {
        throw new Error('La fecha del evento es requerida');
      }

      // Preparar datos del evento
      const eventoData = {
        ...formData,
        matricula: usuario.matricula,
        creadoEn: new Date().toISOString(),
        completado: false
      };

      // Guardar en Firebase
      const eventosRef = ref(database, `eventos/${usuario.matricula}`);
      await push(eventosRef, eventoData);

      setSuccess('Evento creado correctamente');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/gestion-agenda');
      }, 2000);

    } catch (err) {
      console.error('Error creando evento:', err);
      setError(err.message || 'Error al crear el evento');
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
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0 text-center">Nuevo Evento</h2>
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
                  <label htmlFor="titulo" className="form-label">Título del Evento *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingresa el título del evento"
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
                    placeholder="Describe el evento..."
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha *</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="hora" className="form-label">Hora</label>
                    <input
                      type="time"
                      className="form-control"
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ubicacion"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleInputChange}
                      placeholder="Lugar del evento"
                      disabled={loading}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo de Evento</label>
                    <select
                      className="form-select"
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      {tiposEvento.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
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
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creando...
                      </>
                    ) : (
                      'Crear Evento'
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

export default NuevoEvento;