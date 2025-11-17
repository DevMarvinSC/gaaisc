import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/SessionManager';
import activeheader from '../../pages/header'
import './Asignaturas.css';

/**
 * Componente para mostrar las asignaturas por ciclo académico
 * según la carrera del usuario autenticado
 */
function Asignaturas() {
    const usuario = getCurrentUser();
    const navigate = useNavigate();
    
    // Definición de asignaturas por ciclo y carrera
    const asignaturasPorCarrera = {
        "Ingeniería en Sistemas Computacionales": {
            ciclo1: [
                { id: "C0108001", nombre: "Algoritmos" },
                { id: "C0108004", nombre: "Proceso Administrativo" },
                { id: "C0108082", nombre: "Diseño Lógico" },
                { id: "C0100004", nombre: "Habilidades del Pensamiento" },
                { id: "C0108003", nombre: "Álgebra" },
                { id: "C0108002", nombre: "Análisis y Diseño de Procedimientos" }
            ],
            ciclo2: [
                { id: "C0108006", nombre: "Programación I" },
                { id: "programacion-orientada-objetos", nombre: "Álgebra Lineal" },
                { id: "estructuras-datos", nombre: "Cálculo Diferencial" },
                { id: "matematicas-discretas", nombre: "Organización de Computadoras" },
                { id: "administracion-proyectos", nombre: "Fundamento de Redes" },
                { id: "sistemas-operativos", nombre: "Contabilidad Básica" }
            ],
            "cicloCorto 1": [
                { id: "C0100003", nombre: "Comunicación Oral Y Escrita" },
                { id: "programacion-orientada-objetos", nombre: "Cálculo Integral" },
                { id: "estructuras-datos", nombre: "Arquitectura de Computadoras" }
            ],
            ciclo3: [
                { id: "C0100001", nombre: "Filosofía y Ética Profesional" },
                { id: "programacion-orientada-objetos", nombre: "Programación II" },
                { id: "estructuras-datos", nombre: "Estructura de Datos" },
                { id: "matematicas-discretas", nombre: "Matemáticas Discretas" },
                { id: "administracion-proyectos", nombre: "Planeación de Redes" },
                { id: "sistemas-operativos", nombre: "Metodología de la Investigación" }
            ],
            ciclo4: [
                { id: "C0100002", nombre: "Derechos Humanos, Sociedad y Medio Ambiente" },
                { id: "programacion-orientada-objetos", nombre: "Programación III" },
                { id: "estructuras-datos", nombre: "Ingeniería de Software" },
                { id: "matematicas-discretas", nombre: "Investigación de Operaciones" },
                { id: "administracion-proyectos", nombre: "Métodos Numéricos" },
                { id: "sistemas-operativos", nombre: "Temas Selectos de Redes" },
                { id: "C0100005", nombre: "Tecnologías de la Información y Comunicación" }
            ],
            "cicloCorto 2": [
                { id: "C0108020", nombre: "Inteligencia Artificial" },
                { id: "C0108008", nombre: "Sistemas Operativos" }
            ],
            ciclo5: [
                { id: "C0100001", nombre: "Desarrollo de Aplicaciones Multiplataforma" },
                { id: "programacion-orientada-objetos", nombre: "Laboratorio de Diseño de Software" },
                { id: "estructuras-datos", nombre: "Modelado, Diseño y Manejo de Bases de Datos" },
                { id: "matematicas-discretas", nombre: "Probabilidad y Estadística" },
                { id: "administracion-proyectos", nombre: "Técnicas de Graficación" },
                { id: "sistemas-operativos", nombre: "Inglés Técnico" }
            ],
            ciclo6: [
                { id: "C0100001", nombre: "Desarrollo Web" },
                { id: "programacion-orientada-objetos", nombre: "Fábrica de Software" },
                { id: "estructuras-datos", nombre: "Programación en Bases de Datos" },
                { id: "matematicas-discretas", nombre: "Sistemas Distribuidos" },
                { id: "administracion-proyectos", nombre: "Arquitectura de la Investigación" },
                { id: "sistemas-operativos", nombre: "Programación de Dispositivos Móviles" }
            ],
            "cicloCorto 3": [
                { id: "C0108007", nombre: "Legislación y Normatividad Informática" },
                { id: "C0108080", nombre: "Compiladores" }
            ],
            ciclo7: [
                { id: "estructuras-datos", nombre: "Optativa I" },
                { id: "administracion-proyectos", nombre: "Optativa II" },
                { id: "administracion-proyectos", nombre: "Optativa IV" },
                { id: "C0100001", nombre: "Algoritmos Avanzados" },
                { id: "programacion-orientada-objetos", nombre: "Administración de Bases de Datos" },
                { id: "matematicas-discretas", nombre: "Laboratorio de Inteligencia Artificial" },
                { id: "sistemas-operativos", nombre: "Emprendedores" }
            ],
            ciclo8: [
                { id: "C0100001", nombre: "Optativa III" },
                { id: "programacion-orientada-objetos", nombre: "Optativa v" },
                { id: "estructuras-datos", nombre: "Bases de Datos Distribuidas" },
                { id: "matematicas-discretas", nombre: "Laboratorio de Usabilidad" },
                { id: "administracion-proyectos", nombre: "Simulación" },
                { id: "sistemas-operativos", nombre: "Servicio Social" }
            ],
            ciclo9: [
                { id: "C0100007", nombre: "Práctica Profesional" }
            ]
        }
        // Se pueden agregar más carreras aquí
    };

    // Redirección si no hay usuario autenticado
    if (!usuario) {
        window.location.href = '/';
        return null;
    }

    /**
     * Maneja el clic en una asignatura
     * @param {string} idAsignatura - ID único de la asignatura
     */
    const manejarClicAsignatura = (idAsignatura) => {
        navigate(`/Asignaturas/${idAsignatura}`);
    };

    /**
     * Renderiza las asignaturas de un ciclo específico
     * @param {string} ciclo - Identificador del ciclo ('ciclo1', 'ciclo2', etc.)
     * @returns {JSX.Element|null} Componente con las asignaturas o null si no hay datos
     */
    const renderizarAsignaturas = (ciclo) => {
        const carreraData = asignaturasPorCarrera[usuario.carrera];
        
        if (!carreraData || !carreraData[ciclo]) {
            return null;
        }

        return carreraData[ciclo].map((asignatura) => (
            <div 
                key={`${ciclo}-${asignatura.id}`} 
                className="card asignatura"
                onClick={() => manejarClicAsignatura(asignatura.id)}
                role="button"
                tabIndex={0}
            >
                {asignatura.nombre}
            </div>
        ));
    };

    /**
     * Renderiza un ciclo académico completo
     * @param {number} numeroCiclo - Número del ciclo (1, 2, etc.)
     * @returns {JSX.Element|null} Componente del ciclo o null si no hay asignaturas
     */
    const renderizarCiclo = (numeroCiclo) => {
        const cicloKey = `ciclo${numeroCiclo}`;
        const asignaturas = renderizarAsignaturas(cicloKey);
        
        if (!asignaturas || asignaturas.length === 0) {
            return null;
        }

        return (
            <section className={`ciclo ciclo-${numeroCiclo}`}>
                <h3 className="titulo-ciclo">Ciclo {numeroCiclo}</h3>
                <div className="grid-asignaturas">
                    {asignaturas}
                </div>
            </section>
        );
    };

    return (
        <div className="contenedor-trayectoria">
            {activeheader()}
            <header className="cabecera-trayectoria">
                <button onClick={() => navigate('/Dashboard')} className="btn-volver">
                    Regresar
                </button>
                <h1>Asignaturas</h1>
                <p className="info-carrera">
                    Carrera: <strong>{usuario.carrera}</strong>
                </p>
            </header>
            
            <main className="contenido-principal">
                {renderizarCiclo(1)}
                {renderizarCiclo(2)}
                {renderizarCiclo("Corto 1")}
                {renderizarCiclo(3)}
                {renderizarCiclo(4)}
                {renderizarCiclo("Corto 2")}
                {renderizarCiclo(5)}
                {renderizarCiclo(6)}
                {renderizarCiclo("Corto 3")}
                {renderizarCiclo(7)}
                {renderizarCiclo(8)}
                {renderizarCiclo(9)}
            </main>
        </div>
    );
}

export default Asignaturas;