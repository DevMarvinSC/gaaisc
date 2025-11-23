import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/SessionManager';
import './DetallesAsignaturas.css';

/**
 * Componente para mostrar el detalle de una asignatura específica
 */
function DetalleAsignatura() {
    const { id } = useParams();
    const navigate = useNavigate();
    const usuario = getCurrentUser();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

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
        "C0108065": {
            nombre: "Álgebra Lineal",
            ciclo: 2,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108065_Álgebra_Lineal.pdf"
        },
        "C0108073": {
            nombre: "Cálculo Diferencial",
            ciclo: 2,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108073_Cálculo_Diferencial.pdf"
        },
        "C0108005": {
            nombre: "Contabilidad Básica",
            ciclo: 2,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108005_Contabilidad_Básica.pdf"
        },
        "C0108083": {
            nombre: "Organización de Computadoras",
            ciclo: "2",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108083_Organización_de_Computadoras.pdf"
        },
        "C0108010": {
            nombre: "Fundamentos de Redes",
            ciclo: 2,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108010_Fundamentos_de_Redes.pdf"
        },

        // CC1
        "C0100003": {
            nombre: "Comunicación Oral Y Escrita",
            ciclo: "Corto 1",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0100003_Comunicación_Oral_y_Escrita.pdf"
        },
        "C0108074": {
            nombre: "Cálculo Integral",
            ciclo: "Corto 1",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108074_Cálculo_Integral.pdf"
        },
        "C0108084": {
            nombre: "Arquitectura de Computadoras",
            ciclo: "Corto 1",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108084_Arquitectura_de_Computadoras.pdf"
        },

        // Ciclo 3
        "C0100001": {
            nombre: "Filosofía y Ética Profesional",
            ciclo: 3,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0100001_Filosofía_y_Ética_Profesional.pdf"
        },
        "C0108064": {
            nombre: "Programación II",
            ciclo: 3,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108064_Programación_II.pdf"
        },
        "C0108067": {
            nombre: "Estructura de Datos",
            ciclo: 3,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108067_Estructura_de_Datos.pdf"
        },
        "C0108009": {
            nombre: "Matemáticas Discretas",
            ciclo: 3,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108009_Matemáticas_Discretas.pdf"
        },
        "C0108014": {
            nombre: "Planeación de Redes",
            ciclo: 3,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108014_Planeación_de_Redes.pdf"
        },
        "C0108013": {
            nombre: "Metodología de la Investigación",
            ciclo: 3,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108013_Metodología_de_la_Investigación.pdf"
        },
        // Ciclo 4
        "C0100002": {
            nombre: "Derechos Humanos, Sociedad y Medio Ambiente",
            ciclo: 4,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0100002_Derechos_Humanos_Sociedad_y_Medio_Ambiente.pdf"
        },
        "C0108066": {
            nombre: "Programación III",
            ciclo: 4,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108066_Programación_III.pdf"
        },
        "C0108011": {
            nombre: "Ingeniería de Software",
            ciclo: 4,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108011_Ingeniería_de_Software.pdf"
        },
        "C0108087": {
            nombre: "Investigación de Operaciones",
            ciclo: 4,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108087_Investigación_de_Operaciones.pdf"
        },
        "C0108085": {
            nombre: "Métodos Numéricos",
            ciclo: 4,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108085_Métodos_Numéricos.pdf"
        },
        "C0100005": {
            nombre: "Tecnologías de la Información y la Comunicación",
            ciclo: 4,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0100005_Tecnologías_de_la_Información_y_la_Comunicación.pdf"
        },
        "C0108089": {
            nombre: "Temas  Selectos de Redes",
            ciclo: 4,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108089_Temas_Selectos_de_Redes.pdf"
        },
        // CC2
        "C0108020": {
            nombre: "Inteligencia Artificial",
            ciclo: "Corto 2",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108020_Inteligencia_Artificial.pdf"
        },
        "C0108008": {
            nombre: "Sistemas Operativos",
            ciclo: "Corto 2",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108008_Sistemas_Operativos.pdf"
        },

        // Ciclo 5
        "C0108088": {
            nombre: "Desarrollo de Aplicaciones Multiplataforma",
            ciclo: 5,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108088_Desarrollo_de_Aplicaciones_Multiplataforma.pdf"
        },
        "C0108015": {
            nombre: "Laboratorio de Diseño de Software",
            ciclo: 5,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108015_Laboratorio_de_Diseño_de_Software.pdf"
        },
        "C0108012": {
            nombre: "Modelado, Diseño y Manejo de Bases de Datos",
            ciclo: 5,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108012_Modelado_Manejo_y_Diseño_de_Base_de_Datos.pdf"
        },
        "C0108075": {
            nombre: "Probabilidad y Estadística",
            ciclo: 5,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108075_Probabilidad_y_Estadística.pdf"
        },
        "C0108076": {
            nombre: "Técnicas de Graficación",
            ciclo: 5,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108076_Técnicas_de_Graficación.pdf"
        },
        "C0108018": {
            nombre: "Inglés Técnico",
            ciclo: 5,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108018_Inglés_Técnico.pdf"
        },

        // Ciclo 6
        "C0108068": {
            nombre: "Desarrollo de Aplicaciones Web",
            ciclo: 6,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108068_Desarrollo_de_Aplicaciones_Web.pdf"
        },
        "C0108069": {
            nombre: "Fábfrica de Software",
            ciclo: 6,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108069_Fábrica_de_Software.pdf"
        },
        "C0108016": {
            nombre: "Programación en Bases de Datos",
            ciclo: 6,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108016_Programación_en_Bases_de_Datos.pdf"
        },
        "C0108081": {
            nombre: "Sistemas Distribuidos",
            ciclo: 6,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108081_Sistemas_Distribuidos.pdf"
        },
        "C0108077": {
            nombre: "Arquitectura de la Información",
            ciclo: 6,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108077_Arquitectura_de_la_Información.pdf"
        },
        "C0108070": {
            nombre: "Programación de Dispositivos Móviles",
            ciclo: 6,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108070_Programación_de_Dispositivos_Móviles.pdf"
        },

        // CC3
        "C0108007": {
            nombre: "Legislación y Normatividad Informática",
            ciclo: "Corto 3",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108007_Legislación_y_Normatividad_Informática.pdf"
        },
        "C0108080": {
            nombre: "Compiladores",
            ciclo: "Corto 3",
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108080_Compiladores.pdf"
        },

        // Ciclo 7
        "C0108071": {
            nombre: "Algoritmos Avanzados",
            ciclo: 7,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108071_Algoritmos_Avanzados.pdf"
        },
        "C0108019": {
            nombre: "Administración de Bases de Datos",
            ciclo: 7,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108019_Administración_de_Bases_de_Datos.pdf"
        },
        "C0108078": {
            nombre: "Laboratorio de Inteligencia Artificial",
            ciclo: 7,
            creditos: 4,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108078_Laboratorio_de_Inteligencia_Artificial.pdf"
        },
        "C0108017": {
            nombre: "Emprendedores",
            ciclo: 7,
            creditos: 6,
            caracter: "Obligatoria",
            pdfPath: "/PDFAsignatures/C0108017_Emprendedores.pdf"
        },


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
                <div className="error-detalle">
                    <h2>Asignatura no encontrada</h2>
                    <p>La asignatura que buscas no existe en nuestro sistema.</p>
                    <button onClick={() => navigate(-1)} className="btn-volver">
                        Volver al plan de estudios
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contenedor-detalle">
            <header className="cabecera-detalle">
                <button onClick={() => navigate(-1)} className="btn-volver">
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