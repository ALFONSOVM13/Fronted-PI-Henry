import React, { useEffect } from 'react';
import './Topbar.css'; // Asegúrate de importar tu archivo de estilos CSS si es necesario
import { FaUser } from 'react-icons/fa';
import { AiFillClockCircle } from "react-icons/ai";


const Topbar = ({ userEmail, handleLogout }) => {
  useEffect(() => {
    const setFecha = () => {
      const fecha = new Date();
      const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('fecha').innerHTML = fecha.toLocaleDateString('es-ES', opciones);
    };

    setFecha();
  }, []);

  return (
    <div id="topbar" className="d-flex align-items-center fixed-top">
      <div className='fecha'>
        <AiFillClockCircle />
        <div id="fecha">
        </div>
      </div>

      <div className="dropdown-container">
  <p className='login'>Bienvenido(a) <b>{userEmail}</b></p>
  <FaUser className="user-icon" />
  <select className="custom-dropdown" >
    <option value="perfil">Perfil</option>
    <option value="logout" onClick={handleLogout}>Logout</option>
  </select>
</div>

    </div>
  );
};
export default Topbar;

