import React from 'react';
import Navbar from './Navbar';

const Summary = () => {
  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#A7ABDE' }}>AI Summary</h1>
        <p>Your AI generated summaries.</p>
      </div>
    </div>
  );
};

export default Summary;
