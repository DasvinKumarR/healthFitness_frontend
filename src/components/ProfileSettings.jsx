import React, { useEffect, useState } from 'react';
import { getUserData, updateUserData } from '../api/api.js'; 
import Layout from './Layout.jsx';
import { jwtDecode } from 'jwt-decode';

const ProfileSettings = () => {
    // user data state
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profile: {
            height: '',
            weight: '',
            age: '',
        },
    });
    const [error, setError] = useState(null); //error state
    const [userId, setUserId] = useState(''); //userID state
    // to handle token and api call to get data
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const decodeToken = jwtDecode(token);
            const userID = decodeToken.userId;
            setUserId(decodeToken.userId);
            if (!token) {
                console.log("Token missing, Login again");
                return;
            }

            try {
                const response = await getUserData(userID); // Fetch user data from your API
                setUserData(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);
    // function to handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                [name]: value,
            },
        }));
    };
    // function to handle form submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserData(userId, userData); // Send updated data to your API
            prompt('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to update profile.');
        }
    };

    return (
        // frontend code
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl mb-4">Profile Settings</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={userData.name}
                            readOnly
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={userData.email}
                            readOnly
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={userData.profile.height}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={userData.profile.weight}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={userData.profile.age}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded py-2 px-4 saveChange"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ProfileSettings;
