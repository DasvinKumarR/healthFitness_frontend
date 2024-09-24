import React, { useState } from 'react';
import { loginUser } from '../api/api.js'; // Import the login function
import { useNavigate, Link } from 'react-router-dom'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Use the hook instead of calling Navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//   function to handle login functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.token); // Store token for future requests
      alert('Login successful!');
      navigate("/dashboard"); // Navigate after successful login
    } catch (error) {
      if(error.response.status === 403){
        alert('User not registered.');
      }else{
        console.log(error)
        alert('Invalid Credentials / Login failed');
      }
      
    }
  };

  return (
    // frontend code
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
        <p className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
