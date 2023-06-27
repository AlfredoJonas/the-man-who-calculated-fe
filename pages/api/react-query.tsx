// pages/api/react-query.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: false,
      },
    },
  });

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
