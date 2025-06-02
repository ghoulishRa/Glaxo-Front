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
          sku: p.sku || p.sku,
          nombre: p.producto || p.nombre,
          status: p.status || p.status,
          institucion: p.institucion || p.institucion,
          descripcion: p.descripcion || p.descripcion,
          stock_inicial : p.stock_inicial || p.stock_inicial,
          entrada: p.entrada || p.entrada,
          salida : p.salida || p.salida,
          stock_total: p.stock_total || p.stock_total,
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
