import { AppProps } from 'next/app';
import ReactQueryProvider from './api/react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

import 'semantic-ui-css/semantic.min.css';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
