// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapCard from '../components/MapCard.jsx';
import { useEmployeeSocket } from '../hooks/positionSocket.jsx';

import Map1 from '../assets/FirstFloor.svg';
import Map2 from '../assets/FirstFloor.svg';
import Map3 from '../assets/FirstFloor.svg';
import MapDetail from '../assets/Rack1-1.svg'; // Imagen para detailMode

const maps = [
  { id: 1, name: 'Primer Piso', svg: Map1},
  { id: 2, name: 'Segundo Piso', svg: Map2 },
  { id: 3, name: 'Tercer Piso', svg: Map3 },
];

const imageScale = 18.4;
const originP = { x: 245, y: 100 };

const Dashboard = ({
  paqueteList,
  robotList,
  selectedItem,
  onToggleItem,
  detailMode,
}) => {
  const [floorIndex, setFloorIndex] = useState(0);
  const robotPosition = useEmployeeSocket();

  
  const [locationDetails, setLocationDetails] = useState(null);
  const [mapItemsArray, setMapItemsArray] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!selectedItem || selectedItem.type === 'robot') {
        setLocationDetails(null);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/get/ubicacion/${selectedItem.ubicacion}`
        );
        setLocationDetails(response.data); // { rack, nivel, celda }
      } catch (err) {
        console.error('Error obteniendo ubicación:', err);
        setLocationDetails(null);
      }
    };

    fetchLocation();
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem) {
      setMapItemsArray([]);
      return;
    }

    if (selectedItem.type === 'robot') {
      // Modo robot: posición en tiempo real
      const pos = {
        x: originP.x + robotPosition.y * imageScale,
        y: originP.y + robotPosition.x * imageScale,
      };
      setMapItemsArray([{ ...selectedItem, position: pos }]);
    } else {
      // selectedItem es paquete
      if (detailMode) {
        // 1️⃣ Extraemos la celda de locationDetails
        const celdaNum = locationDetails?.celda;

        let pos;
        if (typeof celdaNum === 'number') {
          
          const celdaIndex = celdaNum - 1;
          const col = Math.floor(celdaIndex / 3);  
          const row = celdaIndex % 3;             

          
          const baseX = 435;
          const deltaX = 125;
          const baseY = 240;
          const deltaY = 40;

          
          pos = {
            x: baseX - col * deltaX,
            y: baseY - row * deltaY
          };
        } else {
          
          pos = { x: 50, y: 50 };
        }

        setMapItemsArray([{ ...selectedItem, position: pos }]);
      } else {
        
        const celdaNum = locationDetails ? locationDetails.celda : null;
        const packagesPositions = {
          1: { x: 225, y: 85 },
          2: { x: 260, y: 85 },
          3: { x: 295, y: 85 },
          4: { x: 340, y: 85 },
          5: { x: 260, y: 85 },
          6: { x: 225, y: 85 },
          7: { x: 295, y: 85 },
          8: { x: 340, y: 85 }, 
          9: { x: 260, y: 85 },
          10:{ x: 100,  y: 85 }
          
        };

        let pos = { x: 50, y: 50 };

        if (celdaNum != null) {
          const grupo = Math.ceil(celdaNum / 3);
          pos = packagesPositions[grupo] || { x: 50, y: 50 };
  }

        setMapItemsArray([{ ...selectedItem, position: pos }]);
      }
    }
  }, [selectedItem, locationDetails, robotPosition, detailMode]);

  const handlePrev = () => {
    setFloorIndex(prev => (prev === 0 ? maps.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setFloorIndex(prev => (prev === maps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <MapCard
        items={mapItemsArray}
        map={detailMode ? MapDetail : maps[floorIndex].svg}
        floorName={maps[floorIndex].name}
        onPrev={handlePrev}
        onNext={handleNext}
        onItemClick={clickedId => {
          const foundRobot = robotList.find(r => r.id === clickedId);
          if (foundRobot) {
            onToggleItem(foundRobot);
            return;
          }
          const foundPackage = paqueteList.find(p => p.id === clickedId);
          if (foundPackage) {
            onToggleItem(foundPackage);
            return;
          }
          console.warn('Ítem clicado en el mapa no encontrado:', clickedId);
        }}
      />
    </div>
  );
};

export default Dashboard;
