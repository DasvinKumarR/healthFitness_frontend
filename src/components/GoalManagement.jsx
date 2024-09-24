import React, { useState, useEffect } from 'react';
import { getGoals, updateProgress, deleteGoal } from '../api/api.js';
import { jwtDecode } from 'jwt-decode';
import Layout from './Layout.jsx';

const GoalManagement = () => {
    const [goals, setGoals] = useState([]);
    const [selectedGoalId, setSelectedGoalId] = useState('');
    const [progress, setProgress] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch goals on component mount
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                const response = await getGoals(userId);
                setGoals(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchGoals();
    }, []);

    // Update progress
    const handleUpdateProgress = async (goalId) => {
        if (!progress) {
            setError('Please enter progress.');
            return;
        }

        try {
            await updateProgress(goalId, progress);
            setGoals((prev) =>
                prev.map((goal) =>
                    goal._id === goalId ? { ...goal, progress } : goal
                )
            );
            setProgress('');
            setSelectedGoalId('');
            setError(null);
        } catch (err) {
            console.log(err);
            setError(err.response.data.error || 'Failed to update progress');
        }
    };

    // Delete goal
    const handleDeleteGoal = async (goalId) => {
        try {
            await deleteGoal(goalId);
            setGoals(goals.filter((goal) => goal._id !== goalId));
        } catch (err) {
            setError(err.response.data.error || 'Failed to delete goal');
        }
    };

    return (
        // frontend code for goal management
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl mb-4">Manage Your Goals</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                {loading ? (
                    <div className="text-center text-lg text-gray-700">
                        Loading...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {goals.length === 0 ? (
                            <div className="col-span-full text-center text-lg text-gray-700">
                                No goals available.
                            </div>
                        ) : (
                            goals.map((goal) => (
                                <div key={goal._id} className="border rounded p-4 shadow-lg">
                                    <h3 className="text-lg font-bold">{goal.type}</h3>
                                    <p className="mt-2">Progress: {goal.progress}/{goal.target}</p>
                                    <p className="mt-2">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>

                                    <input
                                        type="number"
                                        value={selectedGoalId === goal._id ? progress : ''}
                                        onChange={(e) => {
                                            setSelectedGoalId(goal._id);
                                            setProgress(e.target.value);
                                        }}
                                        placeholder="Enter new progress"
                                        className="border rounded p-2 w-full mt-2"
                                    />

                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => handleUpdateProgress(goal._id)}
                                            className="bg-blue-500 text-white rounded py-1 px-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteGoal(goal._id)}
                                            className="bg-red-500 text-white rounded py-1 px-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default GoalManagement;
