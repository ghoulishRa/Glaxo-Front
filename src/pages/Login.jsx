import React, { useState } from 'react';
import axios from 'axios';
import './styles/LoginSignUp.css';


const LoginSignUp = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/user/login', {
        correo: email,
        password_hash: password,
      });

      if (res.data.result === "True") {
        const rol = res.data.rol; // 👈 obtiene el rol del backend
        setMensaje("✅ Bienvenido");
        onLoginSuccess(rol);      // 👈 le pasa el rol al componente padre
      } else {
        setMensaje(`${res.data.msg}`);
      }
    } catch (err) {
      console.error("Error de login:", err);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">Login</div>
        <img src={logo_icon} alt="" />
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Correo de colaborador o empresa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {mensaje && (
        <p style={{ color: "red", textAlign: "center", marginTop: 10 }}>{mensaje}</p>
      )}

      <div
        className="submit"
        style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}
        onClick={handleLogin}
      >
        Ingresar
      </div>
    </div>
  );
};

export default LoginSignUp;