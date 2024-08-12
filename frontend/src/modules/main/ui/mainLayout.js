import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import MainNavBar from "../../../common/components/bars/mainNavBar";

function MainLayout() {
    const navItems = [
        { label: 'Accueil', path: '/' },
        { label: 'Postuler', path: '/Postuler' },
        { label: 'Contact', path: '/Contactez-nous' },
        { label: 'Connexion', path: '/Connexion' },
    ];

    const location = useLocation();

    return (
        <Box>
            <MainNavBar navItems={navItems}  location={location}/>
            <Box>
                <Outlet />
            </Box>
        </Box>
    );
}

export default MainLayout;
