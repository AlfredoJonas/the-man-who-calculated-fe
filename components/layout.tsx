import Head from 'next/head'
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
  return (
      <StyledContainer>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="og:title" content={siteTitle} />
        </Head>
        <StyledHeader>
          <Navbar email='alfredojonas94@gmail.com' onSignOut={()=>{}} />
        </StyledHeader>
        <StyledMain>{children}</StyledMain>
      </StyledContainer>
  )
}
