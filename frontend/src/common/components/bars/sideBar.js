import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'

//logo
import logo from '../../../Assets/images/logoPortNetWeb.png';

//icon
// import LogoutIcon from '@mui/icons-material/Logout';

function SideBar({ SideBarLinks, location, drawerWidth }) {

    const isActive = (path) => {
        const currentPath = decodeURIComponent(location.pathname);
        return currentPath === path || (currentPath.startsWith(path) && path !== '/admin');
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                },
            }}
        >

            {/* Logo Section */}
            <Box
                sx={{
                    width: `calc( ${drawerWidth}px - 1px )`,
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
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

            {/* Navigation Links Section */}
            <List
                sx={{
                    mt: 5,
                    mr: 1,
                    flexGrow: 1,
                }}
            >
                {SideBarLinks.map((link) => (
                    <ListItem
                        key={link.name}
                        component={NavLink}
                        to={link.path}
                        sx={{
                            borderRadius: '0 10px 10px 0',
                            bgcolor: isActive(link.path) ? 'primary.main' : '',
                            '&:hover': {
                                bgcolor: isActive(link.path) ? '' : 'grey.light',
                            }
                        }}
                    >
                        <ListItemIcon>{isActive(link.path) ? link.activeIcon : link.icon}</ListItemIcon>
                        <ListItemText
                            primary={link.name}
                            primaryTypographyProps={{
                                fontWeight: 600,
                                color: isActive(link.path) ? 'white' : 'primary',
                            }}
                        />
                    </ListItem>

                ))}
            </List>

            {/* Quiz Link Section */}
            {/* <Box
                sx={{
                    mb: 2,
                    mr: 1
                }}
            >
                <Divider />
                <ListItem
                    component={NavLink}
                    to='/espace-quiz/token=azer'
                    sx={{
                        borderRadius: '0 10px 10px 0',
                        mt: 2,
                        '&:hover': {
                            bgcolor: 'grey.light',
                        }
                    }}
                >
                    <ListItemIcon><LogoutIcon color='primary' /></ListItemIcon>
                    <ListItemText
                        primary='Vérifier les Quiz'
                        primaryTypographyProps={{
                            fontWeight: 600,
                            color: 'primary',
                        }}
                    />
                </ListItem>
            </Box>   */}
        </Drawer>
    )
}

export default SideBar;
