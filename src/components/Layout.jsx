import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import { jwtDecode } from 'jwt-decode';

const Layout = ({ children }) => {
    // usestate initiations
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    // hook to handle token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserName(decodedToken.name);
        }
    }, []);
    // function to have dropdown toggle
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };
    // function to navigate to selection page
    const handleOptionClick = (path) => {
        navigate(path);
        setDropdownOpen(false);
    };
    // function to handle logout
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        // frontend code
        <div className="flex h-screen flex-col">
            {/* Navigation Bar */}
            <div className="flex justify-between items-center bg-orange-300 p-4 sticky top-0 z-10">
                <h1 className="text-lg font-bold">Health and Fitness</h1>
                {/* Profile Dropdown */}
                <div className="relative">
                    <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                        <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
                        <span className="ml-2">{userName}</span>
                    </div>
                    {dropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-20">
                            <ul className="py-2">
                                <li onClick={() => handleOptionClick('/user-profile')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile Settings</li>
                                <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-grow">
                {/* Sidebar */}
                <aside className="w-64 bg-orange-200 shadow-md p-4">
                    <ul>
                        <li onClick={() => handleOptionClick('/dashboard')} className="mb-2 cursor-pointer hover:bg-orange-500 p-2 rounded">Dashboard</li>
                        <li onClick={() => handleOptionClick('/nutrition')} className="mb-2 cursor-pointer hover:bg-orange-500 p-2 rounded">Nutrition</li>
                        <li onClick={() => handleOptionClick('/exercise')} className="mb-2 cursor-pointer hover:bg-orange-500 p-2 rounded">Exercise</li>
                        <li onClick={() => handleOptionClick('/goal-management')} className="mb-2 cursor-pointer hover:bg-orange-500 p-2 rounded">Goal Management</li>
                        <li onClick={() => handleOptionClick('/add-nutrition')} className="mb-2 cursor-pointer hover:bg-orange-500 p-2 rounded">Add Food Nutrition</li>
                        <li onClick={() => handleOptionClick('/add-goal')} className="mb-2 cursor-pointer hover:bg-orange-500 p-2 rounded">Add Goal</li>
                        <li onClick={() => handleOptionClick('/add-exercise')} className="mb-2 cursor-pointer hover:bg-orange-500 p-2 rounded">Add Exercise</li>
                    </ul>
                </aside>

                {/* Main Content */}
                <div className="flex-grow p-6 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
