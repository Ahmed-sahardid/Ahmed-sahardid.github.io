import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Inquiries() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'questions'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, snapshot => {
      setRows(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-sm" data-aos="fade-up">
      <h2 className="mb-4">Inquiries</h2>
      <Table striped hover responsive>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Phone</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(iq => (
            <tr key={iq.id}>
              <td>{iq.Name}</td>
              <td>{iq.Email}</td>
              <td>{iq.Message}</td>
              <td>{iq.Phone}</td>
              <td>{iq.createdAt?.toDate().toLocaleString() || '—'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
