
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AI_assistant from './AI_assistant';
import MessagesForm from './MessagesForm';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';

const ManagerPage = () => {
  const navigate = useNavigate();

  const handleViewDeveloperDetails = () => {
    navigate('/developerdeta');
  };

  const handleViewTesterDetails = () => {
    navigate('/testerdeta');
  };

  return (
    <Row>
    <Col md={12}>
    <div className='primaryPage'>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header />
      </div>
      <div>
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
      </div>
      <div style={{backgroundColor:"#2E073F", justifyContent: 'center', alignItems: 'center', height: '100%',width:"100%"}}>
            <MessagesForm/>
            </div>
    </div>
    </Col>
    </Row>
  );
};

export default ManagerPage;
