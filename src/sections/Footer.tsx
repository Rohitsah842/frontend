import React, { useState } from 'react'
import moment from 'moment'

import { Box, Divider } from '@mui/material'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Link from '@/components/Link'
import { Email, Facebook, GitHub, Home, Instagram, LinkedIn, Mail, Phone, Telegram, Twitter, Brightness4 } from '@mui/icons-material'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { modeType } from '@/app/layout'
import ToggleBtn from '@/components/ToggleButton'

type propsType = {
    modeValue: modeType,
    setModeValue: (value: modeType) => void
}

const Footer = (props: propsType) => {

    const handlerChange = (event: React.MouseEvent<HTMLElement>, newValue: modeType,) => {
        console.log(event, newValue);

        props.setModeValue(newValue);
    }

    const ToggleMode = [
        { title: <Brightness4 />, value: "dark", style: { marginBotton: '5px', border: '1px solid' } },
        { title: <LightModeOutlinedIcon />, value: "light", style: { marginBotton: '5px', border: '1px solid' } }
    ]


    return (
        <Box sx={{ margin: '10px 0px', height: 'maxContent', bottom: '0', boxShadow: "rgba(0, 0, 0, 0.24) -24px 24px 50px -20px", width: '100%' }}>
            <Paper elevation={4} sx={{ width: '100%', height: '100%', textAlign: 'center' }}>
                <Box sx={{ padding: '1.5rem 5rem', textAlign: 'center', display: { sm: 'content', xm: 'content', md: 'flex', lg: 'flex' }, justifyContent: 'space-between' }} >
                    <Typography variant="body1" color='text.primary'>Get connected with us on social networks:</Typography>
                    <Stack direction="row" spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link path='/' title={<Facebook />} />
                        <Link path='/' title={<Instagram />} />
                        <Link path='/' title={<Email />} />
                        <Link path='/' title={<LinkedIn />} />
                        <Link path='/' title={<Twitter />} />
                        <Link path='/' title={<GitHub />} />
                    </Stack>
                </Box>

                <Grid container spacing={2} sx={{ padding: '20px' }}>
                    <Grid xs={12} sm={6} md={4} lg={2.4}>
                        <Typography variant="h5" color='text.primary'>Logo</Typography>
                        <Typography variant="body1" color='text.secondary'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis debitis aperiam voluptas eveniet at!</Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={4} lg={2.4} >
                        <Typography variant="h6" color='text.primary'>Pages</Typography>
                        <Stack direction="column" m={2} spacing={2} alignItems='center'>
                            <Link path='/' title='Home' />
                            <Link path='/about' title="about" />
                        </Stack>
                    </Grid>

                    <Grid xs={6} sm={6} md={4} lg={2.4}>
                        <Typography variant="h6" color='text.primary'>Calculators</Typography>
                        <Stack direction="column" m={2} spacing={2} alignItems='center'>
                            <Link path='/calculators/mutual-fund' title="Mutual Fund" />
                            {/* <Link path='/calculators/fixed-deposit' title="Fixed Deposit" /> */}
                            <Link path='/calculators/loanEMI' title='Loan EMI' />
                            {/* <Link path='/calculators/swp' title='SWP' /> */}
                            <Link path='/calculators/sip' title='SIP' />
                            <Link path='/calculators' title="More calculators" />
                        </Stack>
                    </Grid>
                    <Grid xs={6} sm={6} md={4} lg={2.4}>
                        <Typography variant="h6" color='text.primary'>Appearance</Typography>
                        <Stack direction="column" m={2} spacing={2} alignItems='center'>
                            <ToggleBtn value={props.modeValue} onChangeHandle={handlerChange} buttonArray={ToggleMode} />
                        </Stack>
                    </Grid>
                    <Grid xs={6} sm={6} md={4} lg={2.4} alignItems='center'>
                        <Typography variant="h6" color='text.primary'>Contact us</Typography>
                        <Stack direction="column" m={1} spacing={2}>
                            <Typography variant="body1" color='text.secondary' sx={{ display: 'flex' }}><Home style={{ marginRight: '10px' }} /><span> Hyderabad, TS 500032 India </span>  </Typography>
                            <Typography variant="body1" color='text.secondary' sx={{ display: 'flex' }}><Mail style={{ marginRight: '10px' }} /><span> info@gmail.com </span>  </Typography>
                            <Typography variant="body1" color='text.secondary' sx={{ display: 'flex' }}><Phone style={{ marginRight: '10px' }} /><span> 755654564 </span>  </Typography>
                            <Typography variant="body1" color='text.secondary' sx={{ display: 'flex' }}><Telegram style={{ marginRight: '10px' }} /><span> https://web. telegram.org/ </span>  </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider />
                <Paper elevation={2} sx={{ padding: '1rem 4rem', textAlign: 'center' }} >
                    <Typography variant="body1" color='text.primary'>©{moment().format('YYYY')} Copyright</Typography>
                </Paper>
            </Paper>
        </Box>
    )
}

export default Footer