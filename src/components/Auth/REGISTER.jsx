import React, { useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { database } from '../../firebase';
import './REGISTER.css';
import { useNavigate } from 'react-router-dom';
import activeheader from '../../pages/header';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matricula: '',
    nombre: '',
    carrera: '',
    password: '',
    telefono: '',
    semestre: '',
    porcentaje: '',
    promedio: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si el campo es matrícula, convertir a mayúsculas
    if (name === 'matricula') {
      setFormData({
        ...formData,
        [name]: value.toUpperCase()
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (!formData.matricula.trim()) {
      setError('La matrícula es requerida');
      setLoading(false);
      return;
    }

    try {
      // Convertir matrícula a mayúsculas para la referencia y guardado
      const matriculaMayusculas = formData.matricula.toUpperCase();
      
      const userRef = ref(database, `users/${matriculaMayusculas}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        setError('Esta matrícula ya está registrada');
        setLoading(false);
        return;
      }

      await set(userRef, {
        matricula: matriculaMayusculas, // Guardar en mayúsculas
        nombre: formData.nombre,
        carrera: formData.carrera,
        password: formData.password,
        fechaRegistro: new Date().toISOString(),
        telefono: '',
        semestre: '',
        porcentaje: '',
        promedio: ''
      });

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      setFormData({
        matricula: '',
        nombre: '',
        carrera: '',
        password: '',
        telefono: '',
        semestre: '',
        porcentaje: '',
        promedio: ''
      });
      navigate('/')

    } catch (error) {
      console.error('Error completo:', error);
      setError('Error al registrar usuario: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {activeheader()}
      <div className="login-card">
        <div className="login-card-header">
          <div className="logo-container">
            <h1>👨‍🎓</h1>
          </div>
          <h2>Crear Cuenta</h2>
          <p>Completa tus datos para registrarte en el sistema</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="matricula">Matrícula</label>
            <input
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              required
              placeholder="Ej: 20230001"
              autoComplete="username"
              className="form-input"
              style={{ textTransform: 'uppercase' }} // Mostrar en mayúsculas visualmente
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre completo"
              autoComplete="name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carrera">Carrera</label>
            <select
              id="carrera"
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Selecciona una carrera</option>
              <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
              <option value="Licenciatura en Informática Administrativa">Licenciatura en Informática Administrativa</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              className="form-input"
            />
            <div className="password-hint">
              La contraseña debe tener al menos 6 caracteres
            </div>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Registrando...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="login-card-footer">
          <p>¿Ya tienes cuenta? <a href="/" className="register-link">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;