import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { theme } from '../../../common/utils/theme';
import { useSelector } from 'react-redux';

//components
import SideBar from '../../../common/components/bars/sideBar';
import TopBar from '../../../common/components/bars/topBar';

//icons 
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

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
            activeIcon: <HomeRoundedIcon color='blanc' />,
            path: "/admin",
        },
        {
            name: "Candidats",
            icon: <PersonOutlineOutlinedIcon color='primary' />,
            activeIcon: <PersonRoundedIcon color='blanc' />,
            path: "/admin/Candidats",
        },
        {
            name: "Tests",
            icon: <FeedOutlinedIcon color='primary' />,
            activeIcon: <FeedRoundedIcon color='blanc' />,
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
            activeIcon: <QuizRoundedIcon color='blanc' />,
            path: "/admin/Quiz",
        },
        {
            name: "Options",
            icon: <TuneRoundedIcon color='primary' />,
            activeIcon: <TuneRoundedIcon color='blanc' />,
            path: "/admin/Options",
        },
        {
            name: "Réclamation",
            icon: <QuestionAnswerOutlinedIcon color='primary' />,
            activeIcon: <QuestionAnswerRoundedIcon color='blanc' />,
            path: "/admin/Réclamation",
        },
    ];

    const accountItems = [
        ...(admin.id === 1 ? [{
            name: "Gestion des Administrateurs",
            icon: <AdminPanelSettingsIcon />,
            path: "/admin/gestion-administrateurs"
        }] : [])
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                bgcolor: 'blue.light',
            }}>
            {isAuthenticated &&
                <>

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
                </>}
        </Box>
    )
}

export default AdminLayout