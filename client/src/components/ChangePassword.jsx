import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "./Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ChangePassword() {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New password and confirm new password don't match!");
            setSuccessMessage('');
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/ChangePassword",
                {currentPassword, newPassword, confirmNewPassword }, // Include role in the request
                { withCredentials: true }
            );
            setSuccessMessage('Password reset successful');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error('There was an error resetting the password!', error);
        }
    };
    const handleProfile = () => {
        console.log("Navigating to profile");
        navigate('/profile');
    };

    return (
        <div className="backG">
        
            <div>
                <div style={{ marginTop: "8rem" }}>
                    <button
                        className="btn btn-secondary"
                        onClick={handleProfile}
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
                    <Form onSubmit={handleSubmit} className="mb-3">
                    <h2 style={{ textAlign: "center" }}>Password Change</h2>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3 small-form-group" controlId="formCurrentPassword">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(event) => setCurrentPassword(event.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3 small-form-group" controlId="formNewPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3 small-form-group" controlId="formConfirmNewPassword">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={(event) => setConfirmNewPassword(event.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            <Col md={12}>
                                <Form.Group className="mb-3 small-form-group" controlId="formSubmit">
                                    <Form.Control type="submit" value="Reset Password" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
