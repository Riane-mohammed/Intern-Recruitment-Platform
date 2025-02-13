import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

//Layouts
import AdminLayout from '../../modules/admin/ui/AdminLayout'; 
import MainLayout from "../../modules/main/ui/mainLayout";
import QuizLayout from "../../modules/quiz/ui/quizLayout";

//admin Pages
import Dashboard from '../../modules/admin/ui/dashboard';
import Candidates from '../../modules/admin/ui/candidates';
import Tests from '../../modules/admin/ui/tests';
import AddTest from "../../modules/admin/ui/addTest";
import ModifyTest from "../../modules/admin/ui/modifyTest";
import Questions from '../../modules/admin/ui/questions';
import Quiz from '../../modules/admin/ui/quiz';
import AddQuiz from "../../modules/admin/ui/addQuiz";
import Claims from "../../modules/admin/ui/claims";
import QuizById from "../../modules/admin/ui/quizById";
import Options from "../../modules/admin/ui/options";
import Profile from '../../modules/admin/ui/profile';
import AddAdmin from "../../modules/admin/ui/addAdmin";
import Admins from "../../modules/admin/ui/admins";

//main pages
import Home from "../../modules/main/ui/home";
import ClaimsForm from "../../modules/main/ui/claims";
import Login from "../../modules/main/ui/login";
import RecoverPassword from "../../modules/main/ui/recoverPassword";

//quiz Pages
import QuizHome from "../../modules/quiz/ui/home";
import QuizTests from "../../modules/quiz/ui/tests";

//errors
import AdminNotFound from "../errorPages/adminNotFound";
import NotFound from "../errorPages/notFound";
import QuizErrorPage from "../errorPages/quizError";

const routes = (
    <>
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Candidats" element={<Candidates />} />

            <Route path="Tests" element={<Tests />} />
            <Route path="Tests/Ajouter" element={<AddTest />} />
            <Route path="Tests/Modifier/id=:id" element={<ModifyTest />} />

            <Route path="Questions" element={<Questions />} />
            
            <Route path="Quiz" element={<Quiz />} />
            <Route path="Quiz/Ajouter" element={<AddQuiz />} />
            <Route path="Quiz/id=:id" element={<QuizById />} />

            <Route path="Options" element={<Options />} />
            
            <Route path="Réclamation" element={<Claims />} />
    
            <Route path="Profil" element={<Profile />} />
            <Route path="gestion-administrateurs" element={<Admins />} />
            <Route path="gestion-administrateurs/ajouter" element={<AddAdmin />} />
            
            <Route path="*" element={<AdminNotFound />} />
        </Route>
    
        {/* Main routes */}
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} /> 
            <Route path="Centre-réclamation" element={<ClaimsForm />} /> 
            <Route path="Connexion" element={<Login />} />
            <Route path="Connexion/token=:token" element={<Login />} />
            <Route path="Réinitialiser-Mot-Passe/token=:token" element={<RecoverPassword />} />
            <Route path="*" element={<NotFound />} /> 
        </Route>

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
    "/admin": "Tableau de Bord",
    "/admin/Candidats": "Gestion des Candidats",
    "/admin/Tests": "Gestion des Tests",
    "/admin/Tests/Ajouter": "Gestion des Tests / Ajouter",
    "/admin/Questions": "Gestion des Questions",
    "/admin/Quiz": "Gestion des Quiz",
    "/admin/Quiz/Ajouter": "Gestion des Quiz / Ajouter",
    "/admin/Profil": "Profil",
    "/admin/Options": "Options",
    "/admin/R%C3%A9clamation": "Réclamation",
    "/admin/gestion-administrateurs": "Gestion des Administrateurs",
    "/admin/gestion-administrateurs/Ajouter": "Gestion des Administrateurs / Ajouter",
};

export const dynamicPaths = [
    { pattern: /^\/admin\/Quiz\/id=\d+$/, name: "Gestion des Quizzes / Quiz " },
    { pattern: /^\/admin\/Tests\/Modifier\/id=\d+$/, name: "Gestion des Tests / Modifier / Test " },
];