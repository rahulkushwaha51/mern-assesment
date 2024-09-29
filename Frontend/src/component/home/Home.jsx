import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="home">
      <h1>Welcome back {user.name}</h1>
      <p>This is the home page content.</p>
    </div>
  );
};

export default Home;
