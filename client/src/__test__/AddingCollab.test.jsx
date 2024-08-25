import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import AddingCollab from '../components/AddingCollab';
import '@testing-library/jest-dom';

// Mock Axios
jest.mock('axios');

describe('AddingCollab Component', () => {
  const refreshCollaborationsMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders and toggles the form', () => {
    render(<AddingCollab refreshCollaborations={refreshCollaborationsMock} />);

    // Initial state: button to open the form
    expect(screen.getByText(/Add collaboration/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Add collaboration/i));

    // After clicking, form should be visible and close button should appear
    expect(screen.getByText(/Collab's Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Close/i)).toBeInTheDocument();

    // Clicking the close button should hide the form
    fireEvent.click(screen.getByText(/Close/i));
    expect(screen.queryByText(/Collab's Username/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Add collaboration/i)).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Collaboration added successfully!' } });

    render(<AddingCollab refreshCollaborations={refreshCollaborationsMock} />);

    fireEvent.click(screen.getByText(/Add collaboration/i));

    fireEvent.change(screen.getByPlaceholderText(/Enter collab's username/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByLabelText(/Collab's Role/i), {
      target: { value: 'developer' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Add Collab/i }));
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/adding-collab',
        {
          collabUsername: 'johndoe',
          collabRole: 'developer',
        },
        { withCredentials: true }
      );

      expect(screen.getByText(/Collaboration added successfully!/i)).toBeInTheDocument();
    });

    // Ensure refreshCollaborations is called
    expect(refreshCollaborationsMock).toHaveBeenCalled();
  });

  test('handles form submission failure', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Failed to add collaboration' } },
    });

    render(<AddingCollab refreshCollaborations={refreshCollaborationsMock} />);

    fireEvent.click(screen.getByText(/Add collaboration/i));

    fireEvent.change(screen.getByPlaceholderText(/Enter collab's username/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByLabelText(/Collab's Role/i), {
      target: { value: 'developer' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Add Collab/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to add collaboration/i)).toBeInTheDocument();
    });
  });
});
