import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
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
import { useSelector } from 'react-redux';

//image
// import bg from '../../../assets/images/bg.svg';

const drawerWidth = 240;

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const admin = useSelector(state => state.user.user);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Connexion');
        }
    }, [isAuthenticated, navigate]);


    const SideBarLinks = [
        {
            name: "Tableau de Bord",
            icon: <HomeOutlinedIcon color='primary' />,
            activeIcon: <HomeIcon color='blanc' />,
            path: "/admin",
        },
        {
            name: "Candidats",
            icon: <PersonOutlineOutlinedIcon color='primary' />,
            activeIcon: <PersonIcon color='blanc' />,
            path: "/admin/Candidats",
        },
        {
            name: "Tests",
            icon: <FeaturedPlayListOutlinedIcon color='primary' />,
            activeIcon: <FeaturedPlayListIcon color='blanc' />,
            path: "/admin/Tests",
        },
        {
            name: "Questions",
            icon: <ContactSupportOutlinedIcon color='primary' />,
            activeIcon: <ContactSupportIcon color='blanc' />,
            path: "/admin/Questions",
        },
        {
            name: "Quiz",
            icon: <QuizOutlinedIcon color='primary' />,
            activeIcon: <QuizIcon color='blanc' />,
            path: "/admin/Quiz",
        },
    ];

    const accountItems = [
        {
            name: "Ajouter un autre compte",
            icon: <PersonAdd fontSize="small" />,
            path: "/admin/Ajouter-Admin"
        },
        {
            name: "Paramètres",
            icon: <Settings fontSize="small" />,
            path: "/admin/Paramètres"
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                bgcolor: 'blue.light',
                // backgroundImage: `url(${bg})`, 
                // backgroundSize: 'cover',
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