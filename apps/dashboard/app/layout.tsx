import SimpleRoute from '@/components/SimpleRoute/SimpleRoute';
import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import classes from "./styles.module.css"
import { Notifications } from '@mantine/notifications';
import { GlobalStoreProvider, SocketProvider, theme, WebSocketProvider } from '@repo/shared-logic';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dashboard @ Nexcom',
  description: 'Main Page Manage Your shop Effortlessly'
};

interface PageProps {
  children: ReactNode;
}

export default function RootLayout({ children }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Nexcom</title>
        <meta name="description" content="Web site created..." />
        <ColorSchemeScript />
      </head>
      <body className={classes.bg}>
        <div className={classes.main}>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <GlobalStoreProvider>
              <SocketProvider>
                <WebSocketProvider>
                  <Notifications />
                  <Container size="xl" p="sm" className={classes.container}>
                    <SimpleRoute />
                    {children}
                  </Container>
                </WebSocketProvider>
              </SocketProvider>
            </GlobalStoreProvider>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}
