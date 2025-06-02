// src/components/NavBar.jsx
import React, { use } from 'react';
import './Styles/Navbar.css';
import { Link, useLocation} from 'react-router-dom';

const Navbar = () => {

  const location = useLocation();
  return (
    <header className="navbar">
      <div className="navbar-title">
        <h2 className='nav-title'>GLAXO</h2>
      </div>
      <nav>
        <ul className="navbar-links">
          <li className='nav-link'>
            <Link className={`nav-ref ${location.pathname === '/' ? 'active' : ''}`}
              to="/">Inicio</Link>
          </li>
          <li className='nav-link'>
            <Link className={`nav-ref ${location.pathname === '/inventario' ? 'active' : ''}`} 
              to="/inventario">Inventario</Link>
          </li>
          <li className='nav-link'>
            <Link className={`nav-ref ${location.pathname === '/colaboradores' ? 'active' : ''}`} 
              to="/colaboradores">Colaboradores</Link>
          </li>
        </ul>
      </nav>
      <button className='nav-btn'>
        <Link className='nv-btn-title' 
          to="/login"> login </Link>
      </button>
    </header>
  );
};

export default Navbar;
