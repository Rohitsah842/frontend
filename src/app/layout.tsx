'use client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Navbar from '../sections/navbar/Navbar';
import "./globals.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
