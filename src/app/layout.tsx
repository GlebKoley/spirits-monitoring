import type { Viewport, Metadata } from 'next';

import React from 'react';

import Providers from './providers/providers';

import '../styles/global.scss';

export const metadata: Metadata = {
   manifest: '/manifest.json',
   title: 'Spirit Monitoring',
   description: 'Spirit Monitoring',
   icons: {
      apple: '/apple-touch-icon.png',
      icon: [
         { url: '/favicon.ico' },
         { sizes: '32x32', type: 'image/png', url: '/favicon-32x32.png' },
         { sizes: '16x16', type: 'image/png', url: '/favicon-16x16.png' },
      ],
   },
};

export const viewport: Viewport = {
   initialScale: 1,
   themeColor: '#0c0c0d',
   width: 'device-width',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
