import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

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

  return (
    <header>
      <h1>Development App-AI</h1>
      <nav>
        <button onClick={handleLogout}>Logout</button>
        {/* Other navigation links */}
      </nav>
    </header>
  );
};

export default LoggedHeader;
