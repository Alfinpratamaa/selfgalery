'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/context/Provider";
const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
import { Toaster } from 'sonner'

import { metadata } from "./Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{String(metadata.title)}</title>
        </head>
        <body className={cn('bg-background font-sans antialiased', inter.variable)}>
          {children}
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
