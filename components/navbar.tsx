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

const EmailText = styled.span`
  color: #333;
  font-weight: bold;
  margin-right: 1rem;
`;

interface NavbarProps {
    email: string;
    onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ email, onSignOut }) => {
  return (
    <NavbarContainer>
      <NavbarItem position="left">
        <EmailText>{email}</EmailText>
      </NavbarItem>
      <NavbarItem position="right">
        <Button onClick={onSignOut} color="red">
          Sign Out
        </Button>
      </NavbarItem>
    </NavbarContainer>
  );
};

export default Navbar;