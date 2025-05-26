import React from 'react';
import Card from './Card.jsx';
import Map from '../assets/FirstFloor.svg';


const MapCard = ({ position }) => {
  return (
    <Card title="Mapa" description="Primer piso">
      <svg width="750" 
          height="375" 
          viewBox="0 0 750 375" 
          style={{backgroundColor: '#fff'}}  >
        <image href={Map} width="750" height="375" 
        />
        <circle cx={position.x} cy={position.y} r="4" fill="red" />
      </svg>
    </Card>
  );
};

export default MapCard;
