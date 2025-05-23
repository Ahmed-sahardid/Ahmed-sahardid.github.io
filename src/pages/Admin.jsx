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

import SummaryCards from '../components/SummaryCards';
import GigTimeline from '../components/GigTimeline';

export default function Admin() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    if (!user) {
      window.location.href = '/#/login';
      return;
    }
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snap => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  // stats
  const total       = bookings.length;
  const revenue     = bookings.reduce((sum, b) => sum + (b.collectedFee ?? b.budget), 0);
  const avg         = total ? Math.round(revenue / total) : 0;
  const usedCoupons = bookings.filter(b => b.coupon).length;

  // transform for timeline
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const gigs = bookings.map(b => {
    const [y, m, d] = b.date.split('-');
    return {
      id: b.id,
      day: String(Number(d)),
      month: monthNames[Number(m) - 1],
      category: b.service,
      title: b.service,
      fullDate: b.date,
      time: b.time,
      location: b.location || '—',
      status: b.status
    };
  });

  async function updateBooking(id, data) {
    try {
      await updateDoc(doc(db, 'bookings', id), data);
    } catch (err) {
      console.error(err);
      alert('Could not save changes.');
    }
  }

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-down">
        <h1 className="text-primary">Admin Dashboard</h1>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            logout();
            window.location.href = '/#/login';
          }}
        >
          Log Out
        </button>
      </div>

      <SummaryCards
        total={total}
        revenue={revenue}
        avg={avg}
        coupons={usedCoupons}
      />

      <GigTimeline gigs={gigs} />

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
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
