// Home.js
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from localStorage or another source
    const token = localStorage.getItem('token');

    // Optional: decode the token if it contains username
    // or fetch user data from the backend using the token
    const savedUsername = localStorage.getItem('username'); // just an example
    setUsername(savedUsername || 'Guest');
  }, []);

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1>Welcome, {username}!</h1>
    </div>
  );
};

export default Home;
