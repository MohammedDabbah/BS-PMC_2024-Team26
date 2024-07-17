import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    mail: '',
    password: '',
    role: ''
  });
  const [messages, setMessages] = useState({
    errorMessage: '',
    passwordError: '',
    successMessage: ''
  });

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData.role)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(formData.password)) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        passwordError: 'Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.'
      }));
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/Register',
        formData,
        { withCredentials: true }
      );
      console.log('Registration successful', response);
      setMessages({
        errorMessage: '',
        passwordError: '',
        successMessage: 'Registration successful'
      });
      navigate('/');
    } catch (error) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        errorMessage: 'Registration failed'
      }));
    }
  };

  return (
    <div>
    <Header/>
      <Form onSubmit={handleSubmit} className='small-form-group'>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formFname">
              <Form.Control
                className="small-form-group"
                type="text"
                placeholder="First name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3" controlId="formLname">
              <Form.Control
                className="small-form-group"
                type="text"
                placeholder="Last name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                className="small-form-group"
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                className="small-form-group"
                type="email"
                placeholder="name@example.com"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                className="small-form-group"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {messages.passwordError && <Form.Text style={{ color: 'red' }}>{messages.passwordError}</Form.Text>}
            </Form.Group>
          </Col>
          
          <Col md={12}>
            <Form.Group>
              <Form.Label>
                Select your role:
              </Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  id="roleDeveloper"
                  label="Developer"
                  name="role"
                  value="developer"
                  checked={formData.role === "developer"}
                  onChange={handleChange}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  id="roleManager"
                  label="Manager"
                  name="role"
                  value="manager"
                  checked={formData.role === "manager"}
                  onChange={handleChange}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  id="roleTester"
                  label="Tester"
                  name="role"
                  value="tester"
                  checked={formData.role === "tester"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3 small-form-group" controlId="formSubmit">
              <Form.Control type="submit" value="Register" className="btn btn-primary" />
            </Form.Group>
          </Col>
        </Row>
        {messages.errorMessage && <p className="error-message" style={{ color: 'red' }}>{messages.errorMessage}</p>}
        {messages.successMessage && <p className="success-message" style={{ color: 'green' }}>{messages.successMessage}</p>}
        <div className="text-center">
          <a href="/login">Already have an account?</a>
        </div>
      </Form>
    </div>
  );
};

export default Register;