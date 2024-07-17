import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';
import '@testing-library/jest-dom';
import { AuthProvider } from '../components/AuthContext';

// Mock Axios
jest.mock('axios');

// Mock window.alert
window.alert = jest.fn();

describe('Login Component', () => {
    beforeEach(() => {
        axios.get = jest.fn().mockResolvedValue({ data: { user: { username: 'johndoe', role: 'developer' } } });
    });

    test('renders form and logs in successfully', async () => {
        // Mock successful response
        axios.post = jest.fn().mockResolvedValue({ data: { user: { username: 'johndoe', role: 'developer' } } });

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

        // Assert success behavior (this would ideally involve checking for redirection or some state change)
        // Check for any UI changes or state updates that indicate a successful login
    });

    test('displays an error message when login fails', async () => {
        // Mock error response
        axios.post = jest.fn().mockRejectedValue({ response: { data: { message: 'Login failed' } } });

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
            expect(window.alert).toHaveBeenCalledWith('Username or Password is Incorrect');
        });
    });
});
