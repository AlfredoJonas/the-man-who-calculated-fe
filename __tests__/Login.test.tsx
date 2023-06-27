import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login';

// Mock the useRouter hook
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Login Component', () => {
    let queryClient: QueryClient;

    beforeAll(() => {
      queryClient = new QueryClient();
    });

    test('renders login form', () => {
        // Mock the useRouter return value
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Login />
            </QueryClientProvider>
        );

        const usernameInput = screen.getByPlaceholderText('Enter your username');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        //const passwordInput = screen.getByLabelText('Password');
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        //expect(loginButton).toBeInTheDocument();
    });
});
