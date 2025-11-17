import React, { useState } from 'react';
import './CalendarioEscolar.css';
import activeheader from '../../pages/header'

function CalendarioEscolar() {
    const calendarios = {
        "LIC2025-2026": {
            nombre: "Licenciatura 2025 - 2026",
            tipo: "Licenciatura",
            url: "/PDFCalendarios/LIC2025-2026.pdf"
        },
        "ACT2025": {
            nombre: "ACT 2024 - 2025",
            tipo: "ACT",
            url: "/PDFCalendarios/ACT2025.pdf"
        }
    };

    // Obtener la primera clave del objeto calendarios
    const primeraOpcion = Object.keys(calendarios)[0];
    
    // Establecer la primera opción como valor por defecto
    const [selectedYear, setSelectedYear] = useState(primeraOpcion);

    const calendarioSeleccionado = calendarios[selectedYear];

    return (
        <div className="CalendarioContainer">
            {activeheader()}
            <h1>Calendario Escolar</h1>
            
            <div className="SelectorContainer">
                <select
                    id="ano"
                    name="calendario"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    required
                    className="form-input"
                >
                    <option value="">Selecciona</option>
                    {Object.keys(calendarios).map(key => (
                        <option key={key} value={key}>
                            {calendarios[key].nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="CalendarioShowContainer">
                {calendarioSeleccionado ? (
                    <div className="pdf-viewer">
                        <h1>{calendarioSeleccionado.nombre}</h1>
                        <div className="contenedor-iframe">
                            <iframe
                                src={calendarioSeleccionado.url}
                                title={`Contenido de ${calendarioSeleccionado.nombre}`}
                                className="iframe-pdf"
                            >
                                <p>Tu navegador no soporta la visualización de PDFs. 
                                   <a href={calendarioSeleccionado.url} download>Descarga el PDF</a>.
                                </p>
                            </iframe>
                        </div>
                    </div>
                ) : (
                    <div className="placeholder">
                        <p>Selecciona un año para visualizar el calendario escolar</p>
                    </div>
                )}
            </div>

            {calendarioSeleccionado && (
                <section className="tarjeta-info">
                    <h3>Acciones</h3>
                    <div className="acciones-pdf">
                        <a 
                            href={calendarioSeleccionado.url} 
                            download={`${calendarioSeleccionado.nombre}.pdf`}
                            className="btn-secundario"
                        >
                            Descargar Material
                        </a>
                        <button 
                            onClick={() => window.open(calendarioSeleccionado.url, '_blank')}
                            className="btn-secundario"
                        >
                            Abrir en Nueva Pestaña
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default CalendarioEscolar;