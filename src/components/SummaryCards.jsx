import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { People, CurrencyDollar, GraphUp, TicketPerforated } from 'react-bootstrap-icons';

const stats = [
  { label: 'Total Bookings',  value: 124,   icon: <People />,           color: 'info'    },
  { label: 'Revenue',         value: 5600,  icon: <CurrencyDollar />,   color: 'success' },
  { label: 'Avg/Booking',     value: 45,    icon: <GraphUp />,           color: 'warning' },
  { label: 'Coupons Used',    value: 32,    icon: <TicketPerforated />,  color: 'primary' }
];

export default function SummaryCards() {
  return (
    <Row className="g-3 mb-4">
      {stats.map((s,i) => (
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
              <ProgressBar now={(s.value / 1000) * 100} className="mt-3" />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
