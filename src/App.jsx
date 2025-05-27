import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

//vistas
import Dashboard from './pages/Dashboard.jsx';


//componentes

import Navbar from './components/NavBar.jsx';
import PackagesNavBar from './components/PackagesNavBar.jsx';
import DetailsPanel from './components/DetailsPanel.jsx';



const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const paquetes = [
    { id: 1, type:'package', nombre: 'Paquete A', status: 'activo', ubicacion: 'Almacén 1' },
    { id: 2, type:'package', nombre: 'Paquete B', status: 'desactivado', ubicacion: 'Almacén 2' },
    { id: 3, type:'package', nombre: 'Paquete C', status: 'activo', ubicacion: 'Almacén 3' },
    { id: 4, type:'package', nombre: 'Paquete D ', status: 'activo', ubicacion: 'Almacén 3' },
  ];

    const robots = [
    { id: 101 , type:'robot', nombre: 'Robot 1', status: 'activo', ubicacion: 'Almacén 1' },
    
  ];

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const closeRightSidebar = () => {
    setSelectedItem(null);
  };

  return (

    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element=
          {  
            <div style={{ display: 'flex', 
                          justifyItems:"center", 
                          alignContent:"center" }}>
                            
              <PackagesNavBar
                paquete={paquetes}
                robot={robots}
                onSelectItem={handleSelectItem}
              />
              <main style={{ flex: 1, padding: '20px' }}>
                <Dashboard
                  item={selectedItem}
                />
              </main>
              <DetailsPanel
                item={selectedItem}
                onClose={closeRightSidebar}
              />
            </div>
          }
        />
      </Routes>
    </Router>


  );
};

export default App;
