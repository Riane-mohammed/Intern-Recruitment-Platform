import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/images/logoPortNetWeb.png'

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
                    mt: '20px',
                    ml: '10px'
            }}
        >
            {SideBarLinks.map((link)=>(
                <ListItem 
                    key={link.name}
                    component={NavLink}
                    to={link.path}
                    sx={{
                        borderRadius: '12px 0 0 12px',
                        maxWidth: drawerWidth,
                            '&.active': {
                                bgcolor: 'blue.light',
                                borderRight: '3px solid',
                                borderColor: 'primary.main'
                            }
                        }}
                    className={location.pathname === link.path ? 'active' : ''}
                >
                    <ListItemIcon>{location.pathname === link.path ? link.activeIcon : link.icon }</ListItemIcon>
                    <ListItemText 
                        primary={link.name}
                        primaryTypographyProps={{
                            fontFamily: 'Poppins',
                            fontWeight: '600',
                            color: `${location.pathname === link.path ? 'primary' : '#999999'}`,
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
