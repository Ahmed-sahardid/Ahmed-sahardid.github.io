// src/pages/Portfolio.jsx
import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const images = [
    '/images/IMG_9166.JPG','public/images/IMG_9167.JPG','/images/IMG_9168.JPG',
    '/images/IMG_9169.JPG','/images/IMG_9170.JPG','/images/IMG_9171.JPG',
    '/images/IMG_9172.JPG','/images/IMG_9173.JPG','/images/IMG_9174.JPG',
    '/images/IMG_9175.JPG','/images/IMG_9176.JPG','/images/IMG_9177.JPG',
    '/images/IMG_9178.JPG','/images/IMG_9179.JPG','/images/IMG_9180.JPG',
  ];

  const [filter, setFilter] = useState('');
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const filtered = images.filter(src => {
    if (!filter) return true;
    const name = src.split('/').pop().split('.')[0];
    return name.includes(filter);
  });

  function openLightbox(idx) {
    setCurrent(idx);
    setIsOpen(true);
  }
  function closeLightbox() {
    setIsOpen(false);
  }
  function showPrev() {
    setCurrent((current - 1 + filtered.length) % filtered.length);
  }
  function showNext() {
    setCurrent((current + 1) % filtered.length);
  }

  useEffect(() => {
    function handler(e) {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeLightbox();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, current, filtered]);

  return (
    <main className="container py-5">
      <header className="text-center mb-4">
        <h1>Photo Gallery</h1>
        <input
          type="search"
          placeholder="Search images..."
          value={filter}
          onChange={e => setFilter(e.target.value.trim())}
          className="form-control mx-auto"
          style={{ maxWidth: '400px' }}
        />
      </header>

      <section className="row g-3">
        {filtered.map((src, i) => (
          <div className="col-6 col-md-4 col-lg-3" key={i}>
            <div
              className="gallery-item"
              style={{ cursor: 'pointer' }}
              onClick={() => openLightbox(i)}
            >
              <img src={src} alt={`Photo ${i}`} className="img-fluid rounded" />
              <figcaption className="text-center mt-2">Photo {i}</figcaption>
            </div>
          </div>
        ))}
      </section>

      {isOpen && (
        <div className="lightbox open" onClick={e => e.target === e.currentTarget && closeLightbox()}>
          <button className="nav prev" onClick={e => { e.stopPropagation(); showPrev(); }}>‹</button>
          <img src={filtered[current]} alt={`Photo ${current}`} className="rounded" />
          <button className="nav next" onClick={e => { e.stopPropagation(); showNext(); }}>›</button>
          <button className="close" onClick={e => { e.stopPropagation(); closeLightbox(); }}>×</button>
        </div>
      )}
    </main>
  );
}
