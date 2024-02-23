'use client'
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
import { SignupSchema } from '@/schemas/SignupSchema';

import { ReactElement, useState } from 'react';
import { Formik, FormikHelpers, useFormikContext } from 'formik';

const SignUp = (): ReactElement => {
    const intialValue = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const onSubmitHandler = (values: typeof intialValue, action: FormikHelpers<typeof values>) => {

        console.log(values);
        action.setSubmitting(false);
        action.resetForm();
        console.log(values);

    }

    return (
        <Formik
            enableReinitialize
            initialValues={intialValue}
            onSubmit={onSubmitHandler}
            validationSchema={SignupSchema}
            validateOnMount={true}

        >
            <SignUpForm />
        </Formik>
    )
}

const SignUpForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showCnfPassword, setShowCnfPassword] = useState(false)
    const { values, handleSubmit, resetForm } = useFormikContext();


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
                <Grid item xs={12} md={4} >
                    <Card sx={{ height: "maximum-content", boxShadow: "rgba(0, 0, 0, 0.24) -24px 24px 50px -20px", [theme.breakpoints.down('md')]: { textAlign: 'center' } }} >
                        <CardContent>
                            <Stack spacing={3} >
                                <div>
                                    <Typography variant='h4' paragraph={true} >Sign up</Typography>
                                    <Typography>Already have an account? <AnchorLink path="/auth/login" title='Login' color='rgb(250, 84, 28)' /></Typography>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <InputField
                                            inputType='text'
                                            title='Full name'
                                            inputName='fullName' />
                                        <InputField
                                            inputType='email'
                                            title='Email address'
                                            inputName='email' />
                                        <InputField
                                            inputType={!showPassword ? 'password' : 'text'}
                                            title='Password'
                                            inputName='password'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => { setShowPassword(!showPassword); resetForm() }}

                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>} />
                                        <InputField
                                            inputType={!showCnfPassword ? 'password' : 'text'}
                                            title='Confirm password'
                                            inputName='confirmPassword'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowCnfPassword(!showCnfPassword)}

                                                        edge="end"
                                                    >
                                                        {showCnfPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>} />
                                        <FormButton title='Signup' btnType="submit" />
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

export default SignUp;
