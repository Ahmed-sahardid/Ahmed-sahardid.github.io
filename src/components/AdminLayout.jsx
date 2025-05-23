import React, { useState } from 'react';
import { Navbar, Offcanvas, Nav, Container, Button } from 'react-bootstrap';
import {
  ListUl, HouseFill, Table, PeopleFill, BarChartFill,
  Bell, PersonCircle
} from 'react-bootstrap-icons';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const [show, setShow] = useState(false);
  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="primary" variant="dark" expand={false} className="px-3">
        <Button variant="outline-light" onClick={() => setShow(true)}>
          <ListUl />
        </Button>
        <Navbar.Brand as={Link} to="/admin" className="ms-2">
          Admin
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link><Bell /></Nav.Link>
          <Nav.Link><PersonCircle /></Nav.Link>
        </Nav>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas show={show} onHide={() => setShow(false)} responsive="sm">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-0">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin"><HouseFill className="me-2"/>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/bookings"><Table className="me-2"/>Bookings</Nav.Link>
            <Nav.Link as={Link} to="/admin/inquiries"><PeopleFill className="me-2"/>Inquiries</Nav.Link>
            <Nav.Link as={Link} to="/admin/analytics"><BarChartFill className="me-2"/>Analytics</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid className="mt-3">
        <Outlet />
      </Container>
    </>
  );
}
