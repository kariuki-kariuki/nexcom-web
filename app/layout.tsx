import NewConversationProvider from '@/lib/context/newConversation';
import ScreenProvider from '@/lib/context/screenContext';
import { theme } from '@/theme';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import React from 'react';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';
import ActiveConversationProvider from '@/lib/context/activeConversation';
import AppProvider from '@/lib/context/appContext';
import { ChatProvider } from '@/lib/context/ConversationContext';
import { Notifications } from '@mantine/notifications';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Nexcom</title>
        <meta name="description" content="Web site created..." />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppProvider>
            <ActiveConversationProvider>
              <ChatProvider>
                <ScreenProvider>
                  <NewConversationProvider>
                    <Notifications />
                    <div id="root">{children}</div>
                  </NewConversationProvider>
                </ScreenProvider>
              </ChatProvider>
            </ActiveConversationProvider>
          </AppProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
