import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStateProvider from './hooks/globalState';
import { UserStoreProvider } from './hooks/userStore';
import './index.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3e4,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      retry: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root')!);
const tostOptions = {
  style: {
    background: '#00000080',
    color: '#fff',
  },
};
root.render(
  <React.StrictMode>
    <CssBaseline></CssBaseline>
    <QueryClientProvider client={queryClient}>
      <UserStoreProvider>
        <GlobalStateProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster gutter={32} toastOptions={tostOptions}></Toaster>
        </GlobalStateProvider>
      </UserStoreProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
