// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import MapCard from '../components/MapCard.jsx';
import { useEmployeeSocket } from '../hooks/positionSocket.jsx';
import { getLocationById } from '../api/locationApi.jsx';

// assets
import Map1 from '../assets/FirstFloor/FirstFloor.svg';
import RackFront from '../assets/FirstFloor/Rack1-1.svg';
import RackBack from '../assets/FirstFloor/Rack1-2.svg';

const maps = [{ id: 1, name: 'Primer Piso', svg: Map1 }];
const imageScale = 18.4, originP = { x: 225, y: 95 };

const generalConfig = {
  startX: 225,     // punto inicial del rack 1
  startY: 85,
  stepX: 38,       // separación horizontal entre racks
  maxRacks: 10     // número de racks a mostrar
};

const Dashboard = ({
  paqueteList,
  robotList,
  selectedItem,
  onToggleItem,
  detailMode,
}) => {
  const [floorIndex, setFloorIndex] = useState(0);
  const [rackView, setRackView] = useState('front');
  const robotPosition = useEmployeeSocket();

  const [locationDetails, setLocationDetails] = useState(null);
  const [mapItemsArray, setMapItemsArray] = useState([]);

  // fetch datos ubicación paquete
  useEffect(() => {
    if (!selectedItem || selectedItem.type === 'robot') {
      setLocationDetails(null);
      return;
    }
    (async () => {
      const data = await getLocationById(selectedItem.ubicacion);
      setLocationDetails(data);
    })();
  }, [selectedItem]);

  
  useEffect(() => {
    if (!selectedItem) {
      setMapItemsArray([]);
      return;
    }

    if (selectedItem.type === 'robot') {
      if (!detailMode && floorIndex === 0) {
        const pos = {
          x: originP.x + robotPosition.y * imageScale,
          y: originP.y + robotPosition.x * imageScale,
        };
        setMapItemsArray([{ ...selectedItem, position: pos }]);
      } else {
        setMapItemsArray([]);
      }
      return;
    }

    // paquete
    if (!detailMode) {
      // vista general: solo nivel 1 en piso 1
      if (floorIndex === 0 && locationDetails?.nivel === 1) {
        const celda = locationDetails.celda;
        const rackNum = Math.ceil(celda / 3);
        const rackIndex = Math.min(rackNum, generalConfig.maxRacks) - 1;

        const pos = {
          x: generalConfig.startX + rackIndex * generalConfig.stepX,
          y: generalConfig.startY
        };

        setMapItemsArray([{ ...selectedItem, position: pos }]);
      } else {
        setMapItemsArray([]);
      }
      return;
    }

    // detailMode = true → vista rack
    if (locationDetails) {
      const celda = locationDetails.celda;
      const isFront = celda <= 15;
      setRackView(isFront ? 'front' : 'back');

      const cfg = isFront
        ? { baseX: 435, deltaX: 125, baseY: 240, deltaY: 40, max: 15 }
        : { baseX: 540, deltaX: 125, baseY: 240, deltaY: 40, max: 15 };

      const idx = (celda - 1) % cfg.max;
      const col = Math.floor(idx / 3), row = idx % 3;
      const pos = {
        x: cfg.baseX - col * cfg.deltaX,
        y: cfg.baseY - row * cfg.deltaY,
      };

      setMapItemsArray([{ ...selectedItem, position: pos }]);
    } else {
      setMapItemsArray([]);
    }
  }, [selectedItem, locationDetails, robotPosition, detailMode, floorIndex]);

  const handlePrev = () => setFloorIndex(p => (p === 0 ? maps.length - 1 : p - 1));
  const handleNext = () => setFloorIndex(p => (p === maps.length - 1 ? 0 : p + 1));
  const getDetailMap = () => (rackView === 'front' ? RackFront : RackBack);

  return (
    <div>
      <MapCard
        items={mapItemsArray}
        map={detailMode ? getDetailMap() : maps[floorIndex].svg}
        floorName={maps[floorIndex].name}
        onPrev={handlePrev}
        onNext={handleNext}
        onItemClick={id => {
          const foundRobot = robotList.find(r => r.id === id);
          if (foundRobot) return void onToggleItem(foundRobot);
          const foundPackage = paqueteList.find(p => p.id === id);
          if (foundPackage) return void onToggleItem(foundPackage);
          console.warn('Ítem no encontrado:', id);
        }}
      />
    </div>
  );
};

export default Dashboard;
