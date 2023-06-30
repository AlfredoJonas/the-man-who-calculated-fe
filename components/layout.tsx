import React from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import styled from 'styled-components';
import { useUserInfo, useUserLogout } from '../hooks/queryHooks';

/**
 * Props for the Layout component.
 */
interface LayoutProps {
  children: React.ReactNode;
}

// Site title
const siteTitle = 'True North Home Task Challenge';

/**
 * Layout component for the application.
 * 
 * @param {LayoutProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const { data: { data = {} } = {} } = useUserInfo();
  const { mutate: logout } = useUserLogout();
  const { username, user_balance: userBalance } = data;

  const router = useRouter();

  // Check if user is logged in and redirect to login page if not
  if (typeof localStorage !== 'undefined') {
    const loggedIn = localStorage.getItem('logged_in');
    if (loggedIn === '0') {
      router.push('/login');
    }
  }

  return (
    <StyledContainer>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <StyledHeader>
        <Navbar email={username} userBalance={userBalance} path={router.asPath} push={(url) => router.push(url)} onSignOut={logout} />
      </StyledHeader>
      <StyledMain>{children}</StyledMain>
    </StyledContainer>
  );
};

// Styled components
const StyledContainer = styled.div`
  margin: auto;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMain = styled.main`
  &&& {
    background-color: #f9f9f9;
    padding: 1rem;
  }
`;

export default Layout;
