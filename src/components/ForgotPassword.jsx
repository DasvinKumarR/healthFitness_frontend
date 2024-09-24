import React, { useState } from 'react';
import { forgotPassword } from '../api/api.js'; // Assume you have this API function

const ForgotPassword = () => {
    // email usestate initiated
  const [email, setEmail] = useState('');
    // functioin to handle email send for forgot password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email); // Call the API to send reset link
      alert("Reset link sent! Check your email.");
    } catch (error) {
      console.error(error);
      alert("Error sending reset link. Please try again.");
    }
  };

  return (
    // frontend code
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
