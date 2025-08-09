// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data (null by default)
  const [loading, setLoading] = useState(true); // Manage loading state while checking auth
  
 
  const login = (userData) => {
 
    setUser(userData);
    // Store user data in localStorage
  };

  const logout = () => {
    setUser(null);
     // Remove user data from localStorage
  };

  // Provide auth values to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
