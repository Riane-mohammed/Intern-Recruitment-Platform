import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

//Layouts
import AdminLayout from '../../modules/admin/ui/AdminLayout'; 
import QuizLayout from "../../modules/quiz/ui/quizLayout";

//login page
import LoginForm from "../../modules/admin/ui/LoginForm";

//admin Pages
import Dashboard from '../../modules/admin/ui/dashboard';
import Candidates from '../../modules/admin/ui/candidates';
import Tests from '../../modules/admin/ui/tests';
import AddTest from "../../modules/admin/ui/addTest";
import ModifyTest from "../../modules/admin/ui/modifyTest";
import Questions from '../../modules/admin/ui/questions';
import Quiz from '../../modules/admin/ui/quiz';
import AddQuiz from "../../modules/admin/ui/addQuiz";
import QuizById from "../../modules/admin/ui/quizById";
import Profile from '../../modules/admin/ui/profile';
import Settings from '../../modules/admin/ui/settings';
import AddAdmin from '../../modules/admin/ui/addAdmin';

//quiz Pages
import QuizHome from "../../modules/quiz/ui/home";
import QuizTests from "../../modules/quiz/ui/tests";

//errors
import AdminNotFound from "../errorPages/adminNotFound";
import NotFound from "../errorPages/notFound";
import QuizErrorPage from "../errorPages/quizError";

const user = 1;

const routes = (
    <>
        {user ? (
            //Admin Routes 
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard /> } />
                <Route path="Candidats" element={<Candidates />} />

                <Route path="Tests" element={<Tests />} />
                <Route path="Tests/Ajouter" element={<AddTest/>} />
                <Route path="Tests/Modifier/id=:id" element={<ModifyTest/>} />

                <Route path="Questions" element={<Questions />} />
                
                <Route path="Quiz" element={<Quiz />} />
                <Route path="Quiz/Ajouter" element={<AddQuiz />} />
                <Route path="Quiz/id=:id" element={<QuizById />} />

                <Route path="Profil" element={<Profile />} />
                <Route path="Paramètres" element={<Settings />} />
                <Route path="Ajouter-Admin" element={<AddAdmin />} />
                <Route path="*" element={<AdminNotFound />} />
            </Route>
        ) : (
            <Route path="/" element={<LoginForm /> } />
        )}

        {/* Quiz Routes */}
        <Route path="/Espace-quiz/token=:token" element={<QuizLayout />} >
            <Route index element={<QuizHome />} />
            <Route path="quiz-en-cours" element={<QuizTests />} />
            <Route path="*" element={<QuizErrorPage name="Page introuvable" code="404" description="L'adresse demandée n'a pas été trouvée dans le système." instructions="Vérifiez l'URL saisie et essayez d'actualiser la page. Le problème peut être temporaire."/>} />
        </Route>

        {/* Not Found Page - GLOBAL */}
        <Route path="*" element={<NotFound />} />
    </>
);

export const router = createBrowserRouter(
    createRoutesFromElements(routes)
);

export const locationNames = {
    "/": "Tableau de Bord",
    "/Candidats": "Gestion des Candidats",
    "/Tests": "Gestion des Tests",
    "/Tests/Ajouter": "Gestion des Tests / Ajouter",
    "/Questions": "Gestion des Questions",
    "/Quiz": "Gestion des Quiz",
    "/Quiz/Ajouter": "Gestion des Quiz / Ajouter",
    "/Profil": "Profil",
    "/Param%C3%A8tres": "Paramètres",
    "/Ajouter-Admin": "Ajouter un nouveau compte",
};

export const dynamicPaths = [
    { pattern: /^\/Quiz\/id=\d+$/, name: "Gestion des Quizzes / Quiz " },
    { pattern: /^\/Tests\/Modifier\/id=\d+$/, name: "Gestion des Tests / Modifier / Test " },
];