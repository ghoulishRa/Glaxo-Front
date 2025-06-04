// src/Components/TarjetaOperador.jsx
import React from "react";
import "./Styles/TarjetaOperador.css";

export default function TarjetaOperador({ operador, isExpanded, onToggle, onActivate }) {
  const handleActivate = async (e) => {
    e.stopPropagation(); // Evita que se dispare el toggle al hacer clic en el botón

    try {
      const response = await fetch(`http://localhost:3000/operadores/${operador.id}/activar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activo: true }),
      });

      if (!response.ok) throw new Error("Error al activar operador");

      onActivate(operador.id); // Actualiza el estado local
    } catch (error) {
      console.error("Error al activar operador:", error);
      alert("No se pudo activar el operador.");
    }
  };

  return (
    <div className="op-card" onClick={onToggle}>
      <div className="op-card-header">
        {operador.nombre_completo}
        <span>{operador.rol}</span>
      </div>

      <div className={`op-card-body ${isExpanded ? "expanded" : ""}`}>
        <div className="op-card-info">Correo: {operador.correo}</div>
        <div className="op-card-info">Teléfono: {operador.telefono}</div>
        <div className="op-card-info">Puesto: {operador.puesto}</div>
        <div className="op-card-info">Institución: {operador.institucion}</div>
        <div className="op-card-info">Fecha alta: {new Date(operador.fecha_alta).toLocaleDateString()}</div>
        <div className={`op-card-status ${operador.activo ? "" : "op-card-inactivo"}`}>
          {operador.activo ? "Activo" : "Inactivo"}
        </div>

        <div className="op-card-actions">
          {!operador.activo && (
            <button
              className="op-card-button activar"
              onClick={(e) => {
                e.stopPropagation(); // Para evitar que se colapse la tarjeta
                onActivate(operador.id);
              }}
            >
              Activar
            </button>
          )}
        </div>

      </div>
    </div>

  );
}
