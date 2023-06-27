import Head from 'next/head'
import { useRouter } from 'next/router';
import Navbar from './navbar'
import styled from 'styled-components'

const StyledContainer = styled('div')`
  & {
    margin: auto;
  }
`

const StyledHeader = styled('header')`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const StyledMain = styled('main')`
  &&& {
    background-color: #f9f9f9;
    padding: 1rem;
  }
`

export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const router = useRouter();

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
          <Navbar email="email@admin.com" userBalance={54}/>
        </StyledHeader>
        <StyledMain>{children}</StyledMain>
      </StyledContainer>
  )
}
