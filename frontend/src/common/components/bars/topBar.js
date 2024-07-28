import { AppBar, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useState } from "react";
import { Logout } from '@mui/icons-material';
import { locationNames } from '../../routers/routes';

//icons
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { NavLink } from 'react-router-dom';

function TopBar({drawerWidth, admin, location, accountItems}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
        elevation={0}
        sx={{
            bgcolor: 'blue.light',
            width: `calc( 100% - ${drawerWidth}px )`,
        }}
        >
            <Toolbar
                sx={{
                    color: 'primary.main',
                }}
            >
                <Typography
                    fontFamily='Times new roman' 
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    {admin.name} / {locationNames[location.pathname]}
                </Typography>
                <IconButton
                    onClick={handleClick}
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <AccountCircleRoundedIcon
                        sx={{ fontSize : 30}}
                        />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem
                            component={NavLink}
                            to="/Profil"
                            onClick={handleClose}>
                        <Avatar /> Profil
                    </MenuItem>
                    <Divider />
                    {accountItems.map((item) => (
                        <MenuItem 
                            key={item.name}
                            component={NavLink}
                            to={item.path}
                            onClick={handleClose}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            {item.name}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Déconnexion
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar
