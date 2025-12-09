import { Link } from 'react-router-dom';
import React from 'react';
import { logout, getCurrentUser } from '../utils/SessionManager';
import activeheader from './header'; // Componente Header, acciones generales

// Images
import usertap from '../assets/Pages/UserTapLogo.png';
import agenda from '../assets/Pages/Agenda.png'
import detallesasig from '../assets/Pages/DetallesAsig.png';
//import trayectoria from '../assets/Pages/Trayectoria.png';
// Styles
import './Home.css';

function Home() {
    const user = getCurrentUser();

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            logout();
            
        }
    };

    // Si no hay usuario, redirigir al login
    if (!user) {
        window.location.href = '/';
        return null; 
    }

    return (
        <div className='home-container'>
            {activeheader()}
            {/* Header con botón de cerrar sesión */}
            <div className="home-header">
                <div className="user-welcome">
                    <h1>Bienvenido, {user.nombre}</h1>
                    <p>Matrícula: {user.matricula} | Carrera: {user.carrera}</p>
                </div>
                
                <button 
                    className="logout-btn-home"
                    onClick={handleLogout}
                    title="Cerrar sesión"
                >
                    <span className="logout-icon">🚪</span>
                    Cerrar Sesión
                </button>
            </div>

            <div className="rectangle"></div>
            <h2>¿Qué deseas consultar hoy?</h2>

            <div className='nav-buttons'>
                <div className='nav-button'>
                    <Link to="/UserTap">
                        <div className="button-content">
                            <img src={usertap} alt="Perfil de usuario" className="button-image" />
                            <span>Perfil</span>
                        </div>
                    </Link>
                </div>

                <div className='nav-button'>
                    <Link to="/Agenda">
                        <div className="button-content">
                            <img src={agenda} alt="Agenda" className="button-image" />
                            <span>Agenda</span>
                        </div>
                    </Link>
                </div>

                <div className='nav-button'>
                    <Link to="/Asignaturas">
                        <div className="button-content">
                            <img src={detallesasig} alt="Detalles de asignaturas" className="button-image" />
                            <span>Detalles Asignaturas</span>
                        </div>
                    </Link>
                </div>
                {/* 
                <div className='nav-button'>
                    <Link to="#">
                        <div className="button-content">
                            
                            <img src={trayectoria} alt="Trayectoria académica" className="button-image" />
                            <span>Trayectoria</span>
                        </div>
                    </Link>
                </div>
                */}
            </div>
        </div>
    );
}

export default Home;