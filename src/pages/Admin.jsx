// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import { useAuth }             from '../auth';
import { db }                  from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

import SummaryCards  from '../components/SummaryCards';
import GigTimeline   from '../components/GigTimeline';

export default function Admin() {
  const { logout } = useAuth();
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    // 1. Redirect if not logged in
    if (!logout) return;

    // 2. Real-time listener on bookings collection
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snapshot => {
      // Map each Firestore doc into the props shape GigTimeline expects:
      const arr = snapshot.docs.map(doc => {
        const b = doc.data();
        // assume b.date is "YYYY-MM-DD"
        const [year, monthNum, day] = b.date.split('-');
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const month = monthNames[Number(monthNum) - 1];
        return {
          day,
          month,
          category: b.service,
          title: b.service,
          fullDate: b.date,
          time: b.time,
          location: b.location || '—',
          link: '#',
          linkText: b.status === 'completed' ? 'Completed' : 'Pending',
          status: b.status
        };
      });
      setGigs(arr);
    });

    return () => unsub();
  }, [logout]);

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
        >
          Log Out
        </button>
      </div>

      <SummaryCards />

      {/* now feeding the real bookings into the timeline */}
      <GigTimeline gigs={gigs} />
    </main>
  );
}
