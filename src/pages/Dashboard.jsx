import React, { useState } from 'react';
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

const Dashboard = () => {
  const [floorIndex, setFloorIndex] = useState(0);
  const position = useEmployeeSocket();

  const handlePrev = () => {
    setFloorIndex((prev) => (prev === 0 ? maps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFloorIndex((prev) => (prev === maps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <MapCard
        position={position}
        map={maps[floorIndex].svg}
        floorName={maps[floorIndex].name}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default Dashboard;
