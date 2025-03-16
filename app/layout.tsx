import { ThemeProvider } from "@mui/material";
import Head from "next/head";
import React from "react";
import theme from "./lib/theme/theme";
import { Red_Hat_Display } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css'


const redHatDisplay = Red_Hat_Display({
  subsets:['latin'],
  weight:["300", "400", "500"]
})



export default function Rootlayout( {
  children
}:
Readonly<{
  children: React.ReactNode
}>
)
{
  return (
    <html lang="en">
      <Head>
       <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="transparent" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="Mercurial"/>
      </Head>
        <body className={`${redHatDisplay.className} antialiased h-screen`}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        
        </body>


    </html>
  )
}