import { useEffect, useRef, useState } from 'react';

const SOCKET_URL = 'ws://localhost:8080';

export const useEmployeeSocket = () => {
  const [pos, setPos] = useState({ x: 100, y: 300 });
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.addEventListener('open', () => {
      console.log('WebSocket conectado');
    });

    socket.addEventListener('message', event => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'position') {
          setPos({ x: data.x, y: data.y });
        }
      } catch (err) {
        console.error('JSON inválido del servidor:', event.data);
      }
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket desconectado');
    });

    return () => socket.close();
  }, []);

  return pos;
};
