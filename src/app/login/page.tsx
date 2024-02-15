"use client"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import AnchorLink from '@/components/Link';
import { usePathname } from 'next/navigation';
import InputField from '@/components/inputField/InputField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SVG from '@/components/svg';
// import {bgImage} from '../../../public/images/illustration_login.svg'

const Login = () => {

    const pathName: string = usePathname();
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box component="span">
                        {/* <Image src='https://zone-ui.vercel.app/assets/illustrations/illustration_login.svg' width={514} height={470} alt='logo'></Image> */}
                        <SVG />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: "500px", boxShadow: "rgba(0, 0, 0, 0.24) -24px 24px 50px -20px" }} >
                        <CardContent>
                            <Stack spacing={3} >
                                <div>
                                    <Typography variant='h4' paragraph={true} >Login</Typography>

                                    {pathName === "/login" ?
                                        <Typography>Don’t have an account? <AnchorLink path="/sign-up" title='Sign Up' color='rgb(250, 84, 28)' /></Typography>
                                        : <Typography>Already have an account? <AnchorLink path="/login" title='Login' color='rgb(250, 84, 28)' /></Typography>
                                    }
                                </div>
                                <form >
                                    <Stack spacing={2}>
                                        <InputField id='email' inputType='email' placeholder='Enter Email...' value='' title='Email address' />

                                    </Stack>
                                </form>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ Container>
    )
}

export default Login