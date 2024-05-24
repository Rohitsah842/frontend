'use client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Navbar from '@/sections/navbar/Navbar';
import Footer from '@/sections/Footer'
import "./globals.css";
import { useCallback, useEffect, useState } from 'react';
import LoginContext from '@/contexts/LoginContext';
import Cookies from "universal-cookie";
import { useAxiosRequestHelper } from '@/hooks/useAxiosHelper';


export type modeType = "light" | "dark"



// export const loginContext = createContext<any>(initialState);



function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let preSelectedTheme;
  try {
    preSelectedTheme = localStorage.getItem('theme') as modeType;
  } catch (error) {
    console.log(error);

  }
  const [displayMode, setDisplayMode] = useState<string>(preSelectedTheme || 'dark');
  const config = { method: 'Post', url: '/auth/refresh-token', withCredentials: true }

  const cookies = new Cookies();
  const [resData, error, errormessage, isLoading, sendRequest] = useAxiosRequestHelper<any>(config, false);

  // useEffect(() => {
  //   setInterval(() => {
  //     const refreshToken = cookies.get('RefreshToken');
  //     console.log(cookies.get('RefreshToken'));
  //     console.log(cookies.get('Authorization'));

  //     sendRequest({ "token": refreshToken });
  //   }, 60000);

  // }, []);



  const darkTheme = createTheme({
    palette: {
      mode: displayMode as modeType | undefined,
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

