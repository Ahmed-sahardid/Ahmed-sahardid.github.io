import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Context
const AuthContext = createContext();

// 2. Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function login({ username, password }) {
    // 🔒 Replace with real auth
    if (username === 'admin' && password === 'Asah2201@') {
      const u = { username };
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook
export function useAuth() {
  return useContext(AuthContext);
}
