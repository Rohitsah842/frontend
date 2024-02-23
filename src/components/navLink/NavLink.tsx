import Link from 'next/link';
import styles from "./NavLink.module.css";

import { PageLink } from "@/types/pageLink";
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';
import Typography from '@mui/material/Typography'

const NavLink = (props: PageLink): ReactElement => {
    const theme = useTheme();

    const pathName: string = usePathname();


    return (
        <Link
            href={props.path}
            style={{ color: `${theme.palette.text.primary}`, textDecoration: "none" }}
            onClick={props.onClickHandler}
            onMouseMove={props.onMouseMoveHandler}
            onMouseLeave={props.onMouseOutHandler}
        >
            <MenuItem >
                <ListItemText className={`${pathName === props.path && styles.active}`}>
                    <Typography variant="body1" sx={{ display: 'flex' }}>
                        {props.title}  {props.icon && props.icon}
                    </Typography>
                </ListItemText>
            </MenuItem>

        </Link>
    );
}

export default NavLink;