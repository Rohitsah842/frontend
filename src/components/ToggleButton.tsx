import React from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import { modeType } from '@/app/layout'
import { useTheme } from '@mui/material/styles'



const ToggleBtn = (props: toggleBtnPropsType) => {
    const theme = useTheme();
    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={props.value}
            exclusive
            onChange={props.onChangeHandle}
            aria-label="Platform"
            sx={{ width: '100px', color: theme.palette.primary.contrastText }}
        >
            {props.buttonArray.map((item, i) => {
                return (<ToggleButton key={i} value={item.value} sx={item.style}>{item.title} </ToggleButton>)
            })}
        </ToggleButtonGroup>
    )
}

export default ToggleBtn;


export type toggleBtnPropsType = {
    value: string | number
    onChangeHandle: (event: React.MouseEvent<HTMLElement>, mewValue: string | modeType,) => void
    buttonArray: { title: string | JSX.Element, value: string, style?: any }[]
}