import '../../sass/Navbar.scss';
import Topbar from './Topbar.jsx';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = ({ handleLogout, userEmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <Topbar
        userEmail={userEmail}
        handleLogout={handleLogout} />
      <div className={`navbar__menu ${isMenuOpen ? 'open' : ''}`}>
        <NavLink exact to="/home" onClick={closeMenu}>Home </NavLink>
        <NavLink to="/favorites" onClick={closeMenu}>Favorites </NavLink>
        <NavLink to="/about" onClick={closeMenu}>About </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
