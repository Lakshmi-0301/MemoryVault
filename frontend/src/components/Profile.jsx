import React from 'react';
import Navbar from './Navbar';

const Profile = () => {
  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#A7ABDE' }}>Profile</h1>
        <p>Manage your profile here.</p>
      </div>
    </div>
  );
};

export default Profile;
