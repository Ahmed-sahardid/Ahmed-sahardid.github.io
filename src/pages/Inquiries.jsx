import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function Inquiries() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const q = query(collection(db,'inquiries'), orderBy('createdAt','desc'));
    return onSnapshot(q, snap =>
      setRows(snap.docs.map(d=>d.data()))
    );
  }, []);

  return (
    <Table striped hover responsive className="mt-4 shadow-sm">
      <thead className="table-light">
        <tr><th>Name</th><th>Email</th><th>Message</th></tr>
      </thead>
      <tbody>
        {rows.map((iq,i)=>(
          <tr key={i}>
            <td>{iq.name}</td>
            <td>{iq.email}</td>
            <td>{iq.message}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
