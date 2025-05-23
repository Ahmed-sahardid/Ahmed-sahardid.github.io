// src/auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create context
const AuthContext = createContext();

// 2. Provider keeps user in state (no persistence across reloads)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Clear any existing session on load
    sessionStorage.removeItem('user');
    setUser(null);
  }, []);

  function login({ username, password }) {
    // 🚨 Replace with real check
    if (username === 'admin' && password === 'Asah2201@') {
      const u = { username };
      setUser(u);
      // still store for this tab session until next reload
      sessionStorage.setItem('user', JSON.stringify(u));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook to consume
export function useAuth() {
  return useContext(AuthContext);
}
