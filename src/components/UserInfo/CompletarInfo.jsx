import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../utils/SessionManager';
import { ref, set, get } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './CompletarInfo.css';

const CompletarPerfil = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    carrera: '',
    especialidad: '',
    telefono: '',
    semestre: '',
    turno: '',
    porcentaje: '', // Ahora admite decimales
    promedio: ''    
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const navigate = useNavigate();
  const usuario = getCurrentUser();

  // Opciones para los select
  const carreras = [
    'Ingeniería en Sistemas Computacionales',
    'Informática Administrativa'
  ];

  const especialidades = [
    'Desarrollo Móvil',
    'Software Educativo',
    'Software Empresarial'
  ];

  const semestres = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°'];
  const turnos = ['Matutino', 'Vespertino', 'Nocturno'];

  useEffect(() => {
    // Cargar datos existentes del usuario si los hay
    const loadUserData = async () => {
      if (!usuario || !usuario.matricula || dataLoaded) return;

      try {
        setLoading(true);
        const userRef = ref(database, `users/${usuario.matricula}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Datos cargados:", userData);
          
          // Si el porcentaje tiene %, lo removemos para el formulario
          let porcentajeValue = userData.porcentaje || '';
          if (typeof porcentajeValue === 'string' && porcentajeValue.includes('%')) {
            porcentajeValue = porcentajeValue.replace('%', '');
          }
          
          setFormData({
            nombre: userData.nombre || '',
            carrera: userData.carrera || '',
            especialidad: userData.especialidad || '',
            telefono: userData.telefono || '',
            semestre: userData.semestre || '',
            turno: userData.turno || '',
            porcentaje: porcentajeValue,
            promedio: userData.promedio || ''
          });
        }
        setDataLoaded(true);
      } catch (err) {
        console.error('Error cargando datos del usuario:', err);
        setError('Error al cargar los datos existentes');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [usuario, dataLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para validar y formatear el promedio
  const handlePromedioChange = (e) => {
    const value = e.target.value;
    
    // Permitir solo números y un punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      // Validar que el promedio esté entre 0 y 10
      if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 10)) {
        setFormData(prevState => ({
          ...prevState,
          promedio: value
        }));
      }
    }
  };

  // Función para validar y formatear el porcentaje (ahora con decimales)
  const handlePorcentajeChange = (e) => {
    const value = e.target.value;
    
    // Permitir números y hasta un punto decimal con máximo 2 decimales
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      // Validar que el porcentaje esté entre 0 y 100
      if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
        setFormData(prevState => ({
          ...prevState,
          porcentaje: value
        }));
      }
    }
  };

  // Función para formatear el porcentaje al perder el foco
  const handlePorcentajeBlur = (e) => {
    const value = e.target.value;
    if (value && value !== '') {
      // Asegurar que tenga 2 decimales
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toFixed(2);
        setFormData(prevState => ({
          ...prevState,
          porcentaje: formattedValue
        }));
      }
    }
  };

  // Función para formatear el promedio al perder el foco
  const handlePromedioBlur = (e) => {
    const value = e.target.value;
    if (value && value !== '') {
      // Asegurar que tenga 2 decimales
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toFixed(2);
        setFormData(prevState => ({
          ...prevState,
          promedio: formattedValue
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando formulario...");
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!usuario || !usuario.matricula) {
        throw new Error('No hay usuario autenticado');
      }

      // Validaciones básicas
      if (!formData.nombre.trim()) {
        throw new Error('El nombre es requerido');
      }

      if (!formData.carrera) {
        throw new Error('La carrera es requerida');
      }

      if (!formData.telefono.trim()) {
        throw new Error('El teléfono es requerido');
      }

      // Validaciones para porcentaje y promedio
      if (formData.porcentaje) {
        const porcentajeNum = parseFloat(formData.porcentaje);
        if (isNaN(porcentajeNum) || porcentajeNum < 0 || porcentajeNum > 100) {
          throw new Error('El porcentaje debe estar entre 0.00 y 100.00');
        }
      }

      if (formData.promedio) {
        const promedioNum = parseFloat(formData.promedio);
        if (isNaN(promedioNum) || promedioNum < 0 || promedioNum > 10) {
          throw new Error('El promedio debe estar entre 0.00 y 10.00');
        }
      }

      // Obtener datos actuales del usuario
      const userRef = ref(database, `users/${usuario.matricula}`);
      const snapshot = await get(userRef);
      const currentData = snapshot.exists() ? snapshot.val() : {};

      // Preparar datos para guardar
      const userDataToSave = {
        ...currentData,
        ...formData,
        matricula: usuario.matricula,
        perfilCompleto: false,
        fechaActualizacion: new Date().toISOString()
      };

      // Formatear porcentaje para asegurar que tenga el símbolo % y 2 decimales
      if (userDataToSave.porcentaje) {
        const porcentajeNum = parseFloat(userDataToSave.porcentaje);
        if (!isNaN(porcentajeNum)) {
          userDataToSave.porcentaje = `${porcentajeNum.toFixed(2)}%`;
        }
      }

      // Formatear promedio para asegurar 2 decimales
      if (userDataToSave.promedio) {
        const promedioNum = parseFloat(userDataToSave.promedio);
        if (!isNaN(promedioNum)) {
          userDataToSave.promedio = promedioNum.toFixed(2);
        }
      }

      console.log("Guardando datos:", userDataToSave);

      // Guardar en Firebase
      await set(userRef, userDataToSave);

      setSuccess('Perfil actualizado correctamente');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/UserTap');
      }, 2000);

    } catch (err) {
      console.error('Error actualizando perfil:', err);
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/UserTap');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0 text-center">Completar Perfil Estudiantil</h2>
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

              <form onSubmit={handleSubmit} id="perfilForm">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="matricula" className="form-label">Matrícula</label>
                    <input
                      type="text"
                      className="form-control"
                      id="matricula"
                      value={usuario?.matricula || ''}
                      disabled
                    />
                    <div className="form-text">Tu matrícula no puede ser modificada</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      placeholder="Ingresa tu nombre completo"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="carrera" className="form-label">Carrera *</label>
                    <select
                      className="form-select"
                      id="carrera"
                      name="carrera"
                      value={formData.carrera}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Selecciona tu carrera</option>
                      {carreras.map((carrera, index) => (
                        <option key={index} value={carrera}>{carrera}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="especialidad" className="form-label">Especialidad</label>
                    <select
                      className="form-select"
                      id="especialidad"
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="">Selecciona tu especialidad</option>
                      {especialidades.map((especialidad, index) => (
                        <option key={index} value={especialidad}>{especialidad}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="semestre" className="form-label">Semestre</label>
                    <select
                      className="form-select"
                      id="semestre"
                      name="semestre"
                      value={formData.semestre}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="">Selecciona tu semestre</option>
                      {semestres.map((semestre, index) => (
                        <option key={index} value={semestre}>{semestre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="turno" className="form-label">Turno</label>
                    <select
                      className="form-select"
                      id="turno"
                      name="turno"
                      value={formData.turno}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="">Selecciona tu turno</option>
                      {turnos.map((turno, index) => (
                        <option key={index} value={turno}>{turno}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Campos para Porcentaje y Promedio */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="porcentaje" className="form-label">Porcentaje Académico</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="porcentaje"
                        name="porcentaje"
                        value={formData.porcentaje}
                        onChange={handlePorcentajeChange}
                        onBlur={handlePorcentajeBlur}
                        placeholder="0.00 - 100.00"
                        disabled={loading}
                        maxLength="6"
                      />
                      <span className="input-group-text">%</span>
                    </div>
                    <div className="form-text">Ingresa tu porcentaje de avance curricular (0.00 - 100.00)</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="promedio" className="form-label">Promedio</label>
                    <input
                      type="text"
                      className="form-control"
                      id="promedio"
                      name="promedio"
                      value={formData.promedio}
                      onChange={handlePromedioChange}
                      onBlur={handlePromedioBlur}
                      placeholder="0.00 - 10.00"
                      disabled={loading}
                      maxLength="5"
                    />
                    <div className="form-text">Ingresa tu promedio general (0.00 - 10.00)</div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingresa tu número de teléfono"
                    disabled={loading}
                  />
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
                        Guardando...
                      </>
                    ) : (
                      'Guardar Perfil'
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

export default CompletarPerfil;