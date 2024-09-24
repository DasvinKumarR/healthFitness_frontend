import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getGoals } from '../api/api.js';
import { jwtDecode } from 'jwt-decode';
import Layout from './Layout.jsx';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    // initiate navigation
    const navigate = useNavigate();
    // hook to handle token and get goal for the users
    useEffect(() => {
        const fetchGoals = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;
                    const response = await getGoals(userId);
                    setGoals(response.data);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.log('No goals found for the user.');
                    } else {
                        console.error('Error fetching goals:', error);
                    }
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            } else {
                setLoading(false); // Set loading to false if no token
            }
        };

        fetchGoals();
    }, []);
    // mapping goal details 
    const data = {
        labels: goals.map(goal => goal.type),
        datasets: [
            {
                label: 'Progress',
                data: goals.map(goal => goal.progress),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Target',
                data: goals.map(goal => goal.target), 
                backgroundColor: 'rgba(255, 99, 132, 0.6)', 
            },
        ],
    };

    return (
        // front graph code
        <Layout>
            <div className="flex-grow p-6 overflow-auto">
                <h2 className="text-2xl mb-4">Your Goals</h2>
                {loading ? (
                    <div className="text-center text-gray-700">
                        <p>Loading...</p>
                    </div>
                ) : goals.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-lg text-gray-700">
                        <p>No data available</p>
                        <button
                            onClick={() => navigate('/add-goal')}
                            className="mt-4 bg-blue-500 text-white rounded py-2 px-4"
                        >
                            Add Goals
                        </button>
                    </div>
                ) : (
                    <Bar data={data} />
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
