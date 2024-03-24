'use client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Navbar from '../sections/navbar/Navbar';
import "./globals.css";
import Footer from '@/sections/Footer';
import { useState } from 'react';

export type modeType = "light" | "dark"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [displayMode, setDisplayMode] = useState<modeType>('dark');

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    },
  });

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={darkTheme.palette.primary.contrastText} />
      </head>

      <body>
        <ThemeProvider theme={darkTheme}>
          <Navbar />
          <Box sx={{ minHeight: '43vh' }}>
            <CssBaseline />
            {children}
          </Box>
          <Footer modeValue={displayMode} setModeValue={setDisplayMode} />
        </ThemeProvider>
      </body>
    </html>
  );
}
