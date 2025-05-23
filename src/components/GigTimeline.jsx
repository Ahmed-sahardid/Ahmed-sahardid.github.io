// src/components/GigTimeline.jsx
import React from 'react';
import styles from './GigTimeline.module.css';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function GigTimeline({ gigs }) {
  return (
    <section className={styles.timeline}>
      <h2 className={styles.heading}>Upcoming Gigs</h2>
      <div className={styles.row}>
        {gigs.map((g, i) => {
          let badgeClass = styles.badgePending;
          if (g.status === 'completed') badgeClass = styles.badgeCompleted;

          return (
            <article key={g.id} className={styles.card}>
              <div className={styles.date}>
                <time dateTime={`${g.month}${g.day}`}>
                  <span>{g.day}</span>
                  <span>{g.month}</span>
                </time>
              </div>
              <div className={styles.content}>
                <small className={styles.category}>{g.category}</small>
                <h3 className={styles.title}>{g.title}</h3>
                <div className={styles.eventInfo}>
                  <FaCalendarAlt className={styles.icon} />
                  <time>{g.fullDate} • {g.time}</time>
                </div>
                <div className={styles.eventInfo}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <span>{g.location}</span>
                </div>
                <span className={`${styles.badge} ${badgeClass}`}>
                  {g.status.charAt(0).toUpperCase() + g.status.slice(1)}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
);
}
