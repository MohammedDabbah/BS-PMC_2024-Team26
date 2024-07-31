
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import DeveloperPage from '../components/DeveloperPage';

// Mock the axios post function
jest.mock('axios');

describe('DeveloperPage', () => {
  test('handles form submission successfully', async () => {
    const mockResponse = { data: { message: 'Success' } };
    axios.post.mockResolvedValue(mockResponse);

    const { getByText, getByPlaceholderText } = render(<DeveloperPage />);

    fireEvent.change(getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Enter your project'), { target: { value: 'Test Project' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Submission successful')).toBeInTheDocument();
    });
  });

  test('displays an error message when the API request fails', async () => {
    axios.post.mockRejectedValue(new Error('API call failed'));

    const { getByText, getByPlaceholderText } = render(<DeveloperPage />);

    fireEvent.change(getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Enter your project'), { target: { value: 'Test Project' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Submission failed')).toBeInTheDocument();
    });
  });
});
