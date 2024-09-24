import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getFoodData, deleteFoodData } from '../api/api.js';
import Layout from './Layout.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

const Nutrition = () => {
    const [nutritionData, setNutritionData] = useState([]); // nutrition data state
    const [error, setError] = useState(null); //error state
    const [loading, setLoading] = useState(true); // Loading state
    // intiate navigation
    const navigate = useNavigate();
    // hook to handle token and api calls
    useEffect(() => {
        const fetchNutritionData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("Token missing, Login again");
                setLoading(false);
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                const response = await getFoodData(userId);
                setNutritionData(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchNutritionData();
    }, []);
    // function to handle delete
    const handleDelete = async (id) => {
        try {
            await deleteFoodData(id);
            setNutritionData((prevData) => prevData.filter(item => item._id !== id));
            prompt('Nutrition entry deleted successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to delete nutrition entry.');
        }
    };

    return (
        // frontend code for nutrition
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {loading ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-lg text-gray-700">
                        <p>Loading...</p>
                    </div>
                ) : nutritionData.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-lg text-gray-700">
                        <p>No data available</p>
                        <button
                            onClick={() => navigate('/add-nutrition')}
                            className="mt-4 bg-blue-500 text-white rounded py-2 px-4"
                        >
                            Add Nutrition
                        </button>
                    </div>
                ) : (
                    nutritionData.map((item) => (
                        <div key={item._id} className="bg-green-500 text-black shadow-md rounded-lg p-4">
                            <h3 className="font-bold text-lg">Food: {item.foodItem}</h3>
                            <p>Calories: {item.calories}</p>
                            <p>Protein: {item.macronutrients.protein}g</p>
                            <p>Carbohydrates: {item.macronutrients.carbohydrates}g</p>
                            <p>Fats: {item.macronutrients.fats}g</p>
                            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
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
            {error && <p className="text-red-500">{error}</p>}
        </Layout>
    );
};

export default Nutrition;
