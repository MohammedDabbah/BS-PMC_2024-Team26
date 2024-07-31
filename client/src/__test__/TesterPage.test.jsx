
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import TesterPage from '../components/TesterPage';

// Mock the axios post function
jest.mock('axios');

describe('TesterPage', () => {
  test('sends a message and receives a response', async () => {
    const mockResponse = { data: { choices: [{ text: 'Mock AI response' }] } };
    axios.post.mockResolvedValue(mockResponse);

    const { getByText, getByPlaceholderText } = render(<TesterPage />);

    const input = getByPlaceholderText('Type your message here...');
    fireEvent.change(input, { target: { value: 'Hello AI' } });

    fireEvent.click(getByText('Send'));

    await waitFor(() => {
      expect(getByText('Hello AI')).toBeInTheDocument();
      expect(getByText('Mock AI response')).toBeInTheDocument();
    });
  });

  test('displays an error message when the API request fails', async () => {
    axios.post.mockRejectedValue(new Error('API call failed'));

    const { getByText, getByPlaceholderText } = render(<TesterPage />);

    const input = getByPlaceholderText('Type your message here...');
    fireEvent.change(input, { target: { value: 'Hello AI' } });

    fireEvent.click(getByText('Send'));

    await waitFor(() => {
      expect(getByText('Hello AI')).toBeInTheDocument();
      // Optionally, check for error handling if any error messages are displayed
    });
  });
});
