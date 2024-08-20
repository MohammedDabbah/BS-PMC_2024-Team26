import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MessagesPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recipientUsername: '',
    recipientRole: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/send-message', formData);
      alert('Message sent successfully!');
      setFormData({
        recipientUsername: '',
        recipientRole: '',
        subject: '',
        body: ''
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {!showForm && (
        <button type="button" className="btn btn-outline-success me-2" onClick={toggleForm} style={{ marginTop: '20vh', fontSize: '16px', padding: '10px 20px' }}>
          Send a Message Here
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            Recipient's Username:
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formrecipientUsername">
                <Form.Control
                  className="small-form-group"
                  type="text"
                  placeholder="Recipient's Username:"
                  name="recipientUsername"
                  value={formData.recipientUsername}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </div>
          <div>
            Recipient's Role:
            <Form.Select name="recipientRole" aria-label="Default select example" value={formData.recipientRole} onChange={handleChange} required>
              <option>Select a Role</option>
              <option value="developer">Developer</option>
              <option value="manager">Manager</option>
              <option value="tester">Tester</option>
            </Form.Select>
          </div>
          <div>
            Subject:
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Control
                  className="small-form-group"
                  type="text"
                  placeholder="Subject:"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </div>
          <div>
            Message Body:
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formbody">
                <Form.Control
                  className="small-form-group"
                  type="text"
                  placeholder="Body:"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </div>
          <button type="submit" className="btn btn-outline-success me-2">Send Message</button>
        </form>
      )}
    </div>
  );
}

export default MessagesPage;
