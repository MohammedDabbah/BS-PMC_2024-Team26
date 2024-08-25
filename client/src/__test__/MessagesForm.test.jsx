import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MessagesForm from '../components/MessagesForm';

// Mock Axios
jest.mock('axios');

describe('MessagesForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form when "Send a Message" button is clicked', () => {
    render(<MessagesForm />);

    // Initially, the form should not be visible
    expect(screen.queryByPlaceholderText("Enter recipient's username")).not.toBeInTheDocument();

    // Click "Send a Message" to show the form
    fireEvent.click(screen.getByText(/Send a Message/i));

    // Now the form should be visible
    expect(screen.getByPlaceholderText("Enter recipient's username")).toBeInTheDocument();
  });

  test('hides the form when "Close" button is clicked', () => {
    render(<MessagesForm />);

    // Show the form
    fireEvent.click(screen.getByText(/Send a Message/i));

    // Now the form should be visible
    expect(screen.getByPlaceholderText("Enter recipient's username")).toBeInTheDocument();

    // Click "Close" to hide the form
    fireEvent.click(screen.getByText(/Close/i));

    // The form should now be hidden
    expect(screen.queryByPlaceholderText("Enter recipient's username")).not.toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Message sent successfully!' } });

    render(<MessagesForm />);

    // Show the form
    fireEvent.click(screen.getByText(/Send a Message/i));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("Enter recipient's username"), { target: { value: 'recipientUser' } });
    fireEvent.change(screen.getByPlaceholderText('Enter the subject'), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your message'), { target: { value: 'Test Body' } });
    fireEvent.change(screen.getByLabelText("Recipient's Role"), { target: { value: 'developer' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Send Message/i));

    // Wait for the success alert to be displayed
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });

    // Ensure the form is cleared
    expect(screen.getByPlaceholderText("Enter recipient's username").value).toBe('');
    expect(screen.getByPlaceholderText('Enter the subject').value).toBe('');
    expect(screen.getByPlaceholderText('Enter your message').value).toBe('');
    expect(screen.getByLabelText("Recipient's Role").value).toBe('');
  });

  test('displays an error message when form submission fails', async () => {
    axios.post.mockRejectedValue(new Error('Failed to send message'));

    render(<MessagesForm />);

    // Show the form
    fireEvent.click(screen.getByText(/Send a Message/i));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("Enter recipient's username"), { target: { value: 'recipientUser' } });
    fireEvent.change(screen.getByPlaceholderText('Enter the subject'), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your message'), { target: { value: 'Test Body' } });
    fireEvent.change(screen.getByLabelText("Recipient's Role"), { target: { value: 'developer' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Send Message/i));

    // Wait for the error alert to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument();
    });
  });
});
