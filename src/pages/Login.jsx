// src/components/LoginSignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './styles/LoginSignUp.css';
import { useUser } from '../components/context/ContextUser'; 
import { useNavigate } from 'react-router-dom';

//icons
import EnvelopeAltIcon from '../assets/icons/mailIcon';
import LockKeyholeIcon from '../assets/icons/lockIcon';

const LoginSignUp = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.1.20:3000/user/login', {
        correo: email,
        password_hash: password,
      });

      console.log('login res', res);

      if (res.data.result === "True") {
        const rol = res.data.rol;
        login({email, rol});
        navigate('/');
        setMensaje("Bienvenido");
                 
      } else {
        setMensaje(res.data.msg || "Usuario o contraseña inválidos");
      }
    } catch (err) {
      console.error("Error de login:", err);
      setMensaje("Error al conectar con el servidor");
    }
  };

    return (
    <div className="login-page">
      <h2>Ingresar</h2>
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
