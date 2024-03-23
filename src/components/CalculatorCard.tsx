'use client'
import React from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material'
import Link from 'next/link'
import { PageLink } from '@/types/pageLink'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Image from 'next/image'




const CalculatorCard = ({ title, path, bodyText, imgSrc }: PageLink) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));
    return (
        <Grid item sm={6} xs={12} md={4} lg={3}>
            <Item >
                <Link href={path} style={{ textDecoration: 'none' }}>
                    <Card sx={{ height: 200 }} >
                        <CardContent >
                            <Typography variant='h6' color="text.primary">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {bodyText}
                            </Typography>
                            <Image src={imgSrc} alt='dflt' height={100} width={280} style={{ opacity: "0.4" }} />
                        </CardContent>
                    </Card>
                </Link>
            </Item>
        </Grid>
    )
}

export default CalculatorCard