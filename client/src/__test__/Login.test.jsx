import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';
import '@testing-library/jest-dom';
import { AuthProvider } from '../components/AuthContext';

// Mock Axios
jest.mock('axios');

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

// Mock window.alert
window.alert = jest.fn();

describe('Login Component', () => {
    beforeEach(() => {
        axios.post = jest.fn();
    });

    test('renders form and logs in successfully', async () => {
        // Mock successful response
        axios.post.mockResolvedValue({
            data: { user: { username: 'johndoe', role: 'developer' } },
            status: 200
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'developer' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Assert Axios call
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3001/login',
                {
                    username: 'johndoe',
                    password: 'Password1!',
                    role: 'developer',
                },
                { withCredentials: true }
            );
        });

        // Assert successful login behavior
        // Ideally, check for redirection or some state change that indicates a successful login
        // Since redirection is handled by `navigate`, you might want to mock `navigate` for further assertions
    });

    test('displays an error message when login fails', async () => {
        // Mock error response
        axios.post.mockRejectedValue({
            response: { data: { message: 'Login failed' } }
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'developer' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Assert error message
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Login failed');
        });
    });
    test('navigates to Home page when Back button is clicked', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    
        render(
            <MemoryRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>
        );
    
        // Click the Back button
        fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    
        // Assert navigation
        expect(navigate).toHaveBeenCalledWith('/');
      });
});
