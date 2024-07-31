import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import DeveloperPage from './DeveloperPage';
import TesterPage from './TesterPage';
import ManagerPage from './ManagerPage';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Messages from './Messages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="/tester" element={<TesterPage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
