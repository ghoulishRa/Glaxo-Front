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
  startX: 225,
  startY: 85,
  stepX: 38,
  maxRacks: 10
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

  const [activeItem, setActiveItem] = useState(selectedItem);
  const [locationDetails, setLocationDetails] = useState(null);
  const [mapItemsArray, setMapItemsArray] = useState([]);

  useEffect(() => {
    setActiveItem(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (!activeItem || activeItem.type === 'robot') return;

    const actualizado = paqueteList.find(p => p.id === activeItem.id);
    if (actualizado) {
      setActiveItem(actualizado);
    }
  }, [paqueteList]);

  useEffect(() => {
    if (!selectedItem || selectedItem.type === 'robot') {
      setLocationDetails(null);
      return;
    }

    let isMounted = true;

    const fetchLocation = async () => {
      const data = await getLocationById(selectedItem.ubicacion);

      if (!isMounted) return;

      console.log(`Paquete ID ${selectedItem.id} - Celda recibida:`, data.celda);

      setLocationDetails((prevLocation) => {
        const hasChanged =
          !prevLocation ||
          data.celda !== prevLocation.celda ||
          data.nivel !== prevLocation.nivel;

        if (hasChanged) {
          console.log('¡Ubicación actualizada!', data);
          return data;
        } else {
          return prevLocation;
        }
      });
    };

    fetchLocation();

    const intervalId = setInterval(fetchLocation, 3000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [selectedItem]);


  useEffect(() => {
    if (!activeItem) {
      setMapItemsArray([]);
      return;
    }

    if (activeItem.type === 'robot') {
      if (!detailMode && floorIndex === 0) {
        const pos = {
          x: originP.x + robotPosition.y * imageScale,
          y: originP.y + robotPosition.x * imageScale,
        };
        setMapItemsArray([{ ...activeItem, position: pos }]);
      } else {
        setMapItemsArray([]);
      }
      return;
    }
    if (!detailMode) {
        if (floorIndex === 0 && locationDetails?.nivel === 1) {
          const celda = locationDetails.celda;
          const rackNum = Math.ceil(celda / 3);
          const rackIndex = Math.min(rackNum, generalConfig.maxRacks) - 1;

          const pos = {
            x: generalConfig.startX + rackIndex * generalConfig.stepX,
            y: generalConfig.startY
          };

          console.log(`🔄 [Dashboard] Paquete ${activeItem.id} pos recalculada:`, pos);
          setMapItemsArray([{ ...activeItem, position: pos }]);
        } else {
          setMapItemsArray([]);
        }
        return;
      }

      if (locationDetails) {
        const celda = locationDetails.celda;
        const isFront = celda <= 12;
        setRackView(isFront ? 'front' : 'back');

        const cfg = isFront
          ? { baseX: 435, deltaX: 125, baseY: 240, deltaY: 40 }
          : { baseX: 645, deltaX: 125, baseY: 240, deltaY: 40 };

        const baseCelda = isFront ? 1 : 13;
        const idx = celda - baseCelda;
        const col = Math.floor(idx / 3);
        const row = idx % 3;

        const pos = {
          x: cfg.baseX - col * cfg.deltaX,
          y: cfg.baseY - row * cfg.deltaY,
        };

        console.log(`🔄 [Dashboard] (detailMode) Paquete ${activeItem.id} pos recalculada:`, pos);
        setMapItemsArray([{ ...activeItem, position: pos }]);
      } else {
        setMapItemsArray([]);
      }
    }, [activeItem, locationDetails, robotPosition, detailMode, floorIndex]);

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
