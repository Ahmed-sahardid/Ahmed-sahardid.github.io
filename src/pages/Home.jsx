// src/pages/Home.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {/* Video background */}
      <video
        id="bg-video"
        className="position-fixed w-100 h-100 top-0 start-0 object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/movie.mp4" type="video/mp4" />
      </video>

      {/* Hero */}
      <div className="hero-card text-center text-white mx-auto p-5" data-aos="fade-down">
        <h1 className="display-4 fw-bold">Bright Photo Booth</h1>
        <p className="lead">Unforgettable photo booth experiences for weddings and events.</p>
        <Link to="/contact" className="btn btn-primary btn-lg me-2">Contact Us</Link>
        <Link to="/book"    className="btn btn-primary btn-lg">Book Now</Link>
      </div>

      {/* Features */}
      <section className="features bg-white py-5" data-aos="fade-up">
        <div className="container">
          <div className="row text-center gy-4">
            <div className="col-md-4">
              <i className="fas fa-camera icon mb-3"></i>
              <h5 className="fw-bold">High-Res Prints</h5>
              <p>Professional-quality prints delivered instantly.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-share-alt icon mb-3"></i>
              <h5 className="fw-bold">Instant Sharing</h5>
              <p>Share your moments on social media with ease.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-palette icon mb-3"></i>
              <h5 className="fw-bold">Custom Themes</h5>
              <p>Tailored backdrops and props for every occasion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews bg-light py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="text-center mb-4">What Our Clients Say</h2>
          <div className="row gy-4">
            {[
              { text: "Our guests couldn't stop talking about how fun and easy the booth was!", author: "— Sarah & Mike" },
              { text: "Exceptional service and top-notch prints—we’ll book again for sure.", author: "— TechCorp Inc." },
              { text: "The custom backdrops made our wedding photos truly unique.", author: "— Emily & John" },
            ].map((rev, i) => (
              <div className="col-md-4" key={i}>
                <div className="review-card p-4 h-100 shadow-sm">
                  <p className="fst-italic mb-3">“{rev.text}”</p>
                  <div className="author text-primary text-end fw-bold">{rev.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="about-us bg-white py-5" data-aos="fade-up">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <div className="shadow rounded overflow-hidden">
                <img src="/images/about.jpeg" alt="About Bright Photo Booth" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="text-primary fw-bold mb-3">About Us</h2>
              <p>Welcome to Bright Photo Booth! We’re passionate about capturing smiles, laughter, and unforgettable moments at weddings, corporate events, birthday parties, and more.</p>
              <p>Our professional-grade equipment and friendly attendants ensure a seamless experience from booking to printouts. With fully customizable templates and props, every event feels uniquely yours.</p>
              <p>Contact us today to learn about packages, pricing, and to secure your date!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light text-center py-4" data-aos="fade-up">
        &copy; 2025 Bright Photo Booth &middot; All Rights Reserved.
      </footer>
    </>
  );
}
