import React from 'react';
import styled from 'styled-components';
import { Menu, Button } from 'semantic-ui-react';

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

const NavbarItem = styled(Menu.Item)`
  &&& {
    padding: 0;
  }
`;

const LeftItemText = styled.span`
  color: #333;
  font-weight: bold;
  margin-right: 1rem;
`;

const StyledButton = styled(Button)`
  &&&&& {
    font-size: .85714286rem;
  }
`

interface NavbarProps {
    email: string;
    userBalance: number;
    onSignOut: () => void;
}

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
        <Button onClick={()=>{}} color="green">
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

export default Navbar;