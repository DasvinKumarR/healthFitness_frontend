import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    // landing page for the application 
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Health and Fitness App</h1>
      <div className="flex space-x-4"> {/* This div wraps the buttons and uses Flexbox */}
        <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded">Register</Link>
        <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
