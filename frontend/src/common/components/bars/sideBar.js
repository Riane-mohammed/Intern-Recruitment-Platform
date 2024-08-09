import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/images/logoPortNetWeb.png';

function SideBar({ SideBarLinks, location, drawerWidth }) {
    
    const isActiveLink = (path, currentPath) => {
        if (path === '/') {
            return currentPath === path;
        }
        return currentPath.startsWith(path);
    };

    return (
        <Drawer 
        variant='permanent'
        anchor='left'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                borderRadius: '0px 20px 20px 0px',
                boxSizing: 'border-box',
            },
        }}
    >

        <Box 
            sx={{
                width: `calc( ${drawerWidth}px - 1px )`,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <img 
                src={logo} 
                style={{
                    maxWidth: '80%',
                }}
                alt='logo Portnet' 
            />
        </Box>
        <List
            sx={{
                    mt: 5,
                    mr: 1,
            }}
        >
            {SideBarLinks.map((link)=>(
                <ListItem 
                key={link.name}
                component={NavLink}
                to={link.path}
                sx={{
                    borderRadius: '0 10px 10px 0',
                        '&.active': {
                            bgcolor: 'primary.main',
                        }
                    }}
                className={location.pathname === link.path ? 'active' : ''}>
                    <ListItemIcon>{isActiveLink(link.path, location.pathname) ? link.activeIcon : link.icon }</ListItemIcon>
                    <ListItemText 
                        primary={link.name}
                        primaryTypographyProps={{
                            fontWeight: 600,
                            color: isActiveLink(link.path, location.pathname) ? 'white.main' : 'primary',
                        }}
                        />
                </ListItem>
            ))
            }
        </List>
    </Drawer>
    )
}

export default SideBar
