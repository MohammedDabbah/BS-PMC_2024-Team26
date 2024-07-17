import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Register from '../components/Register';
import '@testing-library/jest-dom';

// Mock Axios
jest.mock('axios');

describe('Register Component', () => {
  test('renders form and submits successfully', async () => {
    // Mock successful response
    axios.post.mockResolvedValue({ data: { message: 'Registration successful' } });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('name@example.com'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByLabelText('Developer'),{target:{value: 'developer'}});

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Assert Axios call
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/Register',
        {
          fname: 'John',
          lname: 'Doe',
          username: 'johndoe',
          mail: 'john.doe@example.com',
          password: 'Password1!',
          role: 'developer',
        },
        { withCredentials: true }
      );
    });

    // Assert success behavior
    await waitFor(() => {
      expect(screen.queryByText(/Registration successful/)).toBeInTheDocument();
    });
  });

  test('displays an error message when registration fails', async () => {
    // Mock error response
    axios.post.mockRejectedValue({ response: { data: { message: 'Registration failed' } } });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('name@example.com'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByLabelText('Developer'),{target:{value: 'developer'}});

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Assert error message
    await waitFor(() => {
      expect(screen.getByText(/Registration failed/)).toBeInTheDocument();
    });
  });
});