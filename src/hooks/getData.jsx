import { useState, useEffect } from 'react';
import axios from 'axios';

async function get(apiEndpoint, path, payload){
  const url = `${apiEndpoint}${path}/${payload}`;
  return (await axios.get(url)).data;
}


export const useFetchData = (payload, path) => {

  const [paquetes, setPaquetes] = useState([]);
  //const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const paquetesData = await get('http://localhost:3000', path, payload);

        setPaquetes(paquetesData.map(p => ({
          id: p.id_paquete || p.id,
          nombre: p.producto || p.nombre,
          type: 'package'
        })));

        console.log(paquetesData);
    
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchAll();
  }, [path, payload]);

  return { paquetes, loading, error };
};
