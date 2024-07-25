import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const LoggedHeader = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        setUser(null);
        navigate('/login');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      alert('Logout failed');
      console.error('Logout error:', error);
    }
  };

  const handleProfile = () => {
    console.log("Navigating to profile");
    navigate('/profile');
  };

  return (
    <div className="d-flex justify-content-end align-items-center w-100">
      <button className='btn btn-outline-primary me-2' onClick={handleProfile}>
        <AccountCircleIcon style={{ marginRight: '0.5rem' }} />
        Profile
      </button>
      <button onClick={handleLogout} className='btn btn-danger'>
        Logout
      </button>
    </div>
  );
};

export default LoggedHeader;
