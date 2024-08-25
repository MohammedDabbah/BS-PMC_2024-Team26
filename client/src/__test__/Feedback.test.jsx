import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Feedback from '../components/Feedback'; // Adjust the import path
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock Axios
jest.mock('axios');

describe('Feedback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders feedback form and submits successfully', async () => {
    // Mock successful response
    axios.post.mockResolvedValue({ data: { message: 'Feedback sent successfully' } });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Assert form elements are rendered
    expect(screen.getByPlaceholderText('Enter your feedback here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Feedback/i })).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter your feedback here...'), {
      target: { value: 'This is a test feedback.' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit Feedback/i }));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText(/Feedback sent successfully/i)).toBeInTheDocument();
    });

    // Assert that the axios post request was made correctly
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/send-feedback',
      { feedback: 'This is a test feedback.' }
    );
  });

  test('displays an error message when feedback submission fails', async () => {
    // Mock error response
    axios.post.mockRejectedValue({ response: { data: { message: 'Failed to send feedback' } } });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter your feedback here...'), {
      target: { value: 'This is a test feedback.' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit Feedback/i }));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to send feedback/i)).toBeInTheDocument();
    });

    // Assert that the axios post request was made correctly
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/send-feedback',
      { feedback: 'This is a test feedback.' }
    );
  });

//   test('navigates back to login when back button is clicked', () => {
//     const mockNavigate = jest.fn();
//     jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

//     render(
//       <MemoryRouter>
//         <Feedback />
//       </MemoryRouter>
//     );

//     // Click the back button
//     fireEvent.click(screen.getByRole('button', { name: /Back to Login/i }));

//     // Assert that navigate was called with the correct path
//     expect(mockNavigate).toHaveBeenCalledWith('/login');
//   });
});
