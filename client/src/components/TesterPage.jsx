import React from 'react';
import AI_assistant from './AI_assistant';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import MessagesForm from './MessagesForm';

const TesterPage = () => {

    const navigate = useNavigate();

    const handleViewCollab = () => {
        navigate('/Collaboration');
    };

    return (
        <div className='primaryPage'>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Header />
            </div>
            <div>
                <button
                    onClick={handleViewCollab}
                    className='btn view-details-btn'
                    style={{ margin: '1rem', color: "white", textDecoration: "underline" }}
                >
                       View collaboration
                </button>

                <AI_assistant />
                </div>
                <div style={{backgroundColor:"#2E073F", justifyContent: 'center', alignItems: 'center', height: '100%',width:"100%"}}>
            <MessagesForm/>
            </div>
            
        </div>
    );
};

export default TesterPage;
