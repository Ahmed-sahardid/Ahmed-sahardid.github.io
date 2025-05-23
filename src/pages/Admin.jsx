import React from 'react';
import SummaryCards from '../components/SummaryCards';
import GigTimeline from '../components/GigTimeline';

export default function Admin() {
  const gigs = [
    /* … your gigs data … */
  ];

  return (
    <>
      <SummaryCards />
      <GigTimeline gigs={gigs} />
    </>
  );
}
