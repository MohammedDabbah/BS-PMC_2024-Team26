import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CloseIcon from '@mui/icons-material/Close';

function MessagesForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recipientUsername: '',
    recipientRole: '',
    subject: '',
    body: '',
    done:false,
  });
  const [messageStatus, setMessageStatus] = useState(null); // To track the success or error message

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
      await axios.post('http://localhost:3001/send-message', formData, { withCredentials: true });
      setMessageStatus({ type: 'success', text: 'Message sent successfully!' });
      setFormData({
        recipientUsername: '',
        recipientRole: '',
        subject: '',
        body: ''
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessageStatus({ type: 'danger', text: 'Failed to send message' });
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setMessageStatus(null); // Reset message status when toggling the form
  };

  return (
    <div style={{ maxWidth: '500px', margin: '5vh'}}>
      {!showForm && (
        <Button variant="outline-light" onClick={toggleForm} style={{ borderRadius: "20px"}}>
          Send a Message
        </Button>
      )}
      {showForm&& (
        <Button variant="danger" onClick={()=>{setShowForm(false);setMessageStatus(null);}}>Close <CloseIcon/></Button>
      )}
      {showForm && (
        <>
          {messageStatus && (
            <Alert variant={messageStatus.type} onClose={() => setMessageStatus(null)} dismissible style={{marginTop:"20px"}}>
              {messageStatus.text}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="formrecipientUsername" className="mb-3">
              <Form.Label>Recipient's Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipient's username"
                name="recipientUsername"
                value={formData.recipientUsername}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formrecipientRole" className="mb-3">
              <Form.Label>Recipient's Role</Form.Label>
              <Form.Select name="recipientRole" value={formData.recipientRole} onChange={handleChange} required>
                <option value="">Select a Role</option>
                <option value="developer">Developer</option>
                <option value="manager">Manager</option>
                <option value="tester">Tester</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBody" className="mb-3">
              <Form.Label>Message Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default MessagesForm;
