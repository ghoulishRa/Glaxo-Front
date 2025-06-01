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

// Hooks
import { useFetchData } from './hooks/getData.jsx';

const App = () => {
  // ---------- 1. Traer paquetes del servidor ----------
  const { paquetes, loading, error } = useFetchData(3, '/pkg/get_recent');

  // Estado global para el ítem seleccionado (o null si ninguno)
  // Object shape: { id, nombre, type }
  const [selectedItem, setSelectedItem] = useState(null);

  // Por ejemplo, lista estática de robots
  const robots = [
    { id: 4004, type: 'robot', nombre: 'Robot 1', status: 'activo', ubicacion: 'Almacén 1' },
    // ... más robots si fuera el caso
  ];

  // ---------- 2. Handler de toggle: si clicas el mismo id → lo quita; si clicas uno distinto → lo pone ----------
  const handleToggleItem = (item) => {
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null); // apaga
    } else {
      setSelectedItem(item); // enciende
    }
  };

  const closeRightSidebar = () => {
    setSelectedItem(null);
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error cargando datos: {error.message}</p>;

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className='main'>
              {/* ───────────── BARRA LATERAL ───────────── */}
              <PackagesNavBar
                paquete={paquetes}
                robot={robots}
                onSelectItem={handleToggleItem}
              />

              {/* ──────────── CONTENIDO PRINCIPAL ─────────── */}
              <main style={{ flex: 1, padding: '20px' }}>
                <Dashboard
                  paqueteList={paquetes}
                  robotList={robots}
                  selectedItem={selectedItem}
                  onToggleItem={handleToggleItem}
                />
              </main>

              {/* ─────────── PANEL DERECHA (DETALLES) ─────────── */}
              <DetailsPanel
                item={selectedItem}
                onClose={closeRightSidebar}
              />
            </div>
          }
        />
        <Route path="/inventario" 
          element={
            <div className='main'>
              <Inventory />
            </div>
            
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
