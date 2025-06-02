// src/components/AddPackageModal.jsx
import React from 'react';
import './styles/AddPackageModal.css';

const AddPackageModal = ({ isOpen, onClose, packages, onAdd }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Agregar paquete al mapa</h3>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {packages.length > 0 ? (
            <ul className="package-list-modal">
              {packages.map((pkg) => (
                <li key={pkg.id} className="package-list-item">
                  <span>{pkg.nombre}</span>
                  <button
                    className="btn-add-modal"
                    onClick={() => {
                      onAdd(pkg);
                      onClose(); // cerramos el modal tras elegir
                    }}
                  >
                    Agregar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay paquetes activos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
