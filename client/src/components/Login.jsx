import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import Footer from './Footer';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('developer'); // Default role
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password, role }, { withCredentials: true });
            if (response.data) {
                if (role === 'developer') {
                    navigate('/Developer');
                } else if (role === 'manager') {
                    navigate('/Manager');
                } else if (role === 'tester') {
                    navigate('/Tester');
                } else {
                    alert('Unknown role');
                }
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Username or Password is Incorrect');
        }
    };

    return (
        <div>
            <Header />
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
                        <a href="/" className='small-form-group'>Don't have an account? Register here</a>
                        <a href="/ResetPassword" className='small-form-group'>Forget password? Click here</a>
                    </Col>
                </Row>
            </Form>
            <Footer />
        </div>
    );
}

export default Login;