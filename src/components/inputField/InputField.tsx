import React from 'react'

import { FormControl, InputLabel, FilledInput } from '@mui/material'
import { FormInput } from '@/types/FormInput'

const InputField = (props: FormInput) => {
    return (
        <FormControl>
            <InputLabel htmlFor={props.id}>{props.title}</InputLabel>
            <FilledInput disableUnderline={true} id={props.id} aria-describedby={props.placeholder} value={props.value} />
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
        </FormControl>
    )
}

export default InputField