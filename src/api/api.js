// src/api.js

import axios from 'axios';

const API_URL = 'https://healthfitness-backend.onrender.com';

// User API calls
export const registerUser = async (data) => {
    return await axios.post(`${API_URL}/users/register`, data);
};

export const loginUser = async (data) => {
    return await axios.post(`${API_URL}/users/login`, data);
};

export const activateUser = async (token) => {
    return await axios.get(`${API_URL}/users/activate/${token}`);
};

export const forgotPassword = async (email) => {
    return await axios.post(`${API_URL}/users/forgot-password`, {email});
};

export const resetPassword = async (token, data) => {
    return await axios.post(`${API_URL}/users/reset-password/${token}`, data);
};

export const getUserData = async (userId) => {
    return await axios.get(`${API_URL}/users/get-user/${userId}`);
};

export const updateUserData = async (userId, data) => {
    return await axios.put(`${API_URL}/users/update-profile/${userId}`, data);
}

// Nutrition API calls
export const logFood = async (data) => {
    return await axios.post(`${API_URL}/nutrition/log`, data);
};

export const getFoodData = async (userId) => {
    return await axios.get(`${API_URL}/nutrition/data`, { params: { userId } });
};

export const deleteFoodData = async (id) => {
    return await axios.delete(`${API_URL}/nutrition/delete/${id}`)
}

// Goal API calls
export const setGoal = async (data) => {
    return await axios.post(`${API_URL}/goals/set`, data);
};

export const getGoals = async (userId) => {
    return await axios.get(`${API_URL}/goals/all`, { params: { userId } });
};

export const updateProgress = async (goalId, progress) => {
    return await axios.put(`${API_URL}/goals/update`, { goalId, progress });
};

export const deleteGoal = async (goalId) => {
    return await axios.delete(`${API_URL}/goals/delete/${goalId}`);
}

// Fitness API calls
export const logExercise = async (data) => {
    return await axios.post(`${API_URL}/fitness/log`, data);
};

export const getExerciseData = async (userId) => {
    return await axios.get(`${API_URL}/fitness/data`, { params: { userId } });
};

export const deleteExerciseData = async (id) => {
    return await axios.delete(`${API_URL}/fitness/delete/${id}`);
}
