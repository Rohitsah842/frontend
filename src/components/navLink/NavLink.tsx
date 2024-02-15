import Link from 'next/link';
import styles from "./NavLink.module.css";

import { PageLink } from "@/types/pageLink";
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

const NavLink = (props: PageLink): ReactElement => {
    const theme = useTheme();

    const pathName: string = usePathname();


    return (
        <Link
            href={props.path}
            style={{ color: `${theme.palette.text.secondary}`, textDecoration: "none"}}
        >
            <MenuItem >
                <ListItemText className={`${pathName === props.path && styles.active}`}>
                    {props.title}
                </ListItemText>
            </MenuItem> 
            
        </Link>
    );
}

export default NavLink;