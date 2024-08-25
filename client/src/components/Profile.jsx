import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import UndoIcon from '@mui/icons-material/Undo';
import Header from "./Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Profile() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', { withCredentials: true });
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleGoBack = () => {
    navigate('/'); // Navigate to the previous page
  };

  const [flag, setFlag] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [sign, setSign] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState({
    errorMessage: '',
    passwordError: '',
    successMessage: '',
    verificationMessage: '',
    codeError: ''
  });

  const handleName = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/updates', { data, sign, fname, lname, code, email }, { withCredentials: true });
      if (response.status === 200) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          successMessage: 'Name updated successfully',
          errorMessage: ''
        }));
        navigate(0);
      }
    } catch (error) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        errorMessage: 'Error updating name'
      }));
    }
  };

  const handleEmail = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/updates', { data, sign, fname, lname, code, email }, { withCredentials: true });
      if (response.status === 200) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          successMessage: 'Email updated successfully',
          errorMessage: ''
        }));
        navigate(0);
      }
    } catch (error) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        errorMessage: 'Error updating email'
      }));
    }
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/Verification', { params: { mail: email } }, { withCredentials: true });
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
        verificationMessage: '',
        codeError: 'Failed to send verification email'
      }));
    }
  };

  return (
    <div className="proP">
      <Header />
      <Card style={{ width: '20rem', textAlign: 'center' }} className="profile">
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s" />
        <Card.Body>
          <Card.Title>{data.fname} {data.lname}</Card.Title>
          <Card.Text>
            {flag ? (
              sign === 'nameEdit' ? (
                <Form onSubmit={handleName}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formFname">
                        <Form.Control
                          type="text"
                          className="small-form-group"
                          value={fname}
                          placeholder="First name"
                          onChange={(e) => setFname(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formLname">
                        <Form.Control
                          type="text"
                          className="small-form-group"
                          value={lname}
                          placeholder="Last name"
                          onChange={(e) => setLname(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formSubmit">
                        <Form.Control
                          type="submit"
                          value="Save"
                          className="btn btn-primary"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : sign === 'emailEdit' ? (
                <Form onSubmit={handleEmail}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Control
                          type="email"
                          className="small-form-group"
                          value={email}
                          placeholder="New email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="small-form-group">
                        {messages.verificationMessage && <Form.Text style={{ color: 'blue' }}>{messages.verificationMessage}</Form.Text>}
                        {messages.codeError && <Form.Text style={{ color: 'red' }}>{messages.codeError}</Form.Text>}
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleVerification}
                        >
                          Verify Email
                        </button>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formCode">
                        <Form.Control
                          type="text"
                          className="small-form-group"
                          value={code}
                          placeholder="Verification code"
                          onChange={(e) => setCode(e.target.value)}
                          required
                          style={{marginTop:"20px"}}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formSubmit">
                        <Form.Control
                          type="submit"
                          value="Save"
                          className="btn btn-primary"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : null
            ) : (
              <div>
                <p>username: {data.username}</p>
                <p>your email: {data.mail}</p>
                <label>your role: {data.role}</label>
              </div>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Edit <EditIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/ChangePassword">Change Password</Dropdown.Item>
              <Dropdown.Item onClick={() => { setFlag(true); setSign('nameEdit'); }} data-testid="edit-name">Edit name</Dropdown.Item>
              <Dropdown.Item onClick={() => { setFlag(true); setSign('emailEdit'); }} data-testid="change-email">Change email</Dropdown.Item>
            </Dropdown.Menu>
            <button onClick={handleGoBack} className="btn bt">
            Back <UndoIcon />
          </button>
          </Dropdown>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
