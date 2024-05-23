import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Welcome to the Contact Management App</h1>
      <Link to="/contacts">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Contact List</button>
      </Link>
    </div>
  );
};

export default Home;
