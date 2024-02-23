import { passwordRegex } from '@/Assets/constants'
import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
    password: yup
    .string().
    min(5).
    matches(passwordRegex, {message : "Please enter the strong password like Abc@123"})
    .required("This field is required")

})