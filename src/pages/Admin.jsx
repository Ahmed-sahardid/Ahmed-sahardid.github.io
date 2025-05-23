// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, snap => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const total       = bookings.length;
  const revenue     = bookings.reduce((sum, b) => sum + (b.collectedFee ?? b.budget), 0);
  const avg         = total ? Math.round(revenue / total) : 0;
  const usedCoupons = bookings.filter(b => b.coupon).length;

  async function updateBooking(id, data) {
    await updateDoc(doc(db, 'bookings', id), data);
  }

  return (
    <main className="container py-5">
      <h1 className="text-center mb-4 text-primary" data-aos="fade-down">
        Admin Dashboard
      </h1>

      {/* Summary cards */}
      <div className="row text-center mb-5" data-aos="fade-up">
        {/* Total Bookings */}
        <div className="col-6 col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h3 className="text-primary">{total}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        {/* Total Revenue */}
        <div className="col-6 col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h3 className="text-primary">${revenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        {/* Avg per Booking */}
        <div className="col-6 col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h3 className="text-primary">${avg}</h3>
            <p>Avg. per Booking</p>
          </div>
        </div>
        {/* Used Coupons */}
        <div className="col-6 col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h3 className="text-primary">{usedCoupons}</h3>
            <p>Used Coupons</p>
          </div>
        </div>
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
