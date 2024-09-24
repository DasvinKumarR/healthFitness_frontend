import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage"
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Nutrition from './components/Nutrition';
import AddNutrition from './components/AddNutrition';
import Exercise from './components/Exercise';
import AddExercise from './components/AddExercise';
import AddGoals from './components/AddGoals';
import GoalManagement from './components/GoalManagement';
import ProfileSettings from './components/ProfileSettings';

function App() {
  return (
   <Router> 
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword/>} />
      <Route path='/nutrition' element={<Nutrition /> }/>
      <Route path='/add-nutrition' element={<AddNutrition />} />
      <Route path='/exercise' element={<Exercise />} />
      <Route path='/add-exercise' element={<AddExercise />} />
      <Route path='/add-goal' element={<AddGoals />} />
      <Route path='/goal-management' element={<GoalManagement /> } />
      <Route path='/user-profile' element={<ProfileSettings />} />
    </Routes>
   </Router>
  )
}

export default App