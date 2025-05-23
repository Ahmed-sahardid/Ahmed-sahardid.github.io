
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
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Admin() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      window.location.href = '/#/login';
      return;
    }
    AOS.init({ duration: 600, once: true });

    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snap =>
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, [user]);

  const filtered = bookings.filter(b =>
    filter === 'all' ? true : b.status === filter
  );

  const total = bookings.length;
  const revenue = bookings.reduce((sum, b) => sum + (b.collectedFee ?? b.budget), 0);
  const avg = total ? Math.round(revenue / total) : 0;
  const usedCoupons = bookings.filter(b => b.coupon).length;

  const updateBooking = async (id, data) => {
    try {
      await updateDoc(doc(db, 'bookings', id), data);
    } catch (err) {
      console.error('Failed to update booking', err);
      alert('Could not save changes.');
    }
  };

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'time', headerName: 'Time', flex: 1 },
    { field: 'service', headerName: 'Service', flex: 2 },
    {
      field: 'budget',
      headerName: 'Budget',
      flex: 1,
      valueFormatter: ({ value }) => `$${value}`
    },
    { field: 'coupon', headerName: 'Coupon', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: params => (
        <ButtonGroup size="small" variant="outlined">
          <Button
            color={params.row.status === 'completed' ? 'success' : 'warning'}
            onClick={() =>
              updateBooking(params.id, {
                status: params.row.status === 'completed' ? 'pending' : 'completed'
              })
            }
          >
            {params.row.status}
          </Button>
          <Button
            color="info"
            onClick={() => {
              const fee = prompt('Enter fee:', params.row.collectedFee || '');
              if (fee != null) updateBooking(params.id, { collectedFee: Number(fee) });
            }}
          >
            Edit Fee
          </Button>
        </ButtonGroup>
      ),
      flex: 2
    }
  ];

  const stats = [
    { label: 'Total Bookings', value: total, color: 'primary' },
    { label: 'Total Revenue', value: `$${revenue}`, color: 'success' },
    { label: 'Avg per Booking', value: `$${avg}`, color: 'warning' },
    { label: 'Used Coupons', value: usedCoupons, color: 'info' }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" color="primary">Admin Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={2} mb={4} data-aos="fade-up">
        {stats.map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card sx={{ bgcolor: `${s.color}.main`, color: 'white' }}>
              <CardContent>
                <Typography variant="h5">{s.value}</Typography>
                <Typography>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mb={2} data-aos="fade-up">
        <ButtonGroup variant="contained">
          <Button onClick={() => setFilter('all')} color={filter === 'all' ? 'secondary' : 'inherit'}>All</Button>
          <Button onClick={() => setFilter('pending')} color={filter === 'pending' ? 'warning' : 'inherit'}>Pending</Button>
          <Button onClick={() => setFilter('completed')} color={filter === 'completed' ? 'success' : 'inherit'}>Completed</Button>
        </ButtonGroup>
      </Box>

      <Box sx={{ height: 500, width: '100%' }} data-aos="fade-up">
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5,10,20]}
          autoHeight
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}
