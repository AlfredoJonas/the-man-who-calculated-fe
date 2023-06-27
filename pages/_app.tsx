import { AppProps } from 'next/app'
import ReactQueryProvider from './api/react-query';
import StyledComponentsRegistry from '../lib/registry';
import 'semantic-ui-css/semantic.min.css'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ReactQueryProvider>
      <StyledComponentsRegistry>
        <Component {...pageProps} />
      </StyledComponentsRegistry>
    </ReactQueryProvider>
  );
}
