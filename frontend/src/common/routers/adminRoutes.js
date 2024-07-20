import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

//Layouts
import AdminLayout from '../../modules/admin/ui/AdminLayout'; 

//Pages
import Dashboard from '../../modules/admin/ui/dashboard';
import Candidates from '../../modules/admin/ui/candidates';
import Tests from '../../modules/admin/ui/tests';
import Questions from '../../modules/admin/ui/questions';
import Quiz from '../../modules/admin/ui/quiz';
import Profile from '../../modules/admin/ui/profile';
import Settings from '../../modules/admin/ui/settings';
import AddAdmin from '../../modules/admin/ui/addAdmin';
import NotFound from '../errorPages/notFound';

const routes = (
    <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard /> } />
        <Route path="/Candidats" element={<Candidates />} />
        <Route path="/Tests" element={<Tests />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/Profil" element={<Profile />} />
        <Route path="/Paramètres" element={<Settings />} />
        <Route path="/Ajouter-Admin" element={<AddAdmin />} />
        <Route path="*" element={<NotFound />} />
    </Route>
);

export const router = createBrowserRouter(
    createRoutesFromElements(routes)
);

export const locationNames = {
    "/": "Tableau de Bord",
    "/Candidats": "Gestion des Candidats",
    "/Tests": "Gestion des Tests",
    "/Questions": "Gestion des Questions",
    "/Quiz": "Gestion des Quiz",
    "/Profil": "Profil",
    "/Param%C3%A8tres": "Paramètres",
    "/Ajouter-Admin": "Ajouter un nouveau compte",
};