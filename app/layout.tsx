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
import AppProvider from '@/lib/context/appContext';
import { Notifications } from '@mantine/notifications';
import { SocketProvider } from '@/lib/context/SocketContext';

export default async function RootLayout({
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
          <SocketProvider>
            <AppProvider>
                {/* <ScreenProvider> */}
                <Notifications />
                <div id="root">{children}</div>
                {/* </ScreenProvider> */}
            </AppProvider>
          </SocketProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
