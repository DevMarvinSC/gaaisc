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
import Agenda from './components/Agenda/Agenda';
import CompletarPerfil from './components/UserInfo/CompletarInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/*Página Por Defecto */}
        <Route path='/UserTap' element={<UserTap/>} /> {/*Página Tarjeta Alumno */}
        <Route path='/Register' element={<Register/>} /> {/*Página de registro alumno */}
        <Route path='/Dashboard' element={<Dashboard/>}/> {/*Página principal de opciones, dashboard */}
        <Route path='/Asignaturas' element={<Asignaturas/>}/>
        <Route path="/Asignaturas/:id" element={<DetalleAsignatura />} />
        <Route path='/CalendarioEscolar' element={<CalendarioEscolar/>}/>  
        <Route path='/Agenda' element={<Agenda/>}/>
        <Route path="/CompletarPerfil" element={<CompletarPerfil />} />
      </Routes>
    </Router>
    
  );
}

export default App;
