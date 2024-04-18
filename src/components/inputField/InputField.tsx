import React, { ReactElement } from 'react'

import { FormControl, TextField, FormHelperText } from '@mui/material'
import { FormInput } from '@/types/FormInput'
import { useFormikContext } from 'formik'
import { get } from 'lodash'

const InputField = ({ inputName, inputType, title, placeholder, endAdornment, isRequired = true }: FormInput): ReactElement => {
    const { values, handleChange, handleBlur, touched, errors } = useFormikContext<{ email: string, passowrd: string }>()

    return (
        <FormControl>
            <TextField
                required={isRequired}
                error={get(errors, `${inputName}`) && get(touched, `${inputName}`)}
                label={title}
                type={inputType ? inputType : 'text'}
                id={title}
                aria-describedby={placeholder ? placeholder : ''}
                value={get(values, `${inputName}`, '')}
                onChange={handleChange}
                name={inputName}
                onBlur={handleBlur}
                autoComplete='off'
                variant='filled'
                InputProps={{
                    endAdornment: endAdornment,
                }}
            />
            {get(errors, `${inputName}`) && get(touched, `${inputName}`) ? <FormHelperText id={title} sx={{ color: "#f44336", marginLeft: '0px' }}>{get(errors, `${inputName}`)}</FormHelperText> : ""}
        </FormControl>
    )
}

export default InputField