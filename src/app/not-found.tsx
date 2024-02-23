'use client'
import React, { ReactElement } from 'react'
import { Container, Stack, Typography, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ErrorImg from "@/../public/images/Error_404.svg"

import Image from 'next/image';
import Link from 'next/link';


;

const PageNotFound = (): ReactElement => {
    const theme = useTheme()
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: 'calc(100vh - 65px)' }}>
            <Paper elevation={0} sx={{
                height: "min-content", width: '40%', textAlign: 'center',
                [theme.breakpoints.down('md')]: { textAlign: 'center', width: "100%" }
            }} >
                <Stack spacing={3} sx={{ alignItems: "center" }}>
                    <Typography variant="h4" >Page Not Found!</Typography>
                    <Typography variant="body1" color={theme.palette.text.secondary}>Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.</Typography>
                    <Image src={ErrorImg} alt="image" width={300} />
                    <Button sx={{
                        backgroundColor: theme.palette.text.primary, ":hover": {
                            backgroundColor: theme.palette.text.secondary
                        }
                    }} >
                        <Link href='/' style={{ color: theme.palette.primary.contrastText, textDecoration: 'none' }}>
                            Go to Home</Link>
                    </Button>
                </Stack>
            </Paper>

        </Container >
    )
}

export default PageNotFound;

