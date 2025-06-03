// src/components/MapCard.jsx
import React from 'react';
import Card from './Card.jsx';
import './Styles/MapCard.css';
import TargetIcon from '../assets/icons/targeticon.jsx';

const MapCard = ({ items, map, floorName, onPrev, onNext, onItemClick }) => {
  return (
    <Card description={floorName}>
      <div className='map-container'>
        <button className="maps-btn" onClick={onPrev}>
          <i className="bx bx-caret-left bx-sm"></i>
        </button>

        <div
          className="relative"
          style={{
            width: '700px',
            height: '350px',
            position: 'relative',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={map}
            alt="Mapa"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          {items.map((item) => (
            <TargetIcon
              key={item.id}
              x={item.position.x}
              y={item.position.y}
              type={item.type}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </div>

        <button className="maps-btn" onClick={onNext}>
          <i className="bx bx-caret-right bx-sm"></i>
        </button>
      </div>
    </Card>
  );
};

export default MapCard;
