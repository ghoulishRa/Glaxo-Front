// src/components/NavBar.jsx
import React from 'react';
import './Styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-title">
        <h2 className='nav-title'>GLAXO</h2>
      </div>
      <nav>
        <ul className="navbar-links">
          <li className='nav-link'>
            <Link className='nav-ref' to="/">Inicio</Link>
          </li>
          <li className='nav-link'>
            <Link className='nav-ref' to="/inventario">Inventario</Link>
          </li>
          <li className='nav-link'>
            <Link className='nav-ref' to="/colaboradores">Colaboradores</Link>
          </li>
        </ul>
      </nav>
      <button className='nav-btn'>Log In</button>
    </header>
  );
};

export default Navbar;
