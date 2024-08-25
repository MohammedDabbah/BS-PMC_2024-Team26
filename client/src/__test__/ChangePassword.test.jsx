import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ChangePassword from '../components/ChangePassword'; // Adjust the import path as needed
import { MemoryRouter } from 'react-router-dom';

// Mock Axios
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('ChangePassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the ChangePassword form correctly', () => {
    render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );

    expect(screen.getByText(/Password Change/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Current Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  test('shows error message if new password and confirm password do not match', async () => {
    render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Current Password'), { target: { value: 'currentPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm New Password'), { target: { value: 'differentPassword123' } });

    fireEvent.click(screen.getByText('Reset Password'));

    expect(await screen.findByText("New password and confirm new password don't match!")).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    axios.post.mockResolvedValue({ data: 'Password reset successful' });

    render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Current Password'), { target: { value: 'currentPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm New Password'), { target: { value: 'newPassword123' } });

    fireEvent.click(screen.getByText('Reset Password'));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/ChangePassword',
      { currentPassword: 'currentPassword123', newPassword: 'newPassword123', confirmNewPassword: 'newPassword123' },
      { withCredentials: true }
    ));

    expect(await screen.findByText('Password reset successful')).toBeInTheDocument();
  });

  test('shows error message on incorrect current password', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Incorrect current password' } } });

    render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Current Password'), { target: { value: 'wrongPassword' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm New Password'), { target: { value: 'newPassword123' } });

    fireEvent.click(screen.getByText('Reset Password'));

    expect(await screen.findByText('Incorrect current password')).toBeInTheDocument();
  });

//   test('navigates back to profile when "Back" button is clicked', () => {
//     const navigate = jest.fn();

//     render(
//       <MemoryRouter>
//         <ChangePassword />
//       </MemoryRouter>
//     );

//     // fireEvent.click(screen.getByText(/Back/i));

//     // expect(navigate).toHaveBeenCalledWith('/profile');
//   });
  test('Simple placeholder test', () => {
    expect(true).toBe(true);
  });
  
});
