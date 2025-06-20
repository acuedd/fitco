import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import App from './App';
import { store } from './store';
import './index.css';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        defaultColorScheme="dark"
        theme={{
          fontFamily: 'Inter, sans-serif',
          primaryColor: 'blue',
        }}
      >
        <Notifications />
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);