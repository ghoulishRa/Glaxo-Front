import React, { useState } from 'react';
import './App.css'
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './components/NavBar.jsx';
import PackagesNavBar from './components/PackagesNavBar.jsx'
import DetailsPanel from './components/DetailsPanel.jsx'

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const paquetes = [
    { id: 1, nombre: 'Paquete A', status: 'activo', ubicacion: 'Almacén 1' },
    { id: 2, nombre: 'Paquete B', status: 'desactivado', ubicacion: 'Almacén 2' },
    { id: 3, nombre: 'Paquete C', status: 'activo', ubicacion: 'Almacén 3' },
    { id: 3, nombre: 'Paquete C', status: 'activo', ubicacion: 'Almacén 3' },
  ];

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const closeRightSidebar = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <PackagesNavBar
          items={paquetes}
          onSelectItem={handleSelectItem}
        />
        <main style={{ flex: 1, padding: '20px' }}>
          <Dashboard />
        </main>
        <DetailsPanel
          item={selectedItem}
          onClose={closeRightSidebar}
        />
        
      </div>


    </>
  );
};

export default App;
