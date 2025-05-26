import React from 'react';
import './Styles/Navbar.css';


const Navbar = () => {
  return (
    <header>
        <div className="navbar-title">
          <h2 className='nav-title'>Home</h2>
        </div>
        <nav>
          <ul className="navbar-links">
            <li className='nav-link'><a className='nav-ref' href="#">Inicio</a></li>
            <li className='nav-link'><a className='nav-ref' href="#">Empleados</a></li>
            <li className='nav-link'><a className='nav-ref'href="#">Historial</a></li>
          </ul>
        </nav>
        <button className='nav-btn'> Log In </button>
    </header>
  );
};

export default Navbar;