import React from 'react';
import styled from 'styled-components';
import { Menu, Button } from 'semantic-ui-react';
import { Router } from 'next/router';


/**
 * Props for the Navbar component.
 */
interface NavbarProps {
  email: string;
  userBalance: number;
  path: string;
  onSignOut: () => void;
  push: (url: string) => void;
}

/**
 * Navbar component for the application.
 * 
 * @param {NavbarProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const Navbar: React.FC<NavbarProps> = ({ email, userBalance, path, onSignOut, push }) => {
  return (
    <NavbarContainer>
      <NavbarItem position="left" onClick={() => push('/')}>
        <LeftItemText>{email}</LeftItemText>
      </NavbarItem>
      <NavbarItem position="left">
        <LeftItemText>Balance {userBalance}</LeftItemText>
      </NavbarItem>
      <NavbarItem position="right">
        {
          path === '/newOperation' ? (
            <StyledButton onClick={() => push('/')} color="black">
              Back to all operations
            </StyledButton>
          ) : (
          <Button onClick={() => push('newOperation')} color="green">
            New operation
          </Button>
          )
        }
        
      </NavbarItem>
      <NavbarItem position="right">
        <StyledButton onClick={onSignOut} color="red" size="tiny">
          Sign Out
        </StyledButton>
      </NavbarItem>
    </NavbarContainer>
  );
};


/**
 * Styled component for the Navbar container.
 */
const NavbarContainer = styled(Menu)`
  &&& {
    width: 100%;
    background-color: #efefef;
    border: none;
    border-radius: 0;
    margin-bottom: 0;
    padding: 0.5rem 1rem;
  }
`;

/**
 * Styled component for a Navbar item.
 */
const NavbarItem = styled(Menu.Item)`
  &&& {
    padding: 0;
    cursor: pointer;
  }
`;

/**
 * Styled component for the left item text in the Navbar.
 */
const LeftItemText = styled.span`
  color: #333;
  font-weight: bold;
  margin-right: 1rem;
`;

/**
 * Styled component for the Button in the Navbar.
 */
const StyledButton = styled(Button)`
  &&&&& {
    font-size: 0.85714286rem;
  }
`;

export default Navbar;
