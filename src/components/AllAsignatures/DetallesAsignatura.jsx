import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/SessionManager';
import activeheader from '../../pages/header'
import './DetallesAsignaturas.css';
/**
 * Componente para mostrar el detalle de una asignatura específica
 */
function DetalleAsignatura() {
    const { id } = useParams();
    const navigate = useNavigate();
    const usuario = getCurrentUser();

    // Base de datos de asignaturas con información detallada y rutas de PDF
    const informacionAsignaturas = {
        // CICLO 1
        "C0108001": {
            nombre: "Algoritmos",
            ciclo: 1,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108001_Algoritmos.pdf" // 1
        },
        
        "C0108004": {
            nombre: "Proceso Administrativo",
            ciclo: 1,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108004_Proceso_Administrativo.pdf" //2
        },
        "C0108082": {
            nombre: "Diseño Lógico",
            ciclo: 1,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108082_Diseño_Lógico.pdf" //3
        },
        "C0108002": {
            nombre: "Análisis y Diseño de Procedimientos",
            ciclo: 1,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108002_Análisis_y_Diseño_de_Procedimientos.pdf" //4
        },
        "C0108065": {
            nombre: "Algebra Lineal",
            ciclo: 1,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108065_Algebra_Lineal.pdf" //5
        },
        "C0108003": {
            nombre: "Álgebra",
            ciclo: 1,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108003_Álgebra.pdf" //6
        },
        // CICLO 2
        "C0108006": {
            nombre: "Programación I",
            ciclo: 2,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108006_Programación_I.pdf"
        },
        "40": {
            nombre: "Programación I",
            ciclo: 2,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108006_Programación_I.pdf"
        },
        "C0100001": {
            nombre: "Filosofía y Ética Profesional",
            ciclo: 3,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108006_Programación_I.pdf"
        },
        "C0100002": {
            nombre: "Derechos Humanos, Sociedad y Medio Ambiente",
            ciclo: 4,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108006_Programación_I.pdf"
        },
        "C0100003": {
            nombre: "Comunicación Oral y Escrita",
            ciclo: "Ciclo Corto 1",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108006_Programación_I.pdf"
        },
        "C0100004": {
            nombre: "Habilidades del Pensamiento",
            ciclo: 2,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0100004_Habilidades_del_Pensamiento.pdf"
        }

        // Agrega más asignaturas aquí...
    };

    // Redirección si no hay usuario autenticado
    if (!usuario) {
        window.location.href = '/';
        return null;
    }

    const asignatura = informacionAsignaturas[id];

    if (!asignatura) {
        return (
            <div className="contenedor-detalle">
                {activeheader() }
                <div className="error-detalle">
                    <h2>Asignatura no encontrada</h2>
                    <p>La asignatura que buscas no existe en nuestro sistema.</p>
                    <button onClick={() => navigate('/Asignaturas')} className="btn-volver">
                        Volver al plan de estudios
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contenedor-detalle">
            {activeheader()}
            <header className="cabecera-detalle">
                <button onClick={() => navigate('/Asignaturas')} className="btn-volver">
                    ← Volver al plan de estudios
                </button>
                <h1>{asignatura.nombre}</h1>
                <div className="meta-info">
                    <span className="badge ciclo">Ciclo {asignatura.ciclo}</span>
                    <span className="badge creditos">{asignatura.creditos} créditos</span>
                </div>
            </header>

            <main className="contenido-detalle">
                <section className="visor-pdf">
                    <div className="cabecera-pdf">
                        <h2>Contenido de la Asignatura</h2>
                        <a 
                            href={asignatura.pdfPath} 
                            download={`${asignatura.nombre}.pdf`}
                            className="btn-descargar"
                        >
                            📥 Descargar PDF
                        </a>
                    </div>
                    
                    <div className="contenedor-iframe">
                        <iframe
                            src={asignatura.pdfPath}
                            title={`Contenido de ${asignatura.nombre}`}
                            className="iframe-pdf"
                        >
                            <p>Tu navegador no soporta la visualización de PDFs. 
                               <a href={asignatura.pdfPath} download>Descarga el PDF</a>.
                            </p>
                        </iframe>
                    </div>
                </section>

                <div className="grid-informacion">
                    <section className="tarjeta-info">
                        <h3>Información de la Asignatura</h3>
                        <p><strong>Código:</strong> {id}</p>
                        <p><strong>Ciclo:</strong> {asignatura.ciclo}</p>
                        <p><strong>Créditos:</strong> {asignatura.creditos}</p>
                        <p><strong>Carácter:</strong>{asignatura.caracter}</p>
                        
                    </section>
                    
                    <section className="tarjeta-info">
                        <h3>Acciones</h3>
                        <div className="acciones-pdf">
                            <a 
                                href={asignatura.pdfPath} 
                                download={`${asignatura.nombre}.pdf`}
                                className="btn-secundario"
                            >
                                Descargar Material
                            </a>
                            <button 
                                onClick={() => window.open(asignatura.pdfPath, '_blank')}
                                className="btn-secundario"
                            >
                                Abrir en Nueva Pestaña
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default DetalleAsignatura;