
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AI_assistant from './AI_assistant';

const ManagerPage = () => {
  const navigate = useNavigate();

  const handleViewDeveloperDetails = () => {
    navigate('/developerdeta');
  };

  const handleViewTesterDetails = () => {
    navigate('/testerdeta');
  };

  return (
    <div className='primaryPage'>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header />
      </div>
      <button onClick={handleViewDeveloperDetails}
        className='btn view-details-btn'
        style={{ margin: '1rem', color: "white", textDecoration: "underline" }}>
        View Developer Details
      </button>
      <button onClick={handleViewTesterDetails} className='btn view-details-btn'
        style={{ margin: '1rem', color: "white", textDecoration: "underline" }}>
        View Tester Details
      </button>

      <AI_assistant />
      <MessagesPage />
    </div>
  );
};

export default ManagerPage;
