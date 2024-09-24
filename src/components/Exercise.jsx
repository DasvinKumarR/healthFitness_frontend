import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getExerciseData, deleteExerciseData } from '../api/api.js'; // Adjust the import as needed
import Layout from './Layout.jsx';
import { useNavigate } from 'react-router-dom';

const Exercise = () => {
    const [exerciseData, setExerciseData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();
    // hook initiation to handle token and call api to get exercise data
    useEffect(() => {
        const fetchExerciseData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("Token missing, Login again");
                setLoading(false); // Set loading to false if no token
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                const response = await getExerciseData(userId);
                setExerciseData(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchExerciseData();
    }, []);

    // function to handle delete
    const handleDelete = async (id) => {
        try {
            await deleteExerciseData(id); // Call the delete function
            setExerciseData((prevData) => prevData.filter(item => item._id !== id)); // Update state to remove deleted item
            alert('Exercise entry deleted successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to delete exercise entry.');
        }
    };

    return (
        // frontend code
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {loading ? (
                    <div className="col-span-full text-center text-lg text-gray-700">
                        Loading...
                    </div>
                ) : exerciseData.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-lg text-gray-700">
                        <p>No data available</p>
                        <button
                            onClick={() => navigate('/add-exercise')}
                            className="mt-4 bg-blue-500 text-white rounded py-2 px-4"
                        >
                            Add Exercise
                        </button>
                    </div>
                ) : (
                    exerciseData.map((item) => (
                        <div key={item._id} className="bg-blue-400 text-black shadow-md rounded-lg p-4">
                            <h3 className="font-bold text-lg">{item.exerciseType}</h3>
                            <p>Duration: {item.duration} minutes</p>
                            <p>Distance: {item.distance} km</p>
                            <p>Calories Burned: {item.caloriesBurned}</p>
                            <p>Date: {item.date}</p>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-500 text-white rounded py-1 px-2 mt-2"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
};

export default Exercise;
