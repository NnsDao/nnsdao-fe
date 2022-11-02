import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStateProvider from './hooks/globalState';
import './index.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5e3,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      retry: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline></CssBaseline>
      <QueryClientProvider client={queryClient}>
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
