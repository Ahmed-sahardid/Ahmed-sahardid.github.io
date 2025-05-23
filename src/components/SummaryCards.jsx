// src/components/SummaryCards.jsx
import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { People, CurrencyDollar, GraphUp, TicketPerforated } from 'react-bootstrap-icons';

/**
 * Props:
 *   - total: number
 *   - revenue: number
 *   - avg: number
 *   - coupons: number
 */
export default function SummaryCards({ total, revenue, avg, coupons }) {
  const stats = [
    { label: 'Total Bookings', value: total,   icon: <People />,           color: 'info'    },
    { label: 'Total Revenue',  value: revenue, icon: <CurrencyDollar />,   color: 'success' },
    { label: 'Avg / Booking',  value: avg,     icon: <GraphUp />,          color: 'warning' },
    { label: 'Coupons Used',   value: coupons, icon: <TicketPerforated />, color: 'primary' }
  ];

  // compute max for proportional bars
  const maxVal = Math.max(...stats.map(s => s.value), 1);

  return (
    <Row className="g-3 mb-4">
      {stats.map((s, i) => (
        <Col xs={12} md={6} lg={3} key={i}>
          <Card bg={s.color} text="white" className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="fs-2 me-3">{s.icon}</div>
                <div>
                  <div className="fs-4">{s.value}</div>
                  <div>{s.label}</div>
                </div>
              </div>
              <ProgressBar
                now={Math.round((s.value / maxVal) * 100)}
                className="mt-3"
              />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
