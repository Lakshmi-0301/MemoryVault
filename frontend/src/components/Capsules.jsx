import React from 'react';
import Navbar from './Navbar';

const Capsules = () => {
  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#A7ABDE' }}>Capsules</h1>
        <p>View your capsules here.</p>
      </div>
    </div>
  );
};

export default Capsules;
