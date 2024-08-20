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
import DeveloperDetailsPage from './DeveloperDetailsPage';
import TesterDetailsPage from './TesterDetailsPage';
import Feedback from './Feedback';
import AboutUs from './AboutUs';
import MessagesPage from './MessagesPage';
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
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/aboutus" element={<AboutUs />} />

          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="/tester" element={<TesterPage />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/MessagesPage" element={<MessagesPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/developerdeta" element={<DeveloperDetailsPage />} />
            <Route path="/testerdeta" element={<TesterDetailsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
