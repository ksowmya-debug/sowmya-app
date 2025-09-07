import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(null);

  // Attempt to load auth from localStorage on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem('Auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem('Auth', JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('Auth');
  };

  return (
    <AuthContext.Provider value={{ Auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
