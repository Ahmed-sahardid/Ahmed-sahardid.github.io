// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  useTheme,
  useMediaQuery,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../auth';
import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default function Admin() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      window.location.href = '/#/login';
      return;
    }
    AOS.init({ duration: 600, once: true });
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      snap => setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      err => console.error('Listen error:', err)
    );
    return () => unsub();
  }, [user]);

  const filtered = bookings.filter(b => (filter === 'all' ? true : b.status === filter));
  const total = bookings.length;
  const revenue = bookings.reduce((sum, b) => sum + (b.collectedFee ?? b.budget), 0);
  const avg = total ? Math.round(revenue / total) : 0;
  const usedCoupons = bookings.filter(b => b.coupon).length;

  const handleUpdate = async (id, field, value) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { [field]: value });
    } catch (err) {
      console.error('Update failed:', err);
      alert('Could not update booking.');
    }
  };
  const handleDelete = async id => {
    if (window.confirm('Delete this booking?')) {
      await deleteDoc(doc(db, 'bookings', id));
    }
  };

  const columns = [
    { field: 'fullName', headerName: 'Name', flex: 1, editable: true },
    { field: 'service',  headerName: 'Service', flex: 1, editable: true },
    { field: 'status',   headerName: 'Status', flex: 1, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      getActions: params => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Save"
          onClick={() => handleUpdate(params.id, 'status', params.row.status)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
          showInMenu
        />
      ]
    }
  ].map(col => ({
    ...col,
    hide: isXs && ['fullName', 'status'].indexOf(col.field) === -1
  }));

  const stats = [
    { label: 'Total Bookings',  value: total,       color: 'primary' },
    { label: 'Total Revenue',   value: `$${revenue}`, color: 'success' },
    { label: 'Avg per Booking', value: `$${avg}`,     color: 'warning' },
    { label: 'Used Coupons',    value: usedCoupons,  color: 'info' }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" color="primary">Admin Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={logout}>Logout</Button>
      </Box>

      {/* Enlarged Summary Cards Grid */}
      <Grid container spacing={2} mb={4} data-aos="fade-up">
        {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                bgcolor: `${s.color}.main`,
                color: 'white',
                textAlign: 'center',
                py: isXs ? 2 : 3,
                px: 2
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography variant={isXs ? 'h5' : 'h4'} gutterBottom>
                  {s.value}
                </Typography>
                <Typography variant={isXs ? 'body2' : 'body1'}>
                  {s.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filter Buttons */}
      <Box mb={2} data-aos="fade-up">
        <ButtonGroup variant="contained" size={isXs ? 'small' : 'medium'}>
          <Button onClick={() => setFilter('all')}     color={filter === 'all' ? 'secondary' : 'inherit'}>All</Button>
          <Button onClick={() => setFilter('pending')} color={filter === 'pending' ? 'warning'   : 'inherit'}>Pending</Button>
          <Button onClick={() => setFilter('completed')} color={filter === 'completed' ? 'success'   : 'inherit'}>Completed</Button>
        </ButtonGroup>
      </Box>

      {/* Bookings Table */}
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          '& .MuiDataGrid-root': { minWidth: 600 }
        }}
        data-aos="fade-up"
      >
        <DataGrid
          rows={filtered}
          columns={columns}
          autoHeight
          density={isXs ? 'compact' : 'standard'}
          pageSize={isXs ? 5 : 10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          onCellEditCommit={params => handleUpdate(params.id, params.field, params.value)}
          hideFooterSelectedRowCount
        />
      </Box>
    </Box>
  );
}
