"use client"
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Container, Stack, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import InputField from '@/components/inputField/InputField';
import { Formik, FormikHelpers, useFormikContext } from 'formik';
import loginIcon from "@/../public/images/ic_lock_password.svg"
import Image from "next/image"
import FormButton from '@/components/FormButton';
import AnchorLink from '@/components/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useAxiosRequestHelper } from '@/hooks/useAxiosHelper';


const ForgetPassword = () => {
    const initialValue = { email: '', mobileNo: '', newPassword: "", confirmPassword: "" };
    const [isUserVerified, setIsUserVerified] = useState<boolean>(false);
    const [URL, setURL] = useState<string>('http://localhost:8082/verify-user');
    let config = { method: 'POST', url: URL }

    const [responseData, error, errormessage, isLoading, sendRequest] = useAxiosRequestHelper<any>(config, false, '/auth/login');

    if (responseData.status === 202 && !isUserVerified) {
        setIsUserVerified(true)
        setURL('http://localhost:8082/forget-password')
    }


    const onSubmitHandler = (values: typeof initialValue, action: FormikHelpers<typeof values>) => {
        console.log(values, config);
        sendRequest(values);


    }

    return (
        <Formik
            initialValues={initialValue}
            // validationSchema={LoginSchema}
            onSubmit={onSubmitHandler}
        >
            <ForgetPasswordForm error={error} ErrorMessage={errormessage} response={responseData} />
        </Formik>
    )
}

const ForgetPasswordForm: React.FC<{ error: boolean, ErrorMessage: string, response: any }> = ({ error, ErrorMessage, response }) => {

    const [isUserVerified, setIsUserVerified] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showCnfPassword, setShowCnfPassword] = useState(false)
    // console.log(response);


    if (response.status === 202 && !isUserVerified) {
        console.log(response);
        setIsUserVerified(true)
    }

    const theme = useTheme();
    const { handleSubmit } = useFormikContext();

    return (
        <Container sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: 'calc(100vh - 65px)', margin: '20px 0px' }}>
            <Card sx={{ height: "min-content", width: '34%', textAlign: 'center', boxShadow: "rgba(0, 0, 0, 0.24) -24px 24px 50px -20px", [theme.breakpoints.down('md')]: { textAlign: 'center', width: '100%' } }} >
                <CardContent>
                    {error && <Typography variant='body1' paragraph={true} sx={{ backgroundColor: "#e05248e6", textAlign: 'center' }} >{ErrorMessage}</Typography>}
                    <Image src={loginIcon} alt="icon" />
                    <Stack spacing={5}>

                        <Typography variant="h5" color={theme.palette.text.primary}>Forget Your Password?</Typography>
                        <Typography variant="body1" color={theme.palette.text.secondary}>Please enter the email address associated with your account and We will email you a link to reset your password.</Typography>
                        <form onSubmit={handleSubmit}>
                            {!isUserVerified && <Stack spacing={3}>
                                <InputField inputType='email' title='Email address' inputName='email' />
                                <Divider>OR</Divider>
                                <InputField inputType='text' title='Mobile No' inputName='mobileNo' isRequired={false} />
                                <FormButton title='Reset Password' btnType='submit' />
                            </Stack>}
                            {isUserVerified && <Stack spacing={3}>
                                <InputField
                                    inputType={!showPassword ? 'password' : 'text'}
                                    title='New password'
                                    inputName='newPassword'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => { setShowPassword(!showPassword); }}

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
                                <FormButton title='Reset Password' btnType='submit' />
                            </Stack>}
                        </form>
                        <Typography component={'span'} ><AnchorLink path="/auth/login" title='> Return to login ' /></Typography>
                    </Stack>
                </CardContent>
            </Card>

        </Container >
    )
}

export default ForgetPassword