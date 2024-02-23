import { passwordRegex } from '@/Assets/constants'
import * as yup from 'yup'

export const SignupSchema = yup.object().shape({
    fullName:yup
    .string()
    .required("This field is required"),

    email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),

    password: yup
    .string().
    min(5).
    matches(passwordRegex, {message : "Please enter the strong password like Abc@123"})
    .required("This field is required"),
    
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Password must be match")
    .required("This field is required")

})