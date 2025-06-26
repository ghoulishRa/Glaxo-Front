// hooks/getData.jsx
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

async function get(apiEndpoint, path, payload) {
  const url = `${apiEndpoint}${path}/${payload}`;
  const response = await axios.get(url);
  return response.data;
}

export const useFetchData = (payload, path) => {
  const [paquetes, setPaquetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paquetesRef = useRef([]); // Guarda el valor anterior para comparar

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      try {
        const paquetesData = await get('http://192.168.1.20:3000', path, payload);

        const mapped = paquetesData.map(p => ({
          id: p.id_paquete || p.id,
          sku: p.sku,
          nombre: p.producto || p.nombre,
          status: p.estado || p.status,
          institucion: p.institucion,
          descripcion: p.descripcion,
          stock_inicial: p.stock_inicial,
          entrada: p.entrada,
          salida: p.salida,
          stock_total: p.stock_total,
          ubicacion: p.ubicacion || p.ubi,
          type: 'package'
        }));

        // Compara con la versión anterior para evitar render innecesario
        if (JSON.stringify(mapped) !== JSON.stringify(paquetesRef.current)) {
          if (isMounted) {
            paquetesRef.current = mapped;
            setPaquetes(mapped);
          }
        }

        if (isMounted) setLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchAll();
    const intervalId = setInterval(fetchAll, 3000); // Polling cada 3 segundos

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [payload, path]);

  return { paquetes, loading, error };
};
