// src/components/context/ContextUser.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // onLoginSuccess vendrá de LoginSignUp y guardará { email, rol }
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para consumir el contexto fácilmente
export function useUser() {
  return useContext(UserContext);
}
