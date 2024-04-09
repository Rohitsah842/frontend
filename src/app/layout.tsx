'use client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Navbar from '@/sections/navbar/Navbar';
import Footer from '@/sections/Footer'
import "./globals.css";
import { useState } from 'react';
import LoginContext from '@/contexts/LoginContext';


export type modeType = "light" | "dark"



// export const loginContext = createContext<any>(initialState);



function RootLayout({
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
        <LoginContext>
          <ThemeProvider theme={darkTheme}>
            <Navbar />
            <Box sx={{ minHeight: '43vh' }}>
              <CssBaseline />
              {children}
            </Box>
            <Footer modeValue={displayMode} setModeValue={setDisplayMode} />
          </ThemeProvider>
        </LoginContext>
      </body>
    </html>
  );
}

export default RootLayout;
