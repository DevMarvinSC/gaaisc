import React from 'react';
import { useEffect } from 'react';
//Images
import avatarmarvin from '../assets/img/AcercaDe/Marvin.png'
import avatarcolin from '../assets/img/AcercaDe/Colin.jpg'
import avatarturrubiates from '../assets/img/AcercaDe/Turrubiates.jpg'
import avatarisrael from '../assets/img/AcercaDe/Israel.jpg'
import './AcercaDeNosotros.css';

const AcercaDe = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, []);

  const scrummaster =
  {
    nombre: "Dr. Laura Vital Turrubiates",
    rol: "Scrum Master",
    descripcion: "Responsable de dar al esquipo scrum los requerimientos del sistema.",
    avatar: avatarturrubiates
  }
  // Datos de los integrantes del equipo
  const integrantes = [
    {
      id: 3,
      nombre: "Marvin Javier Sánchez Carrasco",
      rol: "Product Owner",
      descripcion: "Responsable del correcto desarrollo. Web Developer (HTML, ReactJS, JavaScript, CSS)",
      avatar: avatarmarvin
    },
    {
      id: 4,
      nombre: "Israel Gómez Acosta",
      rol: "Team development",
      descripcion: "Diseñador(UI)",
      avatar: avatarisrael
    },
    {
      id: 6,
      nombre: "Colin Espinosa",
      rol: "Team development",
      descripcion: "UX(User Experience)",
      avatar: avatarcolin
    }
    
  ];

  return (

    <div className="my-5">
      <div className='container'> 
        <section className="mb-5">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark">Nuestro Equipo</h1>
            <p className="lead text-muted">Conoce a las personas detrás de GestoDACyTI</p>
          </div>
          <div className="row g-4 scrummaster">
              <div className="col-md-1 col-lg-12">
                <div className="card h-120 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="mb-3 Avatar">
                      <img src={scrummaster.avatar} alt="Avatar" className="display-5" />

                    </div>
                    <h5 className="card-title fw-bold text-dark">{scrummaster.nombre}</h5>
                    <h6 className="card-subtitle mb-2 text-primary">{scrummaster.rol}</h6>
                    <p className="card-text text-muted">{scrummaster.descripcion}</p>
                  </div>
                </div>
              </div>
          </div>

          <div className="row g-3">
            {integrantes.map(integrante => (
              <div key={integrante.id} className="col-md-5 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="mb-3 Avatar">
                      <img src={integrante.avatar} alt="Avatar" className="display-1" />

                    </div>
                    <h5 className="card-title fw-bold text-dark">{integrante.nombre}</h5>
                    <h6 className="card-subtitle mb-2 text-primary">{integrante.rol}</h6>
                    <p className="card-text text-muted">{integrante.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección del Objetivo de la Página */}
        <section className="py-5 bg-light rounded-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="display-5 fw-bold mb-4">Nuestro Objetivo</h2>
                <div className="text-start">
                  <p className="lead mb-4">
                    <b>GestoDACyTI</b>, una aplicación web orientada a estudiantes universitarios que centralice
                    información académica institucional y ofrezca herramientas personalizadas de gestión de tareas
                    y eventos, con el fin de mejorar la organización escolar, optimizar el tiempo y facilitar
                    el acceso a datos relevantes de la trayectoria académica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AcercaDe;