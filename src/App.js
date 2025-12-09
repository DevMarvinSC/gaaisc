import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Imports Pages and Components Page
import Dashboard from './pages/Home';
import UserTap from './components/UserInfo/UserTap';
import Register from './components/Auth/REGISTER';
import Login from './components/Auth/LOGIN'
import Asignaturas from './components/AllAsignatures/Asignaturas';
import DetalleAsignatura from './components/AllAsignatures/DetallesAsignatura';
import CalendarioEscolar from './components/CalendarioEscolar/CalendarioEscolar';
import CompletarPerfil from './components/UserInfo/CompletarInfo';
import GestionAgenda from './components/Agenda/GestionAgenda'
import NuevaTarea from './components/Agenda/NuevaTarea';
import NuevoEvento from './components/Agenda/NuevoEvento';
import VerAgenda from './components/Agenda/VerAgenda';
import AcercaDeNosotros from './pages/AcercaDeNosotros'
import ReglamentoEscolar from './pages/ReglamentoEscolar'

import ActiveHeader from './pages/header'; // Cambié el nombre a mayúscula

function App() {
  return (
    <Router>
      <ActiveHeader />
      
      <Routes>
        <Route path="/" element={<Login />} /> {/*Página Por Defecto */}
        <Route path='/UserTap' element={<UserTap/>} /> {/*Página Tarjeta Alumno */}
        <Route path='/Register' element={<Register/>} /> {/*Página de registro alumno */}
        <Route path='/Dashboard' element={<Dashboard/>}/> {/*Página principal de opciones, dashboard */}
        <Route path='/Asignaturas' element={<Asignaturas/>}/>
        <Route path="/Asignaturas/:id" element={<DetalleAsignatura />} />
        <Route path='/CalendarioEscolar' element={<CalendarioEscolar/>}/>  
        <Route path="/CompletarPerfil" element={<CompletarPerfil />} />

        {/* Agenda */}
        <Route path='/Agenda' element={<GestionAgenda />}/>
        <Route path="/NuevoEvento" element={<NuevoEvento />} />
        <Route path="/NuevaTarea" element={<NuevaTarea />} />
        <Route path='/VerAgenda' element={<VerAgenda/>}/>

        {/*External*/}

        <Route path='/AcercaDe' element={<AcercaDeNosotros/>}/>
        <Route path='/ReglamentoEscolar' element={<ReglamentoEscolar/>}/>
      </Routes>
    </Router>
  );
}

export default App;