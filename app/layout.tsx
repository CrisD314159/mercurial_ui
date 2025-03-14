import Head from "next/head";
import React from "react";





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
      <body
      >
        {children}
      
      </body>


    </html>
  )
}