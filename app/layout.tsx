import React from "react";
import { Red_Hat_Display } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css'
import { ThemeContextProvider } from "../lib/theme/ThemeContextProvidex";
import { Metadata } from "next";


const redHatDisplay = Red_Hat_Display({
  subsets:['latin'],
  weight:["300", "400", "500"]
})

export const metadata: Metadata = {
  appleWebApp:true

}


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
      <head>
       <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
       <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="Mercurial"/>
      </head>
        <body className={`${redHatDisplay.className} antialiased h-screen`}>
          <AppRouterCacheProvider>
            <ThemeContextProvider>
                {children}
            </ThemeContextProvider>
          </AppRouterCacheProvider>
        
        </body>


    </html>
  )
}