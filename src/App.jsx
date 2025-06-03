// src/App.jsx
import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Vistas
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import LoginSignUp from './pages/Login.jsx';

// Componentes
import Navbar from './components/NavBar.jsx';
import PackagesNavBar from './components/PackagesNavBar.jsx';
import DetailsPanel from './components/DetailsPanel.jsx';
import AddPackageModal from './components/AddPackageModal.jsx';

// Context
import { UserProvider, useUser } from './components/context/ContextUser.jsx';

// Hooks
import { useFetchData } from './hooks/getData.jsx';

//icons
import PlusIcon from './assets/icons/plusIcon.jsx'

function ProtectedRoute({ children, roles }) {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/login" />;
  }
  return children;
}

const App = () => {
  const { user, login } = useUser();

  const robots = [
    { id: 4004, type: 'robot', nombre: 'Robot 1', status: 'activo', ubicacion: 'Almacén 1' },
  ];

  const { paquetes, loading, error } = useFetchData('1', '/pkg/get_recent');
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
      <Navbar/>

      {/* Modal para agregar paquete */}
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
            <ProtectedRoute>
              <div className="main">
                <PackagesNavBar
                  paquete={sidebarPackages}
                  robot={robots}
                  onSelectItem={handleToggleItem}
                />

                <main className="dashboard-wrapper">
                  <Dashboard
                    paqueteList={sidebarPackages}
                    robotList={robots}
                    selectedItem={selectedItem}
                    onToggleItem={handleToggleItem}
                  />

                  <button
                    className="btn-open-modal"
                    onClick={() => setShowAddModal(true)}
                  >
                    Ver paquete activo
                    <span className="plus-icon-wrapper">
                      <PlusIcon className="plus-icon" />
                    </span>
                  </button>
                </main>
                <DetailsPanel item={selectedItem} onClose={closeRightSidebar} />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <div className="main">
                <Inventory
                  allPackages={paquetes}
                  addToSidebar={addSidebarPackage}
                />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/colaboradores"
          element={
            <ProtectedRoute roles={['admin']}>
              <div className="main">
                <h2>Administrar Colaboradores</h2>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <div>
              <LoginSignUp />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default function WrappedApp() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
