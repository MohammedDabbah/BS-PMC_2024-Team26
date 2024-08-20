import React, { useState } from 'react';
import axios from 'axios';

function MessagesPage() {
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
      const response = await axios.post('http://localhost:3001/send-message', formData);
      alert('Message sent successfully!');
      // Optionally reset the form
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

  return (
    <div>
      <h1>Send a Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Recipient's Username:
            <input
              type="text"
              name="recipientUsername"
              value={formData.recipientUsername}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Recipient's Role:
            <select
              name="recipientRole"
              value={formData.recipientRole}
              onChange={handleChange}
              required
            >
              <option value="">Select a Role</option>
              <option value="developer">Developer</option>
              <option value="manager">Manager</option>
              <option value="tester">Tester</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Message Body:
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default MessagesPage;
