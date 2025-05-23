import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card } from 'react-bootstrap';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Analytics() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const q = query(collection(db,'bookings'), orderBy('createdAt'));
    return onSnapshot(q,snap=>{
      const labels=[]; const data=[];
      snap.docs.forEach(d=>{
        const { date,budget } = d.data();
        labels.push(date); data.push(budget);
      });
      setChartData({
        labels,
        datasets:[{
          label:'Budget',
          data,
          borderColor:'#007bff',
          backgroundColor:'rgba(0,123,255,0.3)',
          tension:0.3
        }]
      });
    });
  },[]);

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <Card.Title>Budgets Over Time</Card.Title>
        <div style={{ height: '200px' }}>
          <Line data={chartData} options={{ maintainAspectRatio:false }} />
        </div>
      </Card.Body>
    </Card>
  );
}
