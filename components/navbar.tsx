import React from 'react';
import styled from 'styled-components';
import { Menu, Button } from 'semantic-ui-react';


/**
 * Props for the Navbar component.
 */
interface NavbarProps {
  email: string;
  userBalance: number;
  onSignOut: () => void;
}

/**
 * Navbar component for the application.
 * 
 * @param {NavbarProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const Navbar: React.FC<NavbarProps> = ({ email, userBalance, onSignOut }) => {
  return (
    <NavbarContainer>
      <NavbarItem position="left">
        <LeftItemText>{email}</LeftItemText>
      </NavbarItem>
      <NavbarItem position="left">
        <LeftItemText>Balance {userBalance}</LeftItemText>
      </NavbarItem>
      <NavbarItem position="right">
        <Button onClick={() => {}} color="green">
          New operation
        </Button>
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
