import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import Footer from './Footer';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('developer'); // Default role
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

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
                alert('Login failed');
            }
        } catch (error) {
            alert('Login failed');
            console.error(error);
        }
    };

    return (
        <div>
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
                        <a href="/Register" className='small-form-group'>Don't have an account? Register here</a>
                        <a href="/ResetPassword" className='small-form-group'>Forget password? Click here</a>
                    </Col>
                </Row>
            </Form>
            <Footer />
        </div>
    );
}

export default Login;