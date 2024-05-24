import React from 'react'
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { dropDownTypes } from '@/types/SelectDropDown'

const SelectDropDown = ({ value, onChangeHandler, menuItems }: dropDownTypes) => {
    return (
        <FormControl variant="standard" sx={{ m: 3, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-standard-label">Investment type</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value}
                onChange={onChangeHandler}
                label="Investment type"
            >
                {menuItems.map((item) => {
                    return (<MenuItem key={item.title} value={item.value}>{item.title}</MenuItem>)
                })}
            </Select>
        </FormControl>
    )
}

export default SelectDropDown