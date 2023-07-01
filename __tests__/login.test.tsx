import { render, fireEvent, waitFor, getByPlaceholderText } from '@testing-library/react';
import { paginatedApiUserLoginProps } from '../types';
import Login from '../pages/login';

const mockDoLogin = jest.fn();

// Mock the useUserLogin hook
jest.mock('../hooks/queryHooks', () => ({
  useUserLogin: () => ({
    mutate: mockDoLogin,
  }),
}));

// Mock the localStorage.getItem method
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockClear = jest.fn();
const mockLength = 0;
const mockKey = jest.fn();


Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
    length: mockLength,
    key: mockKey,
  },
  writable: true,
});

// Mock the router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Login', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test that the login form is displayed
  test('test_login_form_displayed', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByText('Login');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // Test that form submission triggers doLogin function
  test('test_form_submission_triggers_doLogin', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const usernameInput = getByPlaceholderText('Enter your username');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockDoLogin).toHaveBeenCalledTimes(1));
    expect(mockDoLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
    } as paginatedApiUserLoginProps);
  });

  // Test that the form redirects to the home page if the user is already logged in
  test('test_redirect_to_home_if_logged_in', () => {
    mockGetItem.mockReturnValue('1'); // User is already logged in

    render(<Login />);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});