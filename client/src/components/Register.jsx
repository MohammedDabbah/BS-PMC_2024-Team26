import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    mail: '',
    password: '',
    role: '',
    code: ''
  });
  const [messages, setMessages] = useState({
    errorMessage: '',
    passwordError: '',
    successMessage: '',
    verificationMessage: '',
    codeError: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Form Data:', formData);

    if (!validatePassword(formData.password)) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        passwordError: 'Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.'
      }));
      return;
    }

    if (formData.code === '') {
      setMessages((prevMessages) => ({
        ...prevMessages,
        codeError: 'Please enter the verification code.'
      }));
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/Register', formData, { withCredentials: true });
      console.log('Registration Response:', response.data);
      setMessages({
        errorMessage: '',
        passwordError: '',
        successMessage: 'Registration successful',
        verificationMessage: '',
        codeError: ''
      });
      navigate(0);
    } catch (error) {
      console.error('Registration Error:', error);
      setMessages((prevMessages) => ({
        ...prevMessages,
        errorMessage: error.response?.data?.message || 'Registration failed'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/Verification', {
        params: {
          mail: formData.mail
        }
      }, { withCredentials: true });
      console.log('Verification Response:', response.data);
      setMessages((prevMessages) => ({
        ...prevMessages,
        verificationMessage: 'Verification email sent',
        codeError: ''
      }));
    } catch (error) {
      console.error('Verification Error:', error);
      setMessages((prevMessages) => ({
        ...prevMessages,
        verificationMessage: 'Failed to send verification email',
        codeError: ''
      }));
    }
  };

  const handleHome = () => {
    console.log("Navigating to Home");
    navigate('/Home');
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
      color: '#fff', // White text color for contrast
  }}>

    <div>
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
        <Form onSubmit={handleSubmit} className='small-form-group'>
          <h2 style={{ textAlign: "center" }}>Sign up</h2>
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
                  required
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
                  required
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
                  required
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
                  required
                />

              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="small-form-group">
                {messages.verificationMessage && <Form.Text style={{ color: 'blue' }}>{messages.verificationMessage}</Form.Text>}
                <Form.Control
                  className="btn btn-success"
                  type="button"
                  value={'Verify Email'}
                  onClick={handleVerification}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3" controlId="formCode">
                <Form.Control
                  className="small-form-group"
                  type="text"
                  placeholder="Enter the 4-digit code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
                {messages.codeError && <Form.Text style={{ color: 'red' }}>{messages.codeError}</Form.Text>}
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
                  required
                />
                {messages.passwordError && <Form.Text style={{ color: 'red' }}>{messages.passwordError}</Form.Text>}
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Select your role:</Form.Label>
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
                <Form.Control type="submit" value={isLoading ? "Registering..." : "Register"} className="btn btn-primary" disabled={isLoading} />
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
    </div>
    </div>
  );
};

export default Register;
