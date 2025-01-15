import ConversationProvider from '@/lib/context/activeConversation';
import AppProvider from '@/lib/context/appContext';
import NewConversationProvider from '@/lib/context/newConversation';
import ScreenProvider from '@/lib/context/screenContext';
import { theme } from '@/src/theme';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import React from 'react';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppProvider>
            <ScreenProvider>
              <ConversationProvider>
                <NewConversationProvider>
                  <div id="root">{children}</div>
                </NewConversationProvider>
              </ConversationProvider>
            </ScreenProvider>
          </AppProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
