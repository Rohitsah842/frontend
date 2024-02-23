'use client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Navbar from '../sections/navbar/Navbar';
import "./globals.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// const theme = createTheme({
//   components: {
//     MuiUseMediaQuery: {
//       defaultProps: {
//         noSsr: true,
//       },
//     },
//   },
// });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={darkTheme.palette.primary.contrastText} />
      </head>
      <body>
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ minHeight: '100vh' }}>
            <CssBaseline />
            <Navbar />
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
