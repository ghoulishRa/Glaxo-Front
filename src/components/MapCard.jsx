import React from 'react';
import Card from './Card.jsx';
import './Styles/MapCard.css'

const MapCard = ({ position, map, floorName, onPrev, onNext }) => {
  return (
    <Card title="Mapa" description={floorName}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
      }}>
        <button className="maps-btn" onClick={onPrev}>
          <i className='bx bx-caret-left bx-sm'></i>
        </button>

        <svg
          width="700"
          height="350"
          viewBox="0 0 750 375"
          style={{ backgroundColor: '#fff' }}
        >
          <image href={map} width="750" height="375" />
          <circle cx={position.x} cy={position.y} r="4" fill="red" />
        </svg>

        <button className="maps-btn" onClick={onNext}>
          <i className='bx bx-caret-right bx-sm'></i>
        </button>
      </div>
    </Card>
  );
};

export default MapCard;
