
import { Typography, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import * as React from 'react'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import {
    usePopupState,
    bindHover,
    bindMenu,
} from 'material-ui-popup-state/hooks'
import { PageLink } from '@/types/pageLink';



const PopOver = (props: any) => {

    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    })
    const isDropDownOpen = { ...bindMenu(popupState) }.open;


    return (
        <>
            <IconButton
                href={props.path}
                sx={{ p: "5px 15px", fontSize: "1rem", borderRadius: 'initial' }}
                {...bindHover(popupState)}>
                Calculators
                {!isDropDownOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </IconButton>

            <HoverMenu
                {...bindMenu(popupState)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                {props.calculatorsLinks.map((profLink: PageLink) => (
                    <MenuItem key={profLink.title} onClick={popupState.close} href={profLink.path}>
                        <Typography
                            textAlign="center"
                            component="a"
                            href={profLink.path}
                            sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                                width: '100%'
                            }}
                        >
                            {profLink.title}</Typography>
                    </MenuItem>
                ))}
            </HoverMenu>
        </>
    );
}

export default PopOver;