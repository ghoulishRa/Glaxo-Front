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
        const res = await axios.get("http://localhost:3000/operadores"); 
        setOperadores(res.data.operadores);
      } catch (error) {
        console.error("Error al obtener operadores:", error);
      }
    };

    fetchOperadores();
  }, []);


  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Marca un operador como activo
  const activarOperador = async (id) => {
    
    const operadorActual = operadores.find((op) => op.id === id);
    if (!operadorActual) return;

    const operadorActualizado = { ...operadorActual, activo: true };

    try {
        const res = await axios.put(
        `http://localhost:3000/operadores/${id}`,
        operadorActualizado
        );
        setOperadores((prev) =>
        prev.map((op) => (op.id === id ? res.data : op))
        );
    } catch (error) {
        console.error("Error al actualizar el operador:", error);
    }
    };

  return (
    <div className="op-card-containers">
      {operadores.length === 0 ? (
        <p className="no-operators">No hay operadores para mostrar.</p>
      ) : ( 
        <div className="op-card-wrapper">
          {operadores.map((op) => (
            <TarjetaOperador
              key={op.id}
              operador={op}
              isExpanded={expandedId === op.id}
              onToggle={() => toggleExpand(op.id)}
              onActivate={activarOperador}
            />
          ))}
        </div>
      )}
    </div>
  );
}