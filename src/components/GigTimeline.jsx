import React from 'react';
import styles from './GigTimeline.module.css';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function GigTimeline({ gigs }) {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Upcoming Gigs</h1>
      <div className={styles.row}>
        {gigs.map((g, idx) => {
          let linkClass = styles.linkDefault;
          if (g.status === 'booked') linkClass = styles.linkBooked;
          if (g.status === 'cancel') linkClass = styles.linkCancel;

          return (
            <article key={idx} className={styles.card}>
              <div className={styles.date}>
                <time dateTime={`${g.month}${g.day}`}>
                  <span>{g.day}</span>
                  <span>{g.month}</span>
                </time>
              </div>
              <div className={styles.cardCont}>
                <small>{g.category}</small>
                <h3>{g.title}</h3>
                <div className={styles.eventInfo}>
                  <FaCalendarAlt />
                  <div>
                    <time>{g.fullDate}</time><br/>
                    <time>{g.time}</time>
                  </div>
                </div>
                <div className={styles.eventInfo}>
                  <FaMapMarkerAlt />
                  <p>{g.location}</p>
                </div>
                <a href={g.link} className={`${styles.cardLink} ${linkClass}`}>
                  {g.linkText}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
