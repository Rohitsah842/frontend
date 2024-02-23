"use client"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import AnchorLink from '@/components/Link';
import InputField from '@/components/inputField/InputField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SVG from '@/components/svg';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormButton from '@/components/FormButton';
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Image from 'next/image';

import facebookIcon from '@/../public/images/facebook.png'
import GoogleIcon from '@/components/GoogleIcon';
import githubIcon from "@/../public/images/github.png"
import { LoginSchema } from '@/schemas/LoginSchema';
import { ReactElement, useState } from 'react';
import { Formik, useFormikContext } from 'formik';


const Login = (): ReactElement => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
                console.log(values)
            }}
            validationSchema={LoginSchema}
        >
            <LoginForm />
        </Formik>
    )
}



const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)

    const { values } = useFormikContext();
    console.log(values)


    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


    return (
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: 'calc(100vh - 65px)' }}>
            <Grid container spacing={4}>
                {isDesktop && <Grid item xs={12} md={8}>
                    <Box component="span">
                        <SVG />
                    </Box>
                </Grid>
                }
                <Grid item xs={12} md={4} sx={{ marginTop: !isDesktop ? '-56px' : '0px' }}>
                    <Card sx={{ height: "maximum-content", boxShadow: "rgba(0, 0, 0, 0.24) -24px 24px 50px -20px", [theme.breakpoints.down('md')]: { textAlign: 'center' } }} >
                        <CardContent>
                            <Stack spacing={3} >
                                <div>
                                    <Typography variant='h4' paragraph={true} >Login</Typography>
                                    <Typography>Don’t have an account? <AnchorLink path="/auth/signup" title='Sign up' color='rgb(250, 84, 28)' /></Typography>
                                </div>

                                <form>
                                    <Stack spacing={3}>
                                        <InputField inputType='email' title='Email address' inputName='email' />

                                        <InputField inputType={!showPassword ? 'password' : 'text'} title='Password' inputName='password'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowPassword(!showPassword)}

                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>} />
                                        <Typography component={'span'} sx={{ textAlign: 'right' }}><AnchorLink path="/auth/forgetpassword" title='Forgot Password?' /></Typography>
                                        <FormButton title='Login' btnType='submit' />
                                    </Stack>
                                </form>
                                <Divider>or continue with </Divider>
                                <Stack spacing={3} direction="row" sx={{ justifyContent: 'center' }}>
                                    <Button variant="outlined"> <GoogleIcon /></Button>
                                    <Button variant="outlined"> <Image src={facebookIcon} alt='icon' /></Button>
                                    <Button variant="outlined"> <Image src={githubIcon} alt='icon' /></Button>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ Container>
    )
}

export default Login