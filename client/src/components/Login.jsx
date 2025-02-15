import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('developer'); // Default role
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password,
                role
            }, { withCredentials: true });

            if (response.status === 200) {
                setUser(response.data.user);
                // Redirect to appropriate page based on role
                switch (response.data.user.role) {
                    case 'developer':
                        navigate('/developer');
                        break;
                    case 'tester':
                        navigate('/tester');
                        break;
                    case 'manager':
                        navigate('/manager');
                        break;
                    default:
                        navigate('/home');
                        break;
                }
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            // Make sure error handling is robust and won't crash the app
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An unexpected error occurred');
            }
            console.error('Login error:', error);
        }
    };

    const handleHome = () => {
        console.log("Navigating to Home");
        navigate('/');
    };

    return (
        <div className='backG'>
            <div style={{ marginTop: "8rem" }}>
                <button
                    className="btn btn-secondary"
                    onClick={handleHome}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 1000, // Ensures the button stays on top of other elements
                    }}
                >
                    <ArrowBackIcon style={{ marginRight: '0.5rem' }} />
                    Back
                </button>

                <Form onSubmit={handleLogin} className='small-form-group'>
                    <h2 style={{ textAlign: "center" }}>Login</h2>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Control
                                    type='text'
                                    className='small-form-group'
                                    value={username}
                                    placeholder='Username'
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Control
                                    type='password'
                                    className='small-form-group'
                                    value={password}
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    className='small-form-group'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="developer">Developer</option>
                                    <option value="manager">Manager</option>
                                    <option value="tester">Tester</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3 small-form-group" controlId="formSubmit">
                                <Form.Control
                                    type='submit'
                                    value='Login'
                                />
                            </Form.Group>
                            <a className='btn btn-dark' href="/Register">
                                Don't have an account? Register here
                            </a>
                            <br></br>
                            <a className='btn btn-dark' href="/ForgotPassword" style={{ marginTop: '0.5rem' }}>
                                Forgot your password? click here
                            </a>
                            {message && <p  style={{ color: 'red' }}>{message}</p>}
                        </Col>
                      
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default Login;
