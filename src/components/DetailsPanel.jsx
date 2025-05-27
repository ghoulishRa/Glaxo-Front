// src/components/DetailsPanel.jsx
import React from 'react';
import './Styles/DetailsPanel.css';

const DetailsPanel = ({ item, onClose }) => {
  if (!item) {
    return <aside className="details-panel" />;
  }

  return (
  

    <aside className={`details-panel open`}>
      <div className="details-header">
        <h3>
          {item.type === 'package' ? 'Detalle del Paquete' : 'Detalle del Robot'}
        </h3>
        <button className="close-btn" onClick={onClose}>
          <i className='bx bx-x'></i>
        </button>
      </div>

      <div className="details-content">
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Nombre:</strong> {item.nombre}</p>
        <p><strong>Status:</strong> {item.status}</p>

        {item.type === 'package' && (
          <>
            <p><strong>Ubicación:</strong> {item.ubicacion}</p>
          </>
        )}

        {item.type === 'robot' && (
          <>
            <p><strong>Ubicación:</strong> {item.ubicacion}</p>
        
          </>
        )}
      </div>
    </aside>

    



  );
};

export default DetailsPanel;
