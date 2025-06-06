// src/components/DetailsPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/DetailsPanel.css';

const DetailsPanel = ({ item, onClose, detailMode, setDetailMode }) => {
  const [locationDetails, setLocationDetails] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorLocation, setErrorLocation] = useState(null);

  useEffect(() => {
    // Si cambiamos detailMode o item, reseteamos estado de ubicación
    setLocationDetails(null);
    setErrorLocation(null);
    setLoadingLocation(false);

    if (item && item.type === 'package' && detailMode) {
      // Solamente hacemos fetch si estamos en modo detalle y es paquete
      const fetchLocation = async () => {
        setLoadingLocation(true);
        try {
          const response = await axios.get(
            `http://192.168.1.20:3000/location/get/${item.ubicacion}`
          );
          console.log(response.data)
          setLocationDetails(response.data);
        } catch (err) {
          console.error('Error al obtener detalles de ubicación:', err);
          setErrorLocation('No se pudo cargar la ubicación');
        } finally {
          setLoadingLocation(false);
        }
      };
      fetchLocation();
    }
  }, [item, detailMode]);

  if (!item) {
    return <aside className="details-panel" />;
  }

  return (
    <aside className={`details-panel open`}>
      <div className="details-header">
        <button className="close-btn" onClick={onClose}>
          <i className='bx bx-x'></i>
        </button>
        <h3>
          {item.type === 'package' ? 'Detalle del Paquete' : 'Detalle del Robot'}
        </h3>
      </div>

      <div className="details-content">
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Nombre:</strong> {item.nombre}</p>
        <p><strong>Status:</strong> {item.status}</p>

        {item.type === 'package' && (
          <>
            {detailMode && (
              <>
                {loadingLocation && <p>Cargando ubicación...</p>}
                {errorLocation && (
                  <p style={{ color: 'red' }}>{errorLocation}</p>
                )}
                {locationDetails && (
                  <div className="location-details">
                    <p><strong>Rack:</strong> {locationDetails.rack}</p>
                    <p><strong>Nivel:</strong> {locationDetails.nivel}</p>
                    <p><strong>Celda:</strong> {locationDetails.celda}</p>
                  </div>
                )}
              </>
            )}

            <button
              className="toggle-detail-btn"
              onClick={() => setDetailMode(!detailMode)}
            >
              {detailMode ? 'Volver a mapa' : 'Ver detalle'}
            </button>
          </>
        )}

        {/* {item.type === 'robot' && (
          <>
            <p><strong>Ubicación:</strong> {item.ubicacion}</p>
          </>
        )} */}
      </div>
    </aside>
  );
};

export default DetailsPanel;
