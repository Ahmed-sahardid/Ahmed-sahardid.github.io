// src/pages/Book.jsx
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function Book() {
  // 5-minute countdown
  const [secondsLeft, setSecondsLeft] = useState(300);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const timer = setInterval(
      () => setSecondsLeft(s => Math.max(s - 1, 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');
  const saleExpired = secondsLeft === 0;

  // form state
  const [service, setService]     = useState('');
  const [budget, setBudget]       = useState(150);
  const [coupon, setCoupon]       = useState('');
  const [discount, setDiscount]   = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [date, setDate]           = useState('');
  const [time, setTime]           = useState('');
  const [location, setLocation]   = useState('');  // ← new
  const [phone, setPhone]         = useState('');

  // coupon codes
  const codes = { BRIGHT20: 20, WELCOME10: 10 };
  function applyCoupon() {
    if (saleExpired) {
      setDiscount(0);
      return setCouponMsg('⚠️ Sale expired');
    }
    const pct = codes[coupon.trim().toUpperCase()] || 0;
    setDiscount(pct);
    setCouponMsg(
      pct
        ? `✔️ ${pct}% off applied!`
        : '❌ Invalid code'
    );
  }

  // packages data
  const packages = [
    { title: 'Digital Only',     price: 100, desc: 'Hi-res digital files emailed immediately.' },
    { title: 'Digital + Prints',  price: 125, desc: 'Digital files + 4×6 prints.' },
    { title: 'DSLR Booth',        price: 175, desc: 'Pro DSLR with props & attendant.' },
  ];

  // submit booking into Firestore
  async function handleSubmit(e) {
    e.preventDefault();
    if (!service || !date || !time || !location || !phone) {
      return alert('Please fill out all fields.');
    }
    try {
      await addDoc(collection(db, 'bookings'), {
        service,
        budget:    Number(budget),
        coupon:    couponMsg.startsWith('✔️') ? coupon.trim().toUpperCase() : '',
        discount,
        date,
        time,
        location,              // ← include in Firestore record
        phone,
        status:    'pending',
        createdAt: serverTimestamp()
      });
      alert('✅ Booking submitted! Thank you.');
      // reset form
      setService('');
      setBudget(150);
      setCoupon('');
      setCouponMsg('');
      setDiscount(0);
      setDate('');
      setTime('');
      setLocation('');       // ← reset
      setPhone('');
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting booking. Please try again.');
    }
  }

  return (
    <main className="container py-5">
      {/* Hero */}
      <section className="text-center mb-4" data-aos="fade-down">
        <h1 className="h2 text-primary">Book Your Bright Photo Booth</h1>
      </section>

      {/* Flash Sale */}
      <div
        className="bg-primary text-white text-center py-2 mb-5 rounded"
        data-aos="fade-up"
      >
        {!saleExpired ? (
          <>Book in the next <strong>{mins}:{secs}</strong> for <strong>20% off</strong>!</>
        ) : (
          <>Sale ended</>
        )}
      </div>

      {/* Packages */}
      <section className="mb-5" data-aos="fade-up">
        <h2 className="text-center mb-4 text-primary">Our Packages</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="row g-4">
              {packages.map(pkg => {
                const finalPrice = (pkg.price * (1 - discount/100)).toFixed(0);
                return (
                  <div className="col-12 col-md-4" key={pkg.title}>
                    <div
                      className={`card package h-100 ${service === pkg.title ? 'border-primary' : ''}`}
                      onClick={() => setService(pkg.title)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-header bg-primary text-white text-center">
                        {pkg.title}
                      </div>
                      <div className="card-body d-flex flex-column align-items-center">
                        <p className="text-center">{pkg.desc}</p>
                        <h3 className="text-primary display-6 mb-2">
                          ${finalPrice}<small className="text-muted">/hr</small>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Budget + Coupon */}
      <section className="mb-5" data-aos="fade-up">
        <div className="row g-4 align-items-center">
          {/* Budget */}
          <div className="col-12 col-md-6 text-center">
            <h3 className="text-primary">What's Your Budget?</h3>
            <input
              type="range"
              className="form-range mx-auto"
              min="50" max="1500" step="50"
              value={budget}
              onChange={e => setBudget(e.target.value)}
            />
            <div className="mt-2">${budget}</div>
          </div>

          {/* Coupon */}
          <div className="col-12 col-md-6 text-center">
            <h3 className="text-primary">Have a Coupon?</h3>
            <div className="d-flex justify-content-center">
              <input
                type="text"
                className="form-control w-auto me-2"
                placeholder="BRIGHT20"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                disabled={saleExpired}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={applyCoupon}
                disabled={saleExpired}
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={couponMsg.startsWith('✔️') ? 'text-success mt-2' : 'text-danger mt-2'}>
                {couponMsg}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="mb-5" data-aos="fade-up">
        <form onSubmit={handleSubmit} className="row g-3 mx-auto" style={{ maxWidth: 700 }}>
          {/* Service */}
          <div className="col-12 col-md-6">
            <label className="form-label">Package</label>
            <select
              className="form-select"
              value={service}
              onChange={e => setService(e.target.value)}
              required
            >
              <option value="">Select…</option>
              {packages.map(p => (
                <option key={p.title} value={p.title}>{p.title}</option>
              ))}
            </select>
          </div>
          {/* Date */}
          <div className="col-12 col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          {/* Time */}
          <div className="col-12 col-md-6">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>
          {/* Location */}
          <div className="col-12 col-md-6">
            <label className="form-label">Location / Venue</label>
            <input
              type="text"
              className="form-control"
              placeholder="Event address or venue name"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
          </div>
          {/* Phone */}
          <div className="col-12 col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary px-4">
              Submit Booking
            </button>
          </div>
        </form>
      </section>

      <footer className="text-center py-4 text-muted">
        &copy; 2025 Bright Photo Booth
      </footer>
    </main>
  );
}
