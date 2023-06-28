import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Login from '../pages/login';
import { api } from '../utils/api';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const response = {
    developer_message: 'Login successful',
    lifetime: 12591293,
    data: {"username": 'testuser', "balance": 5}
}
// Mock the API requests
const mock = new MockAdapter(api);
mock.onPost('/login').reply(200, response);
// Use the existing axios instance configuration for the mock
mock.onAny().passThrough();

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
    const loginButton = screen.getByText('Login');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('redirects to home page if already logged in', () => {
    // Mock the useRouter return value
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue('1'), // Simulate logged in state
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test.only('submits login form', async () => {
    // Mock the useRouter return value
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Mock the doLogin mutation
    const mockDoLogin = jest.fn();
    jest.mock('../hooks/queryHooks', () => ({
      useUserLogin: () => ({
        mutate: mockDoLogin,
      }),
    }));
  
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
  
    // Simulate form input
    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  
    // Submit the form
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    await waitFor(() => {
        expect(mockDoLogin).toHaveBeenCalled();
    });
  });
});
