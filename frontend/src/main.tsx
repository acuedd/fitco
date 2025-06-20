import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Global } from '@mantine/styles';
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
        <Global
          styles={{
            'html, body, #root': {
              height: '100%',
              width: '100%',
              margin: 0,
              padding: 0,
              overflowX: 'hidden',
            },
            '.mantine-AppShell-main': {
              width: '100% !important',
            },
            '.mantine-Modal-inner': {
              paddingLeft: '0px',
              left: '0px',
            },
          }}
        />
        <Notifications />
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);