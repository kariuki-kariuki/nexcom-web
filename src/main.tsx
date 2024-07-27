import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import AppProvider from './context/appContext.tsx';
import ScreenProvider from './context/screenContext.tsx';
import ConversationProvider from './context/activeConversation.tsx';
import App from './App.tsx';
import { theme } from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <AppProvider>
        <ScreenProvider>
          <ConversationProvider>
            <App />
          </ConversationProvider>
        </ScreenProvider>
      </AppProvider>
    </MantineProvider>
  </React.StrictMode>,
);
