// src/components/RightSidebar.jsx
import React from 'react';
import './Styles/DetailsPanel.css';

const rightBar = ({ item, onClose }) => {
  // Si item es null, devolvemos null (no renderizamos nada).
  // Pero podemos usar CSS para animar la salida (con transition).
  return (
    <aside className={`sidebar-right ${item ? 'open' : ''}`}>
      <div className="right-header">
        <h3>Detalles</h3>
        <button className="close-btn" onClick={onClose}>
          <i class='bx bx-x bx-sm'></i> 
        </button>
      </div>
      {item ? (
        <div className="details-content">
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Nombre:</strong> {item.nombre}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Ubicación:</strong> {item.ubicacion}</p>
        </div>
      ) : (
        // Si quisieras un “placeholder” cuando no hay ítem, pero suele bastar con que esté vacío
        <div className="details-content">
          <p>No hay ítem seleccionado</p>
        </div>
      )}
    </aside>
  );
};

export default rightBar;
