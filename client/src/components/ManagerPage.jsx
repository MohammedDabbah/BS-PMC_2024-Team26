// ManagerPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ManagerPage = () => {
  const navigate = useNavigate();

  const handleViewDeveloperDetails = () => {
    
    navigate('/developerdeta');
  };

  return (
    <div>
      <Header />
      <h2>Manager Page</h2>
      <button onClick={handleViewDeveloperDetails} className='btn btn-primary'>
        View Developer Details
      </button>
      
    </div>
  );
};

export default ManagerPage;
