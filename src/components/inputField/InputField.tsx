import React, { ReactElement } from 'react'

import { FormControl, TextField, FormHelperText } from '@mui/material'
import { FormInput } from '@/types/FormInput'
import { useFormikContext } from 'formik'
import { get } from 'lodash'

const InputField = (props: FormInput): ReactElement => {
    const { values, setFieldValue, handleChange, handleBlur, touched, errors, ...remainingprops } = useFormikContext<{ email: string, passowrd: string }>()
    // console.log(remainingprops, values)
    return (
        <FormControl>
            {/* <InputLabel
                variant='filled'
                htmlFor={props.title}
            >
                {props.title}
            </InputLabel> */}
            <TextField
                required
                error={get(errors, `${props.inputName}`) && get(touched, `${props.inputName}`)}
                label={props.title}
                type={props.inputType ? props.inputType : 'text'}
                id={props.title}
                aria-describedby={props.placeholder ? props.placeholder : ''}
                value={get(values, `${props.inputName}`, '')}
                onChange={handleChange}
                name={props.inputName}
                onBlur={handleBlur}
                autoComplete='off'
                variant='filled'
                InputProps={{
                    endAdornment: props.endAdornment,
                }}
            />
            {get(errors, `${props.inputName}`) && get(touched, `${props.inputName}`) ? <FormHelperText id={props.title} sx={{ color: "#f44336", marginLeft: '0px' }}>{get(errors, `${props.inputName}`)}</FormHelperText> : ""}
        </FormControl>
    )
}

export default InputField