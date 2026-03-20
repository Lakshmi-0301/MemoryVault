import React from 'react';
import Navbar from './Navbar';

const Timeline = () => {
  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#A7ABDE' }}>Timeline</h1>
        <p>Your timeline view.</p>
      </div>
    </div>
  );
};

export default Timeline;
