import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'semantic-ui-react';
import { useUserLogin } from '../hooks/queryHooks';
import withAuthRedirect from '../hooks/auth';

/**
 * The Login page component.
 *
 * @returns {JSX.Element} - The Login component.
 */
const Login: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: doLogin } = useUserLogin();

  /**
   * Event handler for the login form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doLogin({ username, password });
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Form.Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <Form.Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          required
        />
        <LoginButton primary type="submit">
          Login
        </LoginButton>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled(Form)`
  background-color: #efefef;
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const LoginButton = styled(Button)`
  &&& {
    margin-top: 20px;
  }
`;

export default withAuthRedirect(Login);
