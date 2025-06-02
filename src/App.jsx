// src/App.jsx
import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Vistas
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';

// Componentes
import Navbar from './components/NavBar.jsx';
import PackagesNavBar from './components/PackagesNavBar.jsx';
import DetailsPanel from './components/DetailsPanel.jsx';
import AddPackageModal from './components/AddPackageModal.jsx';

//Icons

import PlusIcon from './assets/icons/plusIcon.jsx';

// Hooks
import { useFetchData } from './hooks/getData.jsx';

const App = () => {
 
  const robots = [
    { id: 4004, type: 'robot', nombre: 'Robot 1', status: 'activo', ubicacion: 'Almacén 1' },
  ];

  
  const { paquetes, loading, error } = useFetchData('all', '/paquetes');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarPackages, setSidebarPackages] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleItem = (item) => {
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };
  
  const addSidebarPackage = (pkg) => {
    setSidebarPackages((prev) => {
      if (prev.some((p) => p.id === pkg.id)) {
        return prev;
      }
      return [...prev, pkg];
    });
  };
 
  const closeRightSidebar = () => {
    setSelectedItem(null);
  };

  const activePackages = paquetes.filter((p) => p.status === 'activo');

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error cargando datos: {error.message}</p>;

  return (
    <Router>
      <Navbar />

      <AddPackageModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        packages={activePackages}
        onAdd={(pkg) => {
          addSidebarPackage(pkg);
        }}
      />

      <Routes>
        
        <Route
          path="/"
          element={
            <div className="main" >
              
              <PackagesNavBar
                paquete={sidebarPackages}
                robot={robots}
                onSelectItem={handleToggleItem}
              />

              <main className='dashboard-wrapper'>
                <Dashboard
                  paqueteList={sidebarPackages}
                  robotList={robots}
                  selectedItem={selectedItem}
                  onToggleItem={handleToggleItem}
                />
               
                <button
                  className='btn-open-modal'
                  onClick= {() =>setShowAddModal(true)}
                >
                   <PlusIcon/>
                </button>
              </main>

              <DetailsPanel item={selectedItem} onClose={closeRightSidebar} />
            </div>
          }
        />

        {/* ─────────────────────── Ruta Inventario ─────────────────────── */}
        <Route
          path="/inventario"
          element={
            <div className="main">
              <Inventory
                allPackages={paquetes}
                addToSidebar={addSidebarPackage}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
