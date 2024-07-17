import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "./Header";
import Footer from "./Footer";

function ChangePassword() {
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [role, setRole] = useState(""); // Add role state
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
                { username, currentPassword, newPassword, role }, // Include role in the request
                { withCredentials: true }
            );
            setSuccessMessage('Password reset successful');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error('There was an error resetting the password!', error);
        }
    };

    return (
        <div>
            <Header />
            <Form onSubmit={handleSubmit} className="mb-3">
                <h2 style={{ marginLeft: '0.5rem', marginTop: "1rem", fontStyle: 'oblique', fontFamily: 'monospace', textDecorationLine: ' overline' }}>Password reset</h2>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3 small-form-group" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
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
                    <Col md={12}>
                        <Form.Group className="mb-3 small-form-group" controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Role (developer, manager, tester)"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
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
                <img src="https://t4.ftcdn.net/jpg/00/84/41/47/360_F_84414732_yINLjwPITwl6YqR4mkmGQkjH36ns2MXr.jpg" style={{ width: "25rem", marginLeft: '5rem' }}></img>
            </Form>
        </div>
    );
};

export default ChangePassword;
