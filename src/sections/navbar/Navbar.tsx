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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { navLinks, profileLinks } from "@/Assets/constants/pageLinks"
import { SIDE_NAV_WIDTH } from "@/Assets/constants";
import NavLink from "@/components/navLink/NavLink";
import SearchNavBar from "@/components/searchNavBar/SearchNavBar";

const Navbar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = React.useState<boolean>(false);
    const [isLogin, setIsLogin] = React.useState<boolean>(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (pathLink: string) => {
        setAnchorElUser(null);
        console.log(pathLink);
        
    };

    return (
        <>
            <AppBar position="sticky" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {isMobile && <MenuIcon onClick={() => setIsSideMenuOpen(true)} sx={{ cursor: 'pointer', fontSize: "2rem", paddingRight: '5px' }} />}
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                width: '100px',
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        {!isMobile && <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            {navLinks.map((link) => (
                                <NavLink key={link.title} path={link.path} title={link.title} />
                            ))}
                        </Box>}

                        <Box sx={{ display: "flex",  marginLeft: 'auto', alignItems: 'center' }}>
                            <SearchNavBar /> 
                            {!isLogin ?<NavLink  path="/login" title="Login" />: <>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                
                                    {profileLinks.map((profLink) => (
                                        <MenuItem key={profLink.title} onClick={() => handleCloseUserMenu(profLink.path)}>
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
                                    // <NavLink key={profLink.title} path={profLink.path} title={profLink.title}/>
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

                            <NavLink key={link.title} path={link.path} title={link.title} />
                        ))}
                    </SwipeableDrawer>
                </Box>

            }
        </>
    );

}

export default Navbar;