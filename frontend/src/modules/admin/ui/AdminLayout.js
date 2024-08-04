import { Box } from '@mui/material'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { theme } from '../../../common/utils/theme';

//components
import SideBar from '../../../common/components/bars/sideBar';
import TopBar from '../../../common/components/bars/topBar';

//icons 
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import { PersonAdd, Settings } from '@mui/icons-material';

const drawerWidth = 240;
const admin ={
    name : "Administrateur",
}

function AdminLayout() {
    const location = useLocation();
    // const excludedPaths = ['/'];

    // const isExcludedPath = excludedPaths.includes(location.pathname);

    const SideBarLinks = [
        {
            name: "Tableau de Bord",
            icon: <HomeOutlinedIcon color='secondary.main' />,
            activeIcon: <HomeIcon color='primary' />,
            path: "/",
        },
        {
            name: "Candidats",
            icon: <PersonOutlineOutlinedIcon color='secondary.main' />,
            activeIcon: <PersonIcon color='primary' />,
            path: "/Candidats",
        },
        {
            name: "Tests",
            icon: <FeaturedPlayListOutlinedIcon color='secondary.main' />,
            activeIcon: <FeaturedPlayListIcon color='primary' />,
            path: "/Tests",
        },
        {
            name: "Questions",
            icon: <ContactSupportOutlinedIcon color='secondary.main' />,
            activeIcon: <ContactSupportIcon color='primary' />,
            path: "/Questions",
        },
        {
            name: "Quiz",
            icon: <QuizOutlinedIcon color='secondary.main' />,
            activeIcon: <QuizIcon color='primary' />,
            path: "/Quiz",
        },
    ];

    const accountItems =[
        {
            name: "Ajouter un autre compte",
            icon: <PersonAdd fontSize="small" />,
            path: "/Ajouter-Admin"
        },
        {
            name: "Paramètres",
            icon: <Settings fontSize="small" />,
            path: "/Paramètres"
        },
    ];

    return (  
        <Box 
        sx={{
            display: 'flex',
            bgcolor: 'blue.light',
        }}>

        <TopBar location={location} drawerWidth={drawerWidth} admin={admin} accountItems={accountItems} />

        <SideBar SideBarLinks={SideBarLinks} location={location} drawerWidth={drawerWidth} />

            <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
            }}>
                <Box 
                    sx={{
                        ...theme.mixins.toolbar,
                    }}>
                </Box>
                <Box 
                    sx={{
                        mx: 1,
                        // borderRadius: 5,
                        // border: isExcludedPath ? 'none' : '1px solid rgba(0, 0, 0, 0.12)',
                        // bgcolor: isExcludedPath ? '' : '#fff',
                        minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px + 15px ) )`,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLayout