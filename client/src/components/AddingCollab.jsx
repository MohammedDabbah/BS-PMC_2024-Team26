import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CloseIcon from '@mui/icons-material/Close';



function AddingCollab({ refreshCollaborations }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        collabUsername: '',
        collabRole: '',
    });
    const [messageStatus, setMessageStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/adding-collab', formData, { withCredentials: true });
            setMessageStatus({ type: 'success', text: 'Collaboration added successfully!' });
            setFormData({
                collabUsername: '',
                collabRole: '',
            });
            refreshCollaborations(); // Refresh the list of collaborations
        } catch (error) {
            console.error('Failed to add collaboration:', error);
            setMessageStatus({ type: 'danger', text: 'Failed to add collaboration' });
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setMessageStatus(null);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '5vh' }}>
            {!showForm && (
                <Button variant="outline-light" onClick={toggleForm} style={{ borderRadius: "20px" }}>
                    Add collaboration
                </Button>
            )}
            {showForm && (
                <Button variant="danger" onClick={toggleForm}>Close <CloseIcon /></Button>
            )}
            {showForm && (
                <>
                    {messageStatus && (
                        <Alert variant={messageStatus.type} onClose={() => setMessageStatus(null)} dismissible>
                            {messageStatus.text}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit} className="mt-4">
                        <Form.Group controlId="formCollabUsername" className="mb-3">
                            <Form.Label>Collab's Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter collab's username"
                                name="collabUsername"
                                value={formData.collabUsername}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCollabRole" className="mb-3">
                            <Form.Label>Collab's Role</Form.Label>
                            <Form.Select name="collabRole" value={formData.collabRole} onChange={handleChange} required>
                                <option value="">Select a Role</option>
                                <option value="developer">Developer</option>
                                <option value="manager">Manager</option>
                                <option value="tester">Tester</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100">
                            Add Collab
                        </Button>
                    </Form>
                </>
            )}
        </div>
    );
}

export default AddingCollab;
