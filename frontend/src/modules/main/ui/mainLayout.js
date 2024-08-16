import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { theme } from '../../../common/utils/theme';

//components
import MainNavBar from "../../../common/components/bars/mainNavBar";

function MainLayout() {
    const navItems = [
        { label: 'Accueil', path: '/' },
        { label: 'Contact', path: '/Contactez-nous' },
        { label: 'Connexion', path: '/Connexion' },
    ];

    const location = useLocation();

    return (
        <Box>
            <MainNavBar navItems={navItems}  location={location}/>
            <Box
                sx={{
                    mx: 1,
                    minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px + 15px ) )`,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default MainLayout;
