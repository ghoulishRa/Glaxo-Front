// src/Components/RegistrarOperadores.jsx
import React, { useEffect, useState } from "react";
import axios from 'axios';
import TarjetaOperador from '../components/TarjetaOperador'
import './styles/operadores.css'

export default function RegistrarOperadores() {
  const [operadores, setOperadores] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchOperadores = async () => {
      try {
        const res = await axios.get(`http://192.168.1.20:3000/user/get_operators`); 
        setOperadores(res.data);
      } catch (error) {
        console.error("Error al obtener operadores:", error);
      }
    };

    fetchOperadores();
  }, []);


  const toggleExpand = (nomina) => {
    setExpandedId((prev) => (prev === nomina ? null : nomina));
  };

  // Marca un operador como activo
  const activarOperador = async (nomina) => {
    
    const operadorActual = operadores.find((op) => op.nomina === nomina);
    if (!operadorActual) return;

    const operadorActualizado = { ...operadorActual, activo: true };

    try {
        const res = await axios.put(
        `http://192.168.1.20:3000/user/get_operators/${nomina}`,
        operadorActualizado
        );
        setOperadores((prev) =>
        prev.map((op) => (op.nomina === nomina ? res.data : op))
        );
    } catch (error) {
        console.error("Error al actualizar el operador:", error);
    }
    };

  return (
    <div className="op-card-container">
      {operadores.length === 0 ? (
        <p className="no-operators">No hay operadores para mostrar.</p>
      ) : ( 
        <div className="op-card-wrapper">
          {operadores.map((op) => (
            <TarjetaOperador
              key={op.nomina}
              operador={op}
              isExpanded={expandedId === op.nomina  }
              onToggle={() => toggleExpand(op.nomina  )}
              onActivate={activarOperador}
            />
          ))}
        </div>
      )}
    </div>
  );
}