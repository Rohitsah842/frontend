"use client"
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { calculatorsLinks, navLinks, profileLinks } from "@/Assets/constants/pageLinks"
import { SIDE_NAV_WIDTH } from "@/Assets/constants";
import NavLink from "@/components/navLink/NavLink";
import SearchNavBar from "@/components/searchNavBar/SearchNavBar";
import Link from 'next/link';
import { useEffect } from 'react';
import Cookies from "universal-cookie";
import { loginContext } from '@/contexts/LoginContext';


const Navbar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [openDropdown, setOpenDropdown] = React.useState<null | HTMLElement>(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = React.useState<boolean>(false);
    const { state, dispatch } = React.useContext(loginContext);

    const cookies = new Cookies();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (cookies.get("Authorization")) {
            dispatch({ type: 'LOGIN', payload: true });
        }
    }, [])

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenDropDown = (event: React.MouseEvent<HTMLElement>) => {
        setOpenDropdown(event.currentTarget);
    };
    const handlerLogout = () => {
        cookies.remove("Authorization");
        dispatch({ type: "LOGOUT", payload: false });
    }


    const handleCloseDropDown = () => {
        setOpenDropdown(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);

    };


    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.contrastText }}>
                <Container maxWidth="xl" sx={{ padding: { xs: '0' } }}>
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: 'space-between' }}>
                        <Toolbar >
                            {isMobile && <MenuIcon onClick={() => setIsSideMenuOpen(true)} sx={{ cursor: 'pointer', fontSize: "2rem", paddingRight: '5px', color: theme.palette.text.primary }} />}
                            <Typography
                                variant="h5"
                                noWrap
                                sx={{
                                    width: 'min-content',
                                    display: { xs: 'flex', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: theme.palette.text.primary,
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <Link href="/" style={{ color: `${theme.palette.text.primary}`, textDecoration: "none" }}>
                                    LOGO
                                </Link>

                            </Typography>

                            {!isMobile && <Box sx={{ flexGrow: 1, display: 'flex' }}>

                                {navLinks.map((link) => {
                                    if (link.title !== 'Calculators') {
                                        return <NavLink key={link.title} path={link.path} title={link.title} />
                                    } else {
                                        return (
                                            <>
                                                <IconButton key={link.title} onClick={handleOpenDropDown} sx={{ p: "5px 15px", fontSize: "1rem", borderRadius: 'initial', color: theme.palette.text.primary }}>
                                                    Calculators<ArrowDropDownIcon />
                                                </IconButton>
                                                <Menu
                                                    sx={{ mt: '45px' }}
                                                    id="dropDown-bar"
                                                    anchorEl={openDropdown}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    transitionDuration="auto"
                                                    open={Boolean(openDropdown)}
                                                    onClose={handleCloseDropDown}
                                                >
                                                    {calculatorsLinks.map((profLink) => (
                                                        <MenuItem key={profLink.title} onClick={() => handleCloseDropDown()} href=''>
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
                                                </Menu>
                                            </>)
                                    }
                                })}
                            </Box>}
                        </Toolbar>

                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                            <SearchNavBar dispatchFn={dispatch} />
                            {!state.isLogin ? <NavLink path="/auth/login" title="Login" /> : <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: "0px 10px" }}>
                                        <Avatar alt="Remy Sharp" src="" />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transitionDuration="auto"
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    {profileLinks.map((profLink) => (
                                        <MenuItem key={profLink.title} onClick={() => handleCloseUserMenu()}>
                                            <Typography
                                                textAlign="center"
                                                component="a"
                                                href={profLink.path}
                                                sx={{
                                                    color: 'inherit',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                {profLink.title}</Typography>
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={() => handleCloseUserMenu()}>
                                        <Button variant='text' sx={{ color: 'inherit' }} onClick={handlerLogout}>
                                            Logout</Button>
                                    </MenuItem>
                                </Menu>
                            </>}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {isMobile &&
                <Box  >
                    <SwipeableDrawer
                        anchor="left"
                        open={isSideMenuOpen}
                        onClose={() => setIsSideMenuOpen(false)}
                        onOpen={() => setIsSideMenuOpen(true)}
                        sx={{ width: SIDE_NAV_WIDTH, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDE_NAV_WIDTH } }}
                    >
                        <Paper elevation={0} sx={{ alignItems: "flex-start", padding: '25px', height: '100%' }}>
                            {navLinks.map((link) => {
                                if (link.title !== 'Calculators') {
                                    return <NavLink key={link.title} path={link.path} title={link.title} onClickHandler={() => setIsSideMenuOpen(false)} />
                                } else {
                                    return (
                                        <>
                                            <IconButton onClick={handleOpenDropDown} sx={{ p: "5px 15px", fontSize: "1rem", borderRadius: 'initial', color: theme.palette.text.primary }}>
                                                Calculators<ArrowDropDownIcon />
                                            </IconButton>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="dropDown-bar"
                                                anchorEl={openDropdown}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transitionDuration="auto"
                                                open={Boolean(openDropdown)}
                                                onClose={handleCloseDropDown}
                                            >

                                                {calculatorsLinks.map((profLink) => (
                                                    <MenuItem key={profLink.title} onClick={() => handleCloseDropDown()}>
                                                        <Typography
                                                            textAlign="center"
                                                            component="a"
                                                            href={profLink.path}
                                                            sx={{
                                                                color: 'inherit',
                                                                textDecoration: 'none',
                                                            }}
                                                        >
                                                            {profLink.title}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </>)
                                }
                            })}
                        </Paper>
                    </SwipeableDrawer>

                </Box>

            }
        </>
    );

}

export default Navbar;