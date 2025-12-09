import React from 'react';
import './header.css';
import logo from '../assets/Logo/Logo.png'

function activeheader(){
    return(
           
        <nav class="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <div class="container">
            
            <a class="navbar-brand" href="/">
                <img className='logoimg'src={logo} alt="LogoGestoDACyTI" />
                GestoDACyTI
            </a>
            
            
            <button class="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="CalendarioEscolar">
                            <i class="fas fa-calendar pe-2"></i>Calendario Escolar
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="ReglamentoEscolar">
                            <i class="fas fa-scale-balanced pe-2"></i>Reglamento Escolar
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="AcercaDe">
                            <i class="fas fa-circle-info pe-2"></i>Acerca De
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    )


}
export default activeheader;