import React, { useState } from 'react';
import { registerUser } from '../api/api.js'; // Import the register function
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' }); //formData state

    const navigate = useNavigate(); // initiate navigation
    // function for handle change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // function to handle 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check password length
        if (formData.password.length < 6) {
            prompt('Password must be at least 6 characters long.');
            return; // Prevent form submission
        }

        try {
            await registerUser(formData);
            prompt('Registration successful! Please check your email to activate your account.');
            navigate("/login");
        } catch (error) {
            console.error(error);
            prompt('Registration failed. Please try again.');
        }
    };

    return (
        // frontend code
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Register</h2>
                <input type="text" name="name" onChange={handleChange} placeholder="Name" required className="border p-2 mb-4 w-full" />
                <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="border p-2 mb-4 w-full" />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="border p-2 mb-4 w-full" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
