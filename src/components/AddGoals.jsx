import React, { useState, useEffect } from 'react';
import { setGoal } from '../api/api.js';
import { jwtDecode } from 'jwt-decode';
import Layout from './Layout.jsx';
import { useNavigate } from 'react-router-dom';

const AddGoals = () => {
    // initiate use state variable
    const [goalType, setGoalType] = useState('');
    const [target, setTarget] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState('');
    // initiate navigation
    const navigate = useNavigate();
    // hook to handle token to get values from token
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        setUserId(decodeToken.userId);
    }, []);
    // function to handle submit and call add goal api to add data
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setError('User ID is missing');
            return;
        }

        const goalData = {
            userId,
            type: goalType,
            target: parseInt(target, 10),
            deadline,
        };

        try {
            const response = await setGoal(goalData);
            setSuccess(response.data.message);
            setError(null);
            // Reset the form
            setGoalType('');
            setTarget('');
            setDeadline('');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            setSuccess('');
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl mb-4">Set a New Goal</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Goal Type</label>
                        <input
                            type="text"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Target</label>
                        <input
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Deadline</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded py-2 px-4"
                    >
                        Set Goal
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddGoals;
