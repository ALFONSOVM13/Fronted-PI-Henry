import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import Logo from '../assets/ares.svg'; // Asegúrate de que la ruta de tu imagen sea correcta

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-content">
        <div>
          <img className='logo' src={Logo} alt="Logo" />



        </div>
        <div>
          <h3>API Rick and Morty.</h3>
          <a href="https://rickandmortyapi.com/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2165/2165004.png"
              alt="Portal Gun Co. Logo"
            />
          </a>
        </div>
        <div>
          <h3>Links</h3>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/about">About</NavLink>
          
        </div>
      </div>
      <div className='foot'>
        <p>Copyright  © 2023 . All rights reserved.</p>

      </div>
    </footer>

  );
};

export default Footer;



