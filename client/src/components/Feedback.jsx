import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/send-feedback', { feedback });
            setMessage(response.data.message);
            setMessageType('success');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to send feedback');
            setMessageType('danger');
        }
    };

    const handleBackToLogin = () => {
        navigate('/login'); 
    };

    return (
        <div style={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff', 
        }}>
            <div style={{ marginTop: "8rem" }}>
                <button
                    className="btn btn-secondary"
                    onClick={handleBackToLogin}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 1000, 
                    }}
                >
                    <ArrowBackIcon style={{ marginRight: '0.5rem' }} />
                    Back to Login
                </button>

                <Form onSubmit={handleSubmit} className='small-form-group' style={{ width: '100%', maxWidth: '500px' }}>
                    <h2 style={{ textAlign: "center" }}>Submit Your Feedback</h2>
                    <Form.Group controlId="feedbackTextarea">
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Enter your feedback here..."
                            required
                            style={{ marginBottom: '15px' }}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" block>
                        Submit Feedback
                    </Button>
                </Form>

                {message && (
                    <Alert 
                        variant={messageType} 
                        style={{ 
                            marginTop: '20px', 
                            width: '100%', 
                            maxWidth: '500px', 
                            textAlign: 'center' 
                        }}
                    >
                        <Alert.Heading>
                            {messageType === 'success' ? 'Success!' : 'Error'}
                        </Alert.Heading>
                        <p>{message}</p>
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default Feedback;
