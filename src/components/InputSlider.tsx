import React from 'react'
import { Box, Slider, InputAdornment, FilledInput, FormControl, Typography } from '@mui/material'
import { InputSliderprops } from '@/types/InputSliderProps';

const InputSlider = ({ isStartAdornment, ...props }: InputSliderprops) => {

    return (
        <Box sx={{ width: '100%', p: '0 30px' }}>
            <FormControl sx={{ m: 1, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }} variant="filled">
                <Typography variant="body1" >{props.title}</Typography>
                <FilledInput
                    id="filled-adornment-amount"
                    name={props.name}
                    startAdornment={(isStartAdornment) && <InputAdornment position="start">{props.endormentIcon}</InputAdornment>}
                    endAdornment={(!isStartAdornment) && <InputAdornment position="start">{props.endormentIcon}</InputAdornment>}
                    sx={{ width: { xs: '50%', md: '45%' }, height: '45px', fontSize: '1.5rem', border: 'none' }}
                    value={props.value}
                    onChange={props.onChangeHandle}
                />
            </FormControl>
            <Slider
                name={props.name}
                defaultValue={props.value}
                aria-label="Default"
                valueLabelDisplay="auto"
                value={props.value}
                onChange={props.onChangeSliderHandler}
                step={props.stepSize}
                min={props.min}
                max={props.max}
                sx={{ color: 'inherit' }}
            />
        </Box>
    )
}

export default InputSlider;