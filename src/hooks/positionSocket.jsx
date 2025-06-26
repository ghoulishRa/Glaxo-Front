// src/hooks/useEmployeeSocket.jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.20:3000'; 
//const SOCKET_URL = "http://localhost:3000"

/**
 * useEmployeeSocket:
 *   - Conecta a Socket.IO en SOCKET_URL.
 *   - Escucha el evento "position" (o el que tu servidor emita).
 *   - Actualiza el estado { x, y } cada vez que llega un mensaje de posición.
 */
export const useEmployeeSocket = () => {
  const [pos, setPos] = useState({ x: 100, y: 300 });

  useEffect(() => {
    // 1) Conectar al servidor Socket.IO
    const socket = io(SOCKET_URL);

    // 2) Registrar manejadores
    socket.on('connect', () => {
      console.log('Socket.IO conectado, id:', socket.id);
    });

    // Suponemos que tu servidor emite un evento llamado "position"
    socket.on('position', (data) => {
      // data debería ser { x: Number, y: Number }
      if (data && typeof data.x === 'number' && typeof data.y === 'number') {
        setPos({ x: data.x, y: data.y });
        console.log('postion x:', data.x, 'position y:',data.y)
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket.IO desconectado:', reason);
    });

    // 3) Cleanup al desmontar el hook
    return () => {
      socket.off('position');
      socket.disconnect();
    };
  }, []);

  return pos;
};
