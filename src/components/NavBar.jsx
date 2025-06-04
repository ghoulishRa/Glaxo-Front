// src/components/NavBar.jsx
import React from 'react';
import './Styles/Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './context/ContextUser.jsx';
import Logo from '../assets/logo.png'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  return (
    <header className="navbar">
      <div className="navbar-title">
        <img src={Logo} alt="Logo" className="nav-logo" width={"50px"} />
      </div>

      <nav>
        <ul className="navbar-links">
          {user && (
            <>
              <li className="nav-link">
                <Link
                  className={`nav-ref ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                >
                  Mapa
                </Link>
              </li>
              <li className="nav-link">
                <Link
                  className={`nav-ref ${location.pathname === '/inventario' ? 'active' : ''}`}
                  to="/inventario"
                >
                  Inventario
                </Link>
              </li>
              {user.rol === 'admin' && (
                <li className="nav-link">
                  <Link
                    className={`nav-ref ${location.pathname === '/operadores' ? 'active' : ''}`}
                    to="/operadores"
                  >
                    Operadores
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>

      <button 
        className="nav-btn"
        onClick = {() => {
          if (user) {
            logout();
            navigate('/login');
          } else {
            navigate('/login');
          }
        }}
      >
        {user ? 'Log Out' : 'Log In'}
      </button>
    </header>
  );
};

export default Navbar;
