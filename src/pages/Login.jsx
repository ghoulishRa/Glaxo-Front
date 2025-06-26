// src/components/LoginSignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './styles/LoginSignUp.css';
import { useUser } from '../components/context/ContextUser'; 
import { useNavigate } from 'react-router-dom';

//icons
import EnvelopeAltIcon from '../assets/icons/mailIcon';
import LockKeyholeIcon from '../assets/icons/lockIcon';

//apis
import { loginUser } from '../api/loginApi';

const LoginSignUp = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async () => {
    setMensaje('');
    try{
      const data =  await loginUser({
        password_hash: password,
        correo: email,
      });
      if (data.result === 'True') {
        const rol = data.rol;
        login ({
          email, rol
        });
        navigate('/');
        setMensaje('Bienvenido')
      }else {
        setMensaje(data.msg || 'Usuario o contraseña invalido');
      };
    } catch (err) {
      console.error('error al conectar con el servidor', err);
      setMensaje('Error al conectar con el servidor');
    }
    
  };

    return (
    <div className="login-page">
      <h2> Package Tracker </h2>
      <div className="login-input">
        <span className="login-icon">
          <EnvelopeAltIcon/>

        </span>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login-input">
        <span className="login-icon">
          <LockKeyholeIcon/>
        </span>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {mensaje && <p className="login-message">{mensaje}</p>}
      <button className="login-submit-btn" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );

};

export default LoginSignUp;
