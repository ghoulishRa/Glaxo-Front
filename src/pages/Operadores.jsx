// src/Components/RegistrarOperadores.jsx
import React, { useEffect, useState } from "react";
import TarjetaOperador from '../components/TarjetaOperador';
import './styles/operadores.css';

import { getAllOperators, activateOperator } from '../api/getOperatorsApi';

export default function RegistrarOperadores() {
  const [operadores, setOperadores] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOperators();
      setOperadores(data);
    };
    fetchData();
  }, []);

  const toggleExpand = (nomina) => {
    setExpandedId((prev) => (prev === nomina ? null : nomina));
  };

  const activarOperador = async (nomina) => {
    const operador = operadores.find((op) => op.nomina === nomina);
    if (!operador) return;

    const actualizado = { ...operador, activo: true };
    const updatedData = await activateOperator(nomina, actualizado);

    if (updatedData) {
      setOperadores((prev) =>
        prev.map((op) => (op.nomina === nomina ? updatedData : op))
      );
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
              isExpanded={expandedId === op.nomina}
              onToggle={() => toggleExpand(op.nomina)}
              onActivate={activarOperador}
            />
          ))}
        </div>
      )}
    </div>
  );
}
