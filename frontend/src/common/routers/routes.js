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
import QuizById from "../../modules/admin/ui/quizById";
import Options from "../../modules/admin/ui/options";
import Contact from "../../modules/admin/ui/contact";
import Profile from '../../modules/admin/ui/profile';
import Settings from '../../modules/admin/ui/settings';


//main pages
import Home from "../../modules/main/ui/home";
import ContactUs from "../../modules/main/ui/contact";
import Login from "../../modules/main/ui/login";

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
            
            <Route path="Réclamation" element={<Contact />} />
    
            <Route path="Profil" element={<Profile />} />
            <Route path="Paramètres" element={<Settings />} />
            
            <Route path="*" element={<AdminNotFound />} />
        </Route>
    
        {/* Main routes */}
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} /> 
            <Route path="Contactez-nous" element={<ContactUs />} /> 
            <Route path="Connexion" element={<Login />} />
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
    "/admin/Param%C3%A8tres": "Paramètres",
    
};

export const dynamicPaths = [
    { pattern: /^\/admin\/Quiz\/id=\d+$/, name: "Gestion des Quizzes / Quiz " },
    { pattern: /^\/admin\/Tests\/Modifier\/id=\d+$/, name: "Gestion des Tests / Modifier / Test " },
];