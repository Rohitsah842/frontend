import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { RadioFieldPropsType } from '@/types/RadioFieldPropsType';
import FlexWrapper from './FlexWrapper';

const RadioField = (props: RadioFieldPropsType) => {
    return (
        <FormControl>
            <FlexWrapper>
                <FormLabel id="demo-controlled-radio-buttons-group">{props.formLabel}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={props.value}
                    onChange={props.onchangeHandle}
                >
                    {props.fieldArray.map((element) =>
                        <FormControlLabel
                            key={element.label}
                            value={element.value}
                            name={element.name}
                            control={<Radio />}
                            label={element.label} />)}
                </RadioGroup>
            </FlexWrapper>
        </FormControl>
    )
}

export default RadioField