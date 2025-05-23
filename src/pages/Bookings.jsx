import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import {
  collection, query, orderBy,
  onSnapshot, updateDoc, deleteDoc, doc
} from 'firebase/firestore';
import { db } from '../firebase';

export default function Bookings() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const q = query(collection(db,'bookings'), orderBy('createdAt','desc'));
    return onSnapshot(q, snap =>
      setRows(snap.docs.map(d=>({id:d.id,...d.data()})))
    );
  }, []);

  const toggle = async b => {
    await updateDoc(doc(db,'bookings',b.id), {
      status: b.status==='pending'?'completed':'pending'
    });
  };

  const remove = async id => {
    if (window.confirm('Delete this booking?')) {
      await deleteDoc(doc(db,'bookings',id));
    }
  };

  return (
    <Table striped hover responsive className="mt-4 shadow-sm">
      <thead className="table-light">
        <tr>
          <th>Date</th>
          <th>Service</th>
          <th>Budget</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(b=>(
          <tr key={b.id}>
            <td>{b.date}</td>
            <td>{b.service}</td>
            <td>${b.budget}</td>
            <td>{b.status}</td>
            <td>
              <Button size="sm" variant="outline-primary" onClick={()=>toggle(b)}>
                {b.status==='pending'?'Complete':'Reopen'}
              </Button>{' '}
              <Button size="sm" variant="outline-danger" onClick={()=>remove(b.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
