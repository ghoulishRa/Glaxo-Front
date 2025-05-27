import React, { useEffect, useState } from 'react';
import MapCard from '../components/MapCard.jsx';
import Map1 from '../assets/FirstFloor.svg';
import Map2 from '../assets/FirstFloor.svg';
import Map3 from '../assets/FirstFloor.svg';
import { useEmployeeSocket } from '../hooks/positionSocket.jsx';

const maps = [
  { id: 1, name: 'Primer Piso', svg: Map1 },
  { id: 2, name: 'Segundo Piso', svg: Map2 },
  { id: 3, name: 'Tercer Piso', svg: Map3 },
];

const Dashboard = ({item}) => {

  const [visibleItems, setVisibleItems] = useState([]);
  const [floorIndex, setFloorIndex] = useState(0);
  //usando socket para datos en tiempo real
  const robotPosition = useEmployeeSocket();

  //simular varios items
  // const itemsOnMap = [
  //   { id: 1, type: 'package', nombre: 'Paquete A', position: { x: 120, y: 80 } },
  //   { id: 2, type: 'package', nombre: 'Paquete B', position: { x: 300, y: 150 } },
  //   { id: 101, type: 'robot', nombre: 'Robot 1', position: Robotposition },
  // ];

  useEffect(() => {
    if (!item) return;

    const alreadyVisible = visibleItems.some((it) => it.id === item.id);
    if (alreadyVisible) return;

    const newItem = {
      id: item.id,
      type: item.type,
      nombre: item.nombre,
    };

    setVisibleItems((prev) => [...prev, newItem]);
  }, [item, visibleItems]);


  const mapItem = visibleItems.map((it) => {
    if (it.type === 'robot') {
      return {
        ...it,
        position: robotPosition,
      };
    } else {
      const packagesPositions = {
        1: { x: 120, y: 80 },
        2: { x: 300, y: 150 },
        3: { x: 450, y: 200 },
        4: { x: 600, y: 100 },
      };
      return {
        ...it,
        position: packagesPositions[it.id] || { x: 50, y: 50 },
      };
    }
  });

  const handlePrev = () => {
    setFloorIndex((prev) => (prev === 0 ? maps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFloorIndex((prev) => (prev === maps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <MapCard
        items={mapItem}
        map={maps[floorIndex].svg}
        floorName={maps[floorIndex].name}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default Dashboard;
