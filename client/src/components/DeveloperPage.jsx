import React from 'react';
import AI_assistant from './AI_assistant';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const DeveloperPage = () => {
    const navigate = useNavigate();

    const handleViewTesterDetails = () => {
        navigate('/testerdeta');
    };

    return (
        <div className='primaryPage'>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Header />
            </div>
            <div>
                <button
                    onClick={handleViewTesterDetails}
                    className='btn view-details-btn'
                    style={{ margin: '1rem', color: "white", textDecoration: "underline" }}
                >
                    View Tester Details
                </button>

                <AI_assistant />
            </div>
        </div>
    );
};

export default DeveloperPage;



//Hosni
//Hosni231!