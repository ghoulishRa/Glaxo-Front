// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import MapCard from '../components/MapCard.jsx';
import { useEmployeeSocket } from '../hooks/positionSocket.jsx';

import Map1 from '../assets/FirstFloor.svg';
import Map2 from '../assets/FirstFloor.svg';
import Map3 from '../assets/FirstFloor.svg';

const maps = [
  { id: 1, name: 'Primer Piso', svg: Map1 },
  { id: 2, name: 'Segundo Piso', svg: Map2 },
  { id: 3, name: 'Tercer Piso', svg: Map3 },
];

// Ajusta a tu escala/origen real
const imageScale = 18.4;
const originP = { x: 245, y: 100 };

const Dashboard = ({ paqueteList, robotList, selectedItem, onToggleItem }) => {
  const [floorIndex, setFloorIndex] = useState(0);
  const robotPosition = useEmployeeSocket(); 


  const mapItemsArray = [];
  if (selectedItem) {
    if (selectedItem.type === 'robot') {
      
      const pos = {
        x: originP.x + robotPosition.y * imageScale,
        y: originP.y + robotPosition.x * imageScale,
      };
      mapItemsArray.push({ ...selectedItem, position: pos });
    } else {
      // Paquete: coordenadas fijas según ID
      const packagesPositions = {
        100: { x: 245, y: 200},
        111: { x: 245, y: 100 },
        222: { x: 280, y: 100 },
        333: { x: 450, y: 200 },
        
      };
      const pos = packagesPositions[selectedItem.id] || { x: 50, y: 50 };
      mapItemsArray.push({ ...selectedItem, position: pos });
    }
  }

  const handlePrev = () => {
    setFloorIndex((prev) => (prev === 0 ? maps.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setFloorIndex((prev) => (prev === maps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <MapCard
        items={mapItemsArray}
        map={maps[floorIndex].svg}
        floorName={maps[floorIndex].name}
        onPrev={handlePrev}
        onNext={handleNext}

        onItemClick={(clickedId) => {
    
          const foundRobot = robotList.find((r) => r.id === clickedId);
          if (foundRobot) {
            onToggleItem(foundRobot);
            return;
          }
          const foundPackage = paqueteList.find((p) => p.id === clickedId);
          if (foundPackage) {
            onToggleItem(foundPackage);
            return;
          }
          console.warn('Ítem clicado en el mapa no encontrado en listas:', clickedId);
        }}
      />
    </div>
  );
};

export default Dashboard;
