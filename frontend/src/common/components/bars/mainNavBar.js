import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

//logo
import logo from '../../../assets/images/logoPortNetWeb.png';

const MainNavBar = ({ navItems, location }) => {
    return (
            <AppBar position="static" sx={{ bgcolor: 'transparent' }}>
                <Toolbar>
                    {/* Logo */}
                    <IconButton edge="start" aria-label="logo" sx={{ p: 0, mb: 1 }}>
                        <img src={logo} alt="Logo" style={{ width: 170 }} />
                    </IconButton>

                    {/* Navigation Links */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                to={item.path}
                                variant={item.label === 'Connexion' ? 'contained' : undefined}
                                sx={{
                                    ml: 2,
                                    color: item.label === 'Connexion' ? 'white' : location.pathname === item.path ? 'primary.main' : 'text.primary',
                                    fontWeight: location.pathname === item.path ? 600 : 500,
                                    bgcolor: item.label === 'Connexion' ? undefined : location.pathname === item.path ? 'grey.bg' : undefined,
                                    textTransform: 'none',
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
    )
}

export default MainNavBar
