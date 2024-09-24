import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { logFood } from '../api/api.js'
import { jwtDecode } from 'jwt-decode';

const AddNutrition = () => {
    // initiate use state variable
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [macronutrients, setMacronutrients] = useState({ protein: '', carbs: '', fat: '' });
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    // use navigate initiation
    const navigate = useNavigate();
    // hook to handle token to get values from token
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        setUserId(decodeToken.userId);
    }, []);

    // function to handle submit and call add nutrition api to add data
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('User ID not found. Please log in.');
            return;
        }
    
        try {
            const response = await logFood({
                userId,
                foodItem,
                calories: parseInt(calories, 10),
                macronutrients: {
                    protein: parseInt(macronutrients.protein, 10) || 0,
                    carbohydrates: parseInt(macronutrients.carbs, 10) || 0,
                    fats: parseInt(macronutrients.fat, 10) || 0,
                },
            });
            // Redirect or show success message
            console.log(response.data.message);
            navigate('/nutrition'); // Redirect to nutrition overview or dashboard
        } catch (err) {
            setError(err.response ? err.response.data.error : 'An error occurred');
            console.log(err);
        }
    };
    

    return (
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl mb-4">Add Nutrition</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Food Item</label>
                        <input
                            type="text"
                            value={foodItem}
                            onChange={(e) => setFoodItem(e.target.value)}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Calories</label>
                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Macronutrients</label>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Protein (g)"
                                value={macronutrients.protein}
                                onChange={(e) => setMacronutrients({ ...macronutrients, protein: e.target.value })}
                                className="border rounded p-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Carbs (g)"
                                value={macronutrients.carbs}
                                onChange={(e) => setMacronutrients({ ...macronutrients, carbs: e.target.value })}
                                className="border rounded p-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Fat (g)"
                                value={macronutrients.fat}
                                onChange={(e) => setMacronutrients({ ...macronutrients, fat: e.target.value })}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded py-2 px-4"
                    >
                        Log Food
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddNutrition;
