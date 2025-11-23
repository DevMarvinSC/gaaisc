import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/SessionManager';

import './Asignaturas.css';

/**
 * Componente para mostrar las asignaturas por ciclo académico
 * según la carrera del usuario autenticado
 */
function Asignaturas() {
    const usuario = getCurrentUser();
    const navigate = useNavigate();
    const [modalAbierto, setModalAbierto] = useState(false);
    const [seccionDestino, setSeccionDestino] = useState('');

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
                { id: "C0108065", nombre: "Álgebra Lineal" },
                { id: "C0108073", nombre: "Cálculo Diferencial" },
                { id: "C0108083", nombre: "Organización de Computadoras" },
                { id: "C0108010", nombre: "Fundamento de Redes" },
                { id: "C0108005", nombre: "Contabilidad Básica" }
            ],
            "cicloCorto 1": [
                { id: "C0100003", nombre: "Comunicación Oral Y Escrita" },
                { id: "C0108074", nombre: "Cálculo Integral" },
                { id: "C0108084", nombre: "Arquitectura de Computadoras" }
            ],
            ciclo3: [
                { id: "C0100001", nombre: "Filosofía y Ética Profesional" },
                { id: "C0108064", nombre: "Programación II" },
                { id: "C0108067", nombre: "Estructura de Datos" },
                { id: "C0108009", nombre: "Matemáticas Discretas" },
                { id: "C0108014", nombre: "Planeación de Redes" },
                { id: "C0108013", nombre: "Metodología de la Investigación" }
            ],
            ciclo4: [
                { id: "C0100002", nombre: "Derechos Humanos, Sociedad y Medio Ambiente" },
                { id: "C0108066", nombre: "Programación III" },
                { id: "C0108011", nombre: "Ingeniería de Software" },
                { id: "C0108087", nombre: "Investigación de Operaciones" },
                { id: "C0108085", nombre: "Métodos Numéricos" },
                { id: "C0108089", nombre: "Temas Selectos de Redes" },
                { id: "C0100005", nombre: "Tecnologías de la Información y Comunicación" }
            ],
            "cicloCorto 2": [
                { id: "C0108020", nombre: "Inteligencia Artificial" },
                { id: "C0108008", nombre: "Sistemas Operativos" }
            ],
            ciclo5: [
                { id: "C0108088", nombre: "Desarrollo de Aplicaciones Multiplataforma" },
                { id: "C0108015", nombre: "Laboratorio de Diseño de Software" },
                { id: "C0108012", nombre: "Modelado, Diseño y Manejo de Bases de Datos" },
                { id: "C0108075", nombre: "Probabilidad y Estadística" },
                { id: "C0108076", nombre: "Técnicas de Graficación" },
                { id: "C0108018", nombre: "Inglés Técnico" }
            ],
            ciclo6: [
                { id: "C0108068", nombre: "Desarrollo de Aplicaciones Web" },
                { id: "C0108069", nombre: "Fábrica de Software" },
                { id: "C0108016", nombre: "Programación en Bases de Datos" },
                { id: "C0108081", nombre: "Sistemas Distribuidos" },
                { id: "C0108077", nombre: "Arquitectura de la Investigación" },
                { id: "C0108070", nombre: "Programación de Dispositivos Móviles" }
            ],
            "cicloCorto 3": [
                { id: "C0108007", nombre: "Legislación y Normatividad Informática" },
                { id: "C0108080", nombre: "Compiladores" }
            ],
            ciclo7: [
                { id: "C0108071", nombre: "Algoritmos Avanzados" },
                { id: "C0108019", nombre: "Administración de Bases de Datos" },
                { id: "C0108078", nombre: "Laboratorio de Inteligencia Artificial" },
                { id: "C0108017", nombre: "Emprendedores" },
                { id: "OP1", nombre: "Optativa I" },
                { id: "OP2", nombre: "Optativa II" },
                { id: "OP3", nombre: "Optativa III" }
            ],
            ciclo8: [
                { id: "estructuras-datos", nombre: "Bases de Datos Distribuidas" },
                { id: "matematicas-discretas", nombre: "Laboratorio de Usabilidad" },
                { id: "administracion-proyectos", nombre: "Simulación" },
                { id: "sistemas-operativos", nombre: "Servicio Social" },
                { id: "OP4", nombre: "Optativa IV" },
                { id: "OP5", nombre: "Optativa V" }
            ],
            ciclo9: [
                { id: "C0100007", nombre: "Práctica Profesional" }
            ],
             "Aplicaciones Empresariales":[
                {id: "C0108090", nombre: "Social Business"},
                {id: "C0108091", nombre: "Comercio Electrónico"},
                {id: "C0108092", nombre: "Cómputo en la Nube"},
                {id: "C0108093", nombre: "Dashboard"},
            ],

            "Aplicaciones Móviles": [
                {id: "C0108094", nombre: "Entorno de Desarrollo para Dispositivos Móviles"},
                {id: "C0108095", nombre: "Simuladores en Dispositivos Móviles"},
                {id: "C0108096", nombre: "Realidad Aumentada"},
                {id: "C0108097", nombre: "Laboratorio de Aplicaciones para Dispositivos Móviles"},
            ],
             "Aplicaciones Educativas":[
                {id: "C0108098", nombre: "Informática Educativa"},
                {id: "C0108099", nombre: "Desarrollo de Software Educativo"},
                {id: "C0108100", nombre: "Redes Sociales  Educativas"},
                {id: "C0108101", nombre: "Aplicaciones Educativas Móviles"},

            ],
             "Seminario de Titulación":[
                {id: "C0108102", nombre: "Seminario de Investigación I"},
                {id: "C0108103", nombre: "Seminario de Investigación II"},
                {id: "C0108104", nombre: "Seminario de Desarrollo Tecnológico I"},
                {id: "C0108105", nombre: "Seminario de Desarrollo Tecnológico II"},

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
        if (idAsignatura === 'OP1' || idAsignatura === 'OP2' || idAsignatura === 'OP3' || idAsignatura === 'OP4' || idAsignatura === 'OP5') {
            setSeccionDestino('seccion-optativas');
            setModalAbierto(true);
        } else {
            navigate(`/Asignaturas/${idAsignatura}`);
        }
    };

    /**
     * Cierra el modal y navega a la sección correspondiente
     */
    const cerrarModal = () => {
        setModalAbierto(false);
        if (seccionDestino) {
            setTimeout(() => {
                const elemento = document.getElementById(seccionDestino);
                if (elemento) {
                    elemento.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
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
                className={`card asignatura ${asignatura.id.startsWith('OP') ? 'asignatura-no-disponible' : ''}`}
                onClick={() => manejarClicAsignatura(asignatura.id)}
                role="button"
                tabIndex={0}
            >
                {asignatura.nombre}
                {asignatura.id.startsWith('OP') && (
                    <span className="badge-no-disponible">Seleccionable</span>
                )}
            </div>
        ));
    };

    /**
     * Renderiza un ciclo académico completo
     * @param {number|string} numeroCiclo - Número del ciclo (1, 2, "Corto 1", etc.)
     * @returns {JSX.Element|null} Componente del ciclo o null si no hay asignaturas
     */
    const renderizarCiclo = (numeroCiclo) => {
        let cicloKey;
        if (typeof numeroCiclo === 'number') {
            cicloKey = `ciclo${numeroCiclo}`;
        } else {
            // Caso por defecto o manejo de error
            cicloKey = numeroCiclo;
        }

        

        const asignaturas = renderizarAsignaturas(cicloKey);

        if (!asignaturas || asignaturas.length === 0) {
            return null;
        }

        return (
            <section className={`ciclo ciclo-${numeroCiclo}`}>
                <h3 className="titulo-ciclo">
                    {typeof numeroCiclo === 'number' ? `Ciclo ${numeroCiclo}` : numeroCiclo}
                </h3>
                <div className="grid-asignaturas">
                    {asignaturas}
                </div>
            </section>
        );
    };

    return (
        <div className="contenedor-trayectoria">
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

                {/* Sección de información sobre optativas */}
                <section id="seccion-optativas" className="seccion-informativa">
                    <h3>Información sobre Optativas</h3>
                    <p>
                        Estas asignaturas corresponderán a la especialidad escogida.
                    </p>
                    <div className="info-adicional">
                        <h4>Especialidades para {usuario.carrera}:</h4>
                        {renderizarCiclo("Aplicaciones Empresariales")}
                        {renderizarCiclo("Aplicaciones Móviles")}
                        {renderizarCiclo("Aplicaciones Educativas")}
                        {renderizarCiclo("Seminario de Titulación")}
                    </div>
                </section>
            </main>

            {/* Modal para materias no disponibles */}
            {modalAbierto && (
                <div 
                    className="modal-overlay"
                    onClick={cerrarModal}
                >
                    <div 
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="modal-close"
                            onClick={cerrarModal}
                        >
                            ×
                        </button>
                        <h3>¡Asignatura Optativa!</h3>
                        <p>La asignatura seleccionada se trata de una optativa.</p>
                        <p>Serás redirigido a la sección de información sobre optativas.</p>
                        <div className="modal-actions">
                            <button 
                                className="btn-primary"
                                onClick={cerrarModal}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Asignaturas;