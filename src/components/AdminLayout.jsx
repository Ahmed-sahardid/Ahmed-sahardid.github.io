import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AdminIcon from './AdminIcon';

export default function AdminLayout() {
  const { logout } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    // collapse toggle for mobile
    const btn = document.querySelector('[data-bs-toggle="collapse"]');
    btn?.addEventListener('click', () => {
      document.getElementById('adminNav')?.classList.toggle('show');
    });
  }, []);

  return (
    <div className="admin-app">
      <nav className="admin-sidebar navbar navbar-light bg-light flex-column p-3">
        <div className="sidebar-header d-flex align-items-center mb-4">
          <AdminIcon size={32} />
          <span className="h5 ms-2 mb-0">Admin</span>
          <button
            className="btn btn-outline-secondary d-lg-none ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNav"
            aria-controls="adminNav"
            aria-expanded="false"
          >
            ☰
          </button>
        </div>

        <div className="collapse d-lg-block sidebar-nav" id="adminNav">
          <NavLink end to="/admin" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/bookings" className="nav-link">
            Bookings
          </NavLink>
          <NavLink to="/admin/inquiries" className="nav-link">
            Inquiries
          </NavLink>
          <NavLink to="/admin/analytics" className="nav-link">
            Analytics
          </NavLink>
        </div>

        <button className="btn btn-danger btn-logout mt-auto" onClick={logout}>
          Logout
        </button>
      </nav>

      <main className="admin-content" data-aos="fade-up">
        <Outlet />
      </main>
    </div>
  );
}