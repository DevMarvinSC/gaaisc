import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../utils/SessionManager';
import { useNavigate, useLocation } from 'react-router-dom';
import './GestionAgenda.css';

const GestionAgenda = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Efecto para resetear el estado cuando la ubicación cambia
  useEffect(() => {
    console.log('Location changed:', location.pathname);
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.matricula) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [location, navigate]); // Agregar location como dependencia

  const cardOptions = [
    {
      id: 1,
      title: 'Nuevo Evento',
      description: 'Crear un nuevo evento en tu agenda',
      image: '/images/evento-icon.png',
      path: '/NuevoEvento',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Nueva Tarea',
      description: 'Agregar una nueva tarea pendiente',
      image: '/images/tarea-icon.png',
      path: '/NuevaTarea',
      color: 'success'
    },
    {
      id: 3,
      title: 'Ver Agenda',
      description: 'Consultar tus eventos y tareas',
      image: '/images/agenda-icon.png',
      path: '/VerAgenda',
      color: 'info'
    }
  ];

  const handleCardClick = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  // Si no hay usuario, mostrar loading
  if (!user) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando...</p>
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
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">Gestión de Agenda</h1>
            <p className="lead text-muted">
              Organiza tus eventos y tareas académicas
            </p>
            <small className="text-muted">Usuario: {user.matricula}: {user.nombre}</small>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {cardOptions.map((card) => (
          <div key={card.id} className="col-md-4 mb-4">
            <div 
              className={`card agenda-card card-${card.color} h-100 shadow`}
              onClick={() => handleCardClick(card.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <div className={`icon-container mb-3 bg-${card.color}`}>
                  <i className={`fas ${getIconForCard(card.title)} text-white`}></i>
                </div>
                <h5 className="card-title fw-bold">{card.title}</h5>
                <p className="card-text text-muted">{card.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Función para obtener iconos según el tipo de tarjeta
const getIconForCard = (title) => {
  switch (title) {
    case 'Nuevo Evento':
      return 'fa-calendar-plus';
    case 'Nueva Tarea':
      return 'fa-tasks';
    case 'Ver Agenda':
      return 'fa-calendar-alt';
    default:
      return 'fa-calendar';
  }
};

export default GestionAgenda;