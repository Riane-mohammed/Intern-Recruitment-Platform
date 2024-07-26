import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import logo from '../../../Assets/images/logoPortNetWeb.png'

function SideBar ({SideBarLinks, location, drawerWidth}) {

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
                mt: '20px'
            }}
        >
            {SideBarLinks.map((link)=>(
                <ListItem 
                key={link.name}
                component={NavLink}
                to={link.path}
                sx={{
                        borderRadius: '20px 0 0 20px',
                        '&.active': {
                            bgcolor: 'grey.light',
                        }
                    }}
                className={location.pathname === link.path ? 'active' : ''}>
                    <ListItemIcon>{location.pathname === link.path ? link.activeIcon : link.icon }</ListItemIcon>
                    <ListItemText 
                        primary={link.name}
                        primaryTypographyProps={{
                            fontWeight: 600,
                            color: `${location.pathname === link.path ? 'primary' : 'grey'}`,
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
