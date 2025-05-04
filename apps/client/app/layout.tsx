import NewConversationProvider from '@/lib/context/newConversation';
import ScreenProvider from '@/lib/context/screenContext';
import { theme } from '@/theme';
import { ColorSchemeScript, Flex, MantineProvider } from '@mantine/core';
import React from 'react';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';
import { Notifications } from '@mantine/notifications';
import { SocketProvider } from '@/lib/hooks/useSocket';
import { siteMetadata } from '@/lib/data/siteMetadata';
import { Metadata } from 'next';
import { WebSocketProvider } from '@/lib/hooks/useWebsockets';
import { GlobalStoreProvider } from '@/lib/context/global-store.provider';
import classes from './styles.module.css';
import { LayoutRouter } from 'next/dist/server/app-render/entry-base';
import SimpleNav from '@/components/SimpleNav/SimpleNav';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        alt: 'Social Banner for Nexcom LTD',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};
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
        {/* {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>} */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Nexcom</title>
        <meta name="description" content="Web site created..." />
        <ColorSchemeScript />
      </head>
      <body className={classes.bg}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <GlobalStoreProvider>
            <SocketProvider>
              <WebSocketProvider>
                <ScreenProvider>
                  <NewConversationProvider>
                    <Notifications />
                    <div id="root">{children}</div>
                  </NewConversationProvider>
                </ScreenProvider>
              </WebSocketProvider>
            </SocketProvider>
          </GlobalStoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
