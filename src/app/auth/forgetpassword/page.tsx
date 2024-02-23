"use client"
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import InputField from '@/components/inputField/InputField';
import { Formik } from 'formik';
import loginIcon from "@/../public/images/ic_lock_password.svg"
import Image from "next/image"
import FormButton from '@/components/FormButton';
import AnchorLink from '@/components/Link';


const ForgetPassword = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: 'calc(100vh - 65px)' }}>
            <Card sx={{ height: "min-content", width: '34%', textAlign: 'center', boxShadow: "rgba(0, 0, 0, 0.24) -24px 24px 50px -20px", [theme.breakpoints.down('md')]: { textAlign: 'center', width: '100%' } }} >
                <CardContent>
                    <Image src={loginIcon} alt="icon" />
                    <Stack spacing={5}>

                        <Typography variant="h5" color={theme.palette.text.primary}>Forget Your Password?</Typography>
                        <Typography variant="body1" color={theme.palette.text.secondary}>Please enter the email address associated with your account and We will email you a link to reset your password.</Typography>

                        <Formik initialValues={{ email: '' }}
                            onSubmit={() => {
                                console.log('hello');

                            }}>
                            <form>
                                <Stack spacing={3}>
                                    <InputField inputType='email' title='Email address' inputName='email' />
                                    <FormButton title='Reset Password' btnType='submit' />
                                </Stack>
                            </form>
                        </Formik>
                        <Typography component={'span'} ><AnchorLink path="/auth/login" title='> Return to login ' /></Typography>
                    </Stack>
                </CardContent>
            </Card>

        </Container>
    )
}

export default ForgetPassword