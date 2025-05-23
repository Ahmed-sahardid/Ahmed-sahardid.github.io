// src/pages/Contact.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // form state
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // testimonials data
  const testimonials = [
    { stars: '⭐⭐⭐⭐⭐', time: 'a day ago', text: 'The photobooth was so much fun!', author: '— Rahwa Berhane' },
    { stars: '⭐⭐⭐⭐⭐', time: 'a day ago', text: 'Great service. Highly recommended!', author: '— Bahja Mohamed' },
    { stars: '⭐⭐⭐⭐⭐', time: 'a day ago', text: 'One of the highlights of the night!', author: '— Hamza Abdullahi' },
  ];

  async function handleInquirySubmit(e) {
    e.preventDefault();
    if (!name || !email || !message) {
      return alert('Please fill out all fields.');
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'questions'), {
        Name: name,
        Email: email,
        Message: message,
        createdAt: serverTimestamp()
      });
      alert('✅ Inquiry submitted! Thank you.');
      // reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container py-5">

      {/* Hero */}
      <section className="hero text-center mb-4" data-aos="fade-down">
        <h1>Contact &amp; Special Offers</h1>
      </section>

      {/* Flash Sale */}
      <div className="flash-sale text-center mb-4" data-aos="fade-up">
        Book in the next <strong>05:00</strong> for <strong>20% off</strong>!
      </div>

      {/* Contact Form */}
      <div className="card mb-4" data-aos="fade-up">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Send Us a Message or Email</h2>
          <form
            onSubmit={handleInquirySubmit}
            className="row g-3 mx-auto"
            style={{ maxWidth: '600px' }}
          >
            <div className="col-12 col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="photoboothbright@gmail.com"
                required
                disabled={submitting}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="4"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </form>
          <p className="mt-3 text-center">
            Or email us directly at{' '}
            <a href="mailto:photoboothbright@gmail.com">
              photoboothbright@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Location & Contact Info */}
      <div className="card mb-4" data-aos="fade-up">
        <div className="card-body text-center">
          <h2 className="card-title mb-3">Our Location &amp; Contact</h2>
          <div
            className="map-responsive mx-auto mb-3"
            style={{ maxWidth: '600px', height: '250px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115559.78068607349!2d-96.13989579123117!3d46.441916499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b32b4e7aa6bdc3%3A0x227ae95dd5c83bfc!2sBright%20Photo%20Booth!5e0!3m2!1sen!2sus!4v1620231234567"
              allowFullScreen
              loading="lazy"
              style={{ border: 0, width: '100%', height: '100%' }}
            />
          </div>
          <p>
            <i className="fas fa-map-marker-alt me-2" />
            <a
              href="https://www.google.com/maps/place/Bright+Photo+Booth"
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          </p>
          <p>
            <i className="fas fa-phone me-2" />
            <a href="tel:+6122617094">(612) 261-7094</a>
          </p>
          <p>
            <i className="fas fa-envelope me-2" />
            <a href="mailto:photoboothbright@gmail.com">
              photoboothbright@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="card mb-4" data-aos="fade-up">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            Frequently Asked Questions
          </h2>
          <details>
            <summary>How long does setup take?</summary>
            <p>Our team sets up in just 15 minutes.</p>
          </details>
          <details>
            <summary>Do you travel?</summary>
            <p>We serve events within 200 miles of Minneapolis.</p>
          </details>
        </div>
      </div>

      {/* Testimonials */}
      <section className="testimonials mb-5" data-aos="fade-up">
        <h2 className="text-center mb-4">What Our Clients Say</h2>
        <Swiper
          modules={[Pagination]}
          loop
          pagination={{ clickable: true }}
          className="testimonial-swiper"
        >
          {testimonials.map((rev, i) => (
            <SwiperSlide key={i} className={`slide-${i + 1} p-4 text-white`}>
              <div className="d-flex justify-content-between mb-2">
                <div>{rev.stars}</div>
                <small>{rev.time}</small>
              </div>
              <p>{rev.text}</p>
              <footer className="text-end">
                <strong>{rev.author}</strong>
              </footer>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Footer */}
      <footer className="bg-light text-center py-4" data-aos="fade-up">
        &copy; 2025 Bright Photo Booth &middot; All Rights Reserved.
      </footer>
    </main>
  );
}
