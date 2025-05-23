// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useAuth } from '../auth';
import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc
} from 'firebase/firestore';

export default function Admin() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });

    // Redirect if not logged in
    if (!user) {
      window.location.href = '/login';
      return;
    }

    // Real-time listener for bookings
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, snap => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => {
      console.error('Listen error:', err);
    });

    return () => unsubscribe();
  }, [user]);

  // Summary stats
  const total       = bookings.length;
  const revenue     = bookings.reduce((sum, b) => sum + (b.collectedFee ?? b.budget), 0);
  const avg         = total ? Math.round(revenue / total) : 0;
  const usedCoupons = bookings.filter(b => b.coupon).length;

  // Update helper
  async function updateBooking(id, data) {
    try {
      await updateDoc(doc(db, 'bookings', id), data);
    } catch (err) {
      console.error('Failed to update booking', err);
      alert('Could not save changes.');
    }
  }

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary" data-aos="fade-down">
          Admin Dashboard
        </h1>
        <button className="btn btn-outline-secondary" onClick={logout}>
          Log Out
        </button>
      </div>

      {/* Summary cards */}
      <div className="row text-center mb-5" data-aos="fade-up">
        {[ 
          { label: 'Total Bookings', value: total },
          { label: 'Total Revenue', value: `$${revenue}` },
          { label: 'Avg. per Booking', value: `$${avg}` },
          { label: 'Used Coupons', value: usedCoupons }
        ].map((card, i) => (
          <div key={i} className="col-6 col-md-3 mb-3">
            <div className="card shadow-sm p-3">
              <h3 className="text-primary">{card.value}</h3>
              <p>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings table */}
      <section className="table-responsive shadow rounded bg-white p-4" data-aos="fade-up">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Budget</th>
              <th>Coupon</th>
              <th>Status</th>
              <th>Fee Collected</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.service}</td>
                <td>${b.budget}</td>
                <td>{b.coupon || '—'}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={b.status}
                    onChange={e => updateBooking(b.id, { status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  {b.status === 'completed' ? (
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      defaultValue={b.collectedFee ?? ''}
                      placeholder="Enter fee"
                      onBlur={e =>
                        updateBooking(b.id, { collectedFee: Number(e.target.value) })
                      }
                    />
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
