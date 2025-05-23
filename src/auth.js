// src/auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create context
const AuthContext = createContext();

// 2. Provider keeps user in state (persisted to sessionStorage)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function login({ username, password }) {
    // 🚨 Replace with real check
    if (username === 'admin' && password === 'Asah2201@') {
      const u = { username };
      setUser(u);
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
