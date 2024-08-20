import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import Email from '@mui/icons-material/Email';

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

  const handleTesterMessages = () => {
    console.log("Navigating to Messages");
    navigate('/Messages');
  };

  return (
    <div className="d-flex justify-content-end align-items-center w-100">
      <button className='btn btn-outline-primary me-2' onClick={handleProfile}>
        <AccountCircleIcon style={{ marginRight: '0.5rem' }} />
        Profile
      </button>
      <button onClick={handleLogout} className='btn btn-danger me-2'>
        Logout
      </button>
      <button type="button" className="btn btn-outline-success me-2" onClick={handleTesterMessages}>
        <Email style={{ marginRight: '0.5rem' }} />
        Messages
      </button>
    </div>
  );
};

export default LoggedHeader;
