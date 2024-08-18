import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Home() {
    const navigate = useNavigate();

    const handleFeedbackClick = () => {
        navigate('/feedback');
    };

    const handleAboutUsClick = () => {
        navigate('/AboutUs');
    };

    return (
        <div className='backG'>
            <Header logout={true} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 60px)', 
                width: '100%',
                padding: '0 20px',
            }}>
                <div style={{
                    background: 'rgba(0, 0, 0, 0.5)', 
                    borderRadius: '8px',
                    padding: '20px',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <p style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.6',
                        margin: '0',
                        fontWeight: '300'
                    }}>
                        Discover our cutting-edge AI tool designed to streamline development processes and enhance productivity. Embrace the future of coding with intuitive features and seamless integration, all tailored to support and elevate your projects.
                    </p>
                </div>
            </div>
            <footer style={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                textAlign: 'center',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px', // Add space between the buttons
            }}>
                <button
                    onClick={handleFeedbackClick}
                    className='btn bt'
                    style={{color:'white'}}
                >
                    Go to Feedback
                </button>
                <button
                    onClick={handleAboutUsClick}
                    className='btn bt'
                    style={{color:'white'}}
                >
                    About Us
                </button>
            </footer>
        </div>
    );
}

export default Home;
