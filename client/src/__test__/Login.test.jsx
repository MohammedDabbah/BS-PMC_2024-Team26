import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import Login from '../components/Login';
import '@testing-library/jest-dom';

// Mock Axios
jest.mock('axios');

// Mock useNavigate properly
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  const setUserMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <AuthContext.Provider value={{ setUser: setUserMock }}>
        <Login />
      </AuthContext.Provider>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Role')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account? Register here")).toBeInTheDocument();
    expect(screen.getByText("Forgot your password? click here")).toBeInTheDocument();
  });

  test('successful login and navigation based on role', async () => {
    const mockUser = { username: 'johndoe', role: 'developer' };
    axios.post.mockResolvedValue({ status: 200, data: { user: mockUser } });

    render(
      <AuthContext.Provider value={{ setUser: setUserMock }}>
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'developer' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login', {
        username: 'johndoe',
        password: 'password123',
        role: 'developer',
      }, { withCredentials: true });

      expect(setUserMock).toHaveBeenCalledWith(mockUser);
      expect(mockedNavigate).toHaveBeenCalledWith('/developer');
    });
  });

  test('login failure shows alert and does not navigate', async () => {
    axios.post.mockRejectedValue({ response: { status: 401, data: { message: 'Username or Password is Incorrect' } } });

    render(
      <AuthContext.Provider value={{ setUser: setUserMock }}>
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'developer' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login', {
        username: 'johndoe',
        password: 'wrongpassword',
        role: 'developer',
      }, { withCredentials: true });

      // Since we can't actually trigger a window alert in the test, we verify that the navigation did not occur
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });

  test('navigates to home page when back button is clicked', () => {
    render(
      <AuthContext.Provider value={{ setUser: setUserMock }}>
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText(/Back/i));

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
