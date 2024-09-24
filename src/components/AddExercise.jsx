import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { logExercise } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout.jsx';

const AddExercise = () => {
    // variable useState initiations
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [distance, setDistance] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [error, setError] = useState(null);

    // initiate navigation 
    const navigate = useNavigate();
    // function for handling submit to call api for add exercise
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Token is missing');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            await logExercise({
                userId,
                exerciseType,
                duration: parseInt(duration, 10),
                distance: parseFloat(distance),
                caloriesBurned: parseInt(caloriesBurned, 10),
            });
            navigate('/exercise'); // Redirect to the exercise list after logging
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to log exercise');
            console.error(err);
        }
    };

    return (
        // frontend code
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl mb-4">Log Your Exercise</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="exerciseType">Exercise Type</label>
                        <input
                            type="text"
                            id="exerciseType"
                            value={exerciseType}
                            onChange={(e) => setExerciseType(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="duration">Duration (minutes)</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="distance">Distance (km)</label>
                        <input
                            type="number"
                            step="0.01"
                            id="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="caloriesBurned">Calories Burned</label>
                        <input
                            type="number"
                            id="caloriesBurned"
                            value={caloriesBurned}
                            onChange={(e) => setCaloriesBurned(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded py-2 px-4"
                    >
                        Log Exercise
                    </button>
                </form>
            </div>

        </Layout>
    );
};

export default AddExercise;
