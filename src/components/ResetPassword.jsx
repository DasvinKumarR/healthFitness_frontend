import React, { useState } from 'react';
import { resetPassword } from '../api/api.js'; // Assume you have this API function
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState(''); //new password state
  const [confirmPassword, setConfirmPassword] = useState(''); //confirm password state
  const navigate = useNavigate(); // navigation initiation
  const { token } = useParams(); // get token from params
  // function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await resetPassword(token, { newPassword: newPassword }); // Call the API to reset password
      prompt("Password has been reset! You can now login.");
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error(error);
      prompt("Error resetting password. Please try again.");
    }
  };

  return (
    // frontend code
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
