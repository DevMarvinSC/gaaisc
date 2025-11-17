// Login.js
import React, { useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';
import activeheader from '../../pages/header'
import './LOGIN.css';
const Login = () => {
  const [formData, setFormData] = useState({
    matricula: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones básicas
    if (!formData.matricula.trim()) {
      setError('La matrícula es requerida');
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError('La contraseña es requerida');
      setLoading(false);
      return;
    }

    try {
      // Buscar usuario por matrícula en la base de datos
      const userRef = ref(database, `users/${formData.matricula}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        // Verificar contraseña (comparación directa ya que está en texto plano)
        if (userData.password === formData.password) {
          // Login exitoso - guardar datos de usuario en localStorage
          const userSession = {
            matricula: userData.matricula,
            nombre: userData.nombre,
            carrera: userData.carrera,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
          };
          
          localStorage.setItem('userSession', JSON.stringify(userSession));
          
          
          // Redirigir o actualizar estado de la aplicación
          window.location.href = '/dashboard'; // O usa react-router
          
        } else {
          setError('Contraseña incorrecta');
        }
      } else {
        setError('Matrícula no encontrada. Verifica o regístrate.');
      }
    } catch (error) {
      console.error('Error completo:', error);
      
      // Manejar errores específicos de Firebase
      if (error.code === 'PERMISSION_DENIED') {
        setError('Error de permisos. Contacta al administrador.');
      } else if (error.code === 'NETWORK_ERROR') {
        setError('Error de conexión. Verifica tu internet.');
      } else {
        setError('Error al iniciar sesión: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar si hay una sesión activa
  const checkExistingSession = () => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      if (userData.isLoggedIn) {
        // Redirigir si ya está logueado
        window.location.href = '/dashboard';
      }
    }
  };

  // Verificar sesión al cargar el componente
  React.useEffect(() => {
    checkExistingSession();
  }, []);

  return (
    <div className="login-page-container">
      {activeheader()}
      <div className="login-card">
        <div className="login-card-header">
          <div className="logo-container">
            <h1>🎓</h1>
          </div>
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para acceder al sistema</p>
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
              style={{ textTransform: 'uppercase' }}
              onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
  }}
            />
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
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          <div className="login-links">
            <a href="#forgot-password" className="link">¿Olvidaste tu contraseña?</a>
          </div>
        </form>

        <div className="login-card-footer">
          <p>¿No tienes cuenta? <a href="/register" className="register-link">Regístrate aquí</a></p>
        </div>
      </div> 
    </div>
  );
};

export default Login;