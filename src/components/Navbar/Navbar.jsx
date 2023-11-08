import '../../sass/Navbar.scss';
import Topbar from './Topbar.jsx';
import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = ({ handleLogout, userEmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      // Evitar el scroll cuando el menú esté abierto
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar el scroll cuando el menú esté cerrado
      document.body.style.overflow = 'auto';
    }

    // Limpiar el efecto secundario
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarToggleStyles = {
    transition: 'transform 0.5s',
  };

  const navbarToggleOpenStyles = {
    transform: 'rotate(120deg)',
  };

  const closeMenu = () => {
    setIsMenuOpen(false);

  };



  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="navbar__toggle" onClick={handleMenuToggle}
        style={isMenuOpen ? navbarToggleOpenStyles : navbarToggleStyles}
      >
        {isMenuOpen ? '✖' : '☰'}
      </div>
      <div className="topbar-wrapper"> {/* Contenedor para Topbar */}
        <Topbar
          userEmail={userEmail}
          handleLogout={handleLogout}
        />
      </div>
      
      <div className={`navbar__menu ${isMenuOpen ? 'open' : ''}`}>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
        <NavLink exact to="/home" onClick={closeMenu}>Home </NavLink>
        <NavLink to="/favorites" onClick={closeMenu}>Favorites </NavLink>
        <NavLink to="/about" onClick={closeMenu}>About </NavLink>
        
      </div>
    </nav>
  );
};

export default Navbar;
