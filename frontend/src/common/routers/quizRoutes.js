import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

//Layout
import QuizLayout from "../../modules/quiz/ui/quizLayout";


//pages


const routes = (
    <Route path="/TakeQuiz" element={<QuizLayout />} >

    </Route>
);

export const quizRouter = createBrowserRouter(
    createRoutesFromElements(routes)
);

