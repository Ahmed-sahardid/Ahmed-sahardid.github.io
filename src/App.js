// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth';
import RequireAuth from './components/RequireAuth';

import Navbar      from './components/Navbar';
import AdminLayout from './components/AdminLayout';

import Home      from './pages/Home';
import Book      from './pages/Book';
import Contact   from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Login     from './pages/Login';

import Dashboard  from './pages/Admin';      // Admin.jsx
import Bookings   from './pages/Bookings';
import Inquiries  from './pages/Inquiries';
import Analytics  from './pages/Analytics';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Public top navbar */}
        <Navbar />
        <div style={{ height: '70px' }} />

        <Routes>
          {/* Public */}
          <Route path="/"         element={<Home />} />
          <Route path="/book"     element={<Book />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login"    element={<Login />} />

          {/* Admin (all under /admin) */}
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index           element={<Dashboard />} />
            <Route path="bookings"  element={<Bookings />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
