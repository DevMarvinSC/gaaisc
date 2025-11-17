import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../utils/SessionManager';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import activeheader from '../../pages/header';

import './UserTap.css';

const StudentCard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegación

  const usuario = getCurrentUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!usuario || !usuario.matricula) {
          setError('No hay usuario autenticado');
          setLoading(false);
          return;
        }

        const userRef = ref(database, `users/${usuario.matricula}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Datos obtenidos de Firebase:", userData);
          
          const mappedData = {
            matricula: userData.matricula || "No Disponible",
            nombre: userData.nombre || "No Disponible",
            promedio: userData.promedio || "No Disponible",
            porcentaje: userData.porcentaje || "No Disponible",
            carrera: userData.carrera || "No Disponible",
            especialidad: userData.especialidad || "No Disponible",
            correo: userData.correo || userData.matricula || "No Disponible",
            telefono: userData.telefono || "No Disponible",
            semestre: userData.semestre || "No Disponible",
            turno: userData.turno || "No Disponible",
            fechaRegistro: userData.fechaRegistro || "No Disponible",
            // Nuevo campo para verificar si el perfil está completo
            perfilCompleto: userData.perfilCompleto || false
          };
          
          setStudentData(mappedData);
        } else {
          setError('No se encontraron datos del usuario');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [usuario]);

  // Función para redirigir al formulario de completar perfil
  const handleCompletarPerfil = () => {
    navigate('/CompletarPerfil');
  };

  // Función para determinar el color del promedio
  const getAverageColor = (avg) => {
    if (avg === "No Disponible") return "text-muted";
    const numericAvg = parseFloat(avg);
    if (numericAvg >= 9.0) return "text-success";
    if (numericAvg >= 8.0) return "text-primary";
    if (numericAvg >= 7.0) return "text-warning";
    return "text-danger";
  };

  // Función para formatear el avance curricular
  const formatProgress = (progress) => {
    if (progress === "No Disponible") return { value: "0%", display: "No Disponible" };
    
    if (typeof progress === 'string' && progress.includes('%')) {
      return { value: progress, display: progress };
    }
    
    const numericProgress = parseFloat(progress);
    if (!isNaN(numericProgress)) {
      return { value: `${numericProgress}%`, display: `${numericProgress}%` };
    }
    
    return { value: "0%", display: "No Disponible" };
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-center">
              <div className="card-body">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando datos estudiantiles...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-center">
              <div className="card-body">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-center">
              <div className="card-body">
                <div className="alert alert-warning" role="alert">
                  No se pudieron cargar los datos del estudiante
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressInfo = formatProgress(studentData.porcentaje);

  return (
    <div className="container my-5">
      {activeheader()}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card student-card shadow-lg">
            <div className="card-header bg-primary text-white text-center position-relative">
              <h2 className="mb-0">Credencial Estudiantil</h2>
              {/* Botón Completar Perfil */}
              {(!studentData.perfilCompleto || studentData.nombre === "No Disponible") && (
                <button 
                  className="btn btn-warning position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={handleCompletarPerfil}
                  style={{ zIndex: 1 }}
                >
                  Completar Perfil
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="profile-image mb-3">
                    <div className="avatar-circle">
                      <span className="initials">
                        {studentData.nombre !== "No Disponible" 
                          ? studentData.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                          : "ND"
                        }
                      </span>
                    </div>
                  </div>
                  <div className="university-badge">
                    <span className="badge bg-dark">Universidad Juárez Autónoma De Tabasco</span>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="student-info">
                    <h3 className="student-name">{studentData.nombre}</h3>
                    <div className="row mt-4">
                      <div className="col-sm-6">
                        <p><strong>Matrícula:</strong> {studentData.matricula}</p>
                        <p><strong>Carrera:</strong> {studentData.carrera}</p>
                        <p><strong>Semestre:</strong> {studentData.semestre}</p>
                        <p><strong>Turno:</strong> {studentData.turno}</p>
                      </div>
                      <div className="col-sm-6">
                        <p><strong>Promedio:</strong> 
                          <span className={`fw-bold ${getAverageColor(studentData.promedio)}`}> 
                            {studentData.promedio}
                          </span>
                        </p>
                        <p><strong>Avance Curricular:</strong></p>
                        <div className="progress mt-1" style={{height: '8px'}}>
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{width: progressInfo.value}}
                            aria-valuenow={progressInfo.value.replace('%', '')} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <small>{progressInfo.display}</small>
                        <p className="mt-2"><strong>Especialidad:</strong> {studentData.especialidad}</p>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <p><strong>Correo:</strong> {studentData.correo !== "No Disponible" ? `${studentData.correo}@alumno.ujat.mx` : "No Disponible"}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Teléfono:</strong> {studentData.telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted text-center">
              <small>Credencial válida para el ciclo escolar 2023-2024</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <StudentCard />
    </div>
  );
}

export default App;