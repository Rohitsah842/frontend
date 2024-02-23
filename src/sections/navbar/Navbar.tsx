"use client"
import { ReactElement } from "react";
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { calculatorsLinks, navLinks, profileLinks } from "@/Assets/constants/pageLinks"
import { SIDE_NAV_WIDTH } from "@/Assets/constants";
import NavLink from "@/components/navLink/NavLink";
import SearchNavBar from "@/components/searchNavBar/SearchNavBar";
import { noSSR } from "next/dynamic";
import { boolean } from "yup";

const Navbar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = React.useState<boolean>(false);
    const [isLogin, setIsLogin] = React.useState<boolean>(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);

    };
    console.log(Boolean(anchorElUser));


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
                                LOGO
                            </Typography>
                            {!isMobile && <Box sx={{ flexGrow: 1, display: 'flex' }}>
                                {navLinks.map((link) => {
                                    if (link.title !== 'Calculators') {
                                        return <NavLink key={link.title} path={link.path} title={link.title} />
                                    } else {
                                        return (
                                            <>
                                                <NavLink key={link.title} path={link.path} title={link.title} icon={<ArrowDropDownIcon />} onMouseMoveHandler={() => setOpenDropdown(true)} onMouseOutHandler={() => console.log("hello")} />

                                                <Menu
                                                    sx={{ mt: '20px', position: 'absolute', zIndex: '999' }}
                                                    id="menu-appbar"
                                                    anchorEl={anchorElUser}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}


                                                    open={openDropdown}
                                                    onClose={handleCloseUserMenu}
                                                >

                                                    {calculatorsLinks.map((profLink) => (
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
                                                </Menu>
                                            </>)
                                    }
                                })}
                            </Box>}
                        </Toolbar>

                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                            <SearchNavBar />
                            {!isLogin ? <NavLink path="/auth/login" title="Login" /> : <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: "0px 10px" }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    // anchorOrigin={{
                                    //     vertical: 'top',
                                    //     horizontal: 'right',
                                    // }}
                                    // keepMounted
                                    // transformOrigin={{
                                    //     vertical: 'button',
                                    //     horizontal: 'right',
                                    // }}
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
                                </Menu>
                            </>}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {isMobile &&
                <Box>
                    <SwipeableDrawer
                        anchor="left"
                        open={isSideMenuOpen}
                        onClose={() => setIsSideMenuOpen(false)}
                        onOpen={() => setIsSideMenuOpen(true)}
                        sx={{ width: SIDE_NAV_WIDTH, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDE_NAV_WIDTH }, }}
                    >
                        {navLinks.map((link) => (

                            <NavLink key={link.title} path={link.path} title={link.title} onClickHandler={() => setIsSideMenuOpen(false)} />
                        ))}
                    </SwipeableDrawer>
                </Box>

            }
        </>
    );

}

export default Navbar;