import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

//Layout
import QuizLayout from "../../modules/quiz/ui/quizLayout";

//pages
import QuizHome from "../../modules/quiz/ui/quizHome";

//errors
import QuizNotFound from "../errorPages/quizNotFound";
import NotFound from "../errorPages/notFound";


const routes = (
    <>
        <Route path="/TakeQuiz/:token" element={<QuizLayout />} >
            <Route index element={<QuizHome />} />
            <Route path="*" element={<QuizNotFound />} />
        </Route>
        <Route path='*' element={<NotFound />} />
    </>
);

export const quizRouter = createBrowserRouter(
    createRoutesFromElements(routes)
);

