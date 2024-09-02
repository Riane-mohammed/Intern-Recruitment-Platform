import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

//actions
import { setCandidateEmail, setDisqualified, setPreviousPath, setQuiz, setValid } from '../actions/candidateActions';

//logo
import logo from '../../../Assets/images/logoPortNetWeb.png';

//componenets
import Loding from '../../../common/components/loding';
import FinishedPage from '../../../common/components/quizComponents/tests/finishedPage';

//Error Pages
import QuizErrorPage from '../../../common/errorPages/quizError';
import DisqualifiedPage from '../../../common/errorPages/disqualifiedPage';
import { hasPassed, verifyToken } from '../../../common/api/quiz';


function QuizLayout() {
    const message = "Veuillez patienter pendant que nous vérifions votre autorisation d'accéder à cette page.";
    const quizPath = "/espace-quiz/azer/quiz-en-cours";
    const { token } = useParams();
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const previousPath = useSelector(state => state.candidate.previousPath);
    const isValid = useSelector(state => state.candidate.isValid);
    const isDisqualified = useSelector(state => state.candidate.isDisqualified);
    const isFinished = useSelector(state => state.candidate.isFinished);


    useEffect(() => {
        const handlePathChange = () => {
            if (previousPath === quizPath && location.pathname !== quizPath && !isFinished) {
                dispatch(setDisqualified(true));
            }
        };

        handlePathChange();
        dispatch(setPreviousPath(location.pathname));
    }, [location.pathname, previousPath, dispatch, quizPath, isFinished]);


    useEffect(() => {

        const validateToken = async (token) => {
            try {
                // Verify the token and get the quiz data
                const quizData = await verifyToken({ 'token': token });

                // Set valid state to true
                dispatch(setValid(true));

                // Check if the candidate has passed the quiz
                try {
                    const hasTaken = await hasPassed(quizData.email, quizData.quiz.id);
                    if (hasTaken) {
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error checking if the candidate has passed:', error);
                }

                // Set candidate email and quiz information
                dispatch(setCandidateEmail(quizData.email));
                dispatch(setQuiz(quizData.quiz));
            } catch (error) {
                // If there's an error verifying the token, set valid state to false and navigate
                dispatch(setValid(false));
                navigate('/Centre-réclamation');
            }
        };


        validateToken(token);
    }, [token, dispatch, navigate]);

    if (isValid === null) {
        return (
            <Loding message={message} />
        );
    }

    return (
        <Box
            sx={{
                bgcolor: 'grey.light',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
        >
            <Box
                sx={{width : '100%'}}
            >
            <Box
                sx={{
                    width: '240px',
                    display: 'flex',
                    justifyContent: 'start',
                }}
            >
                <img 
                    src={logo} 
                    alt='portnet logo'
                    style={{
                    maxWidth: '80%',
                    }}
                />
                </Box>
            </Box>
            {isDisqualified && <DisqualifiedPage />}
            {isFinished && !isDisqualified && <FinishedPage />}
            { !isDisqualified && !isFinished && <Outlet />}
            {isValid === false &&
                <QuizErrorPage
                    name="Accès non autorisé"
                    code="401"
                    description="Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource."
                    instructions="Veuillez vérifier votre token et réessayer. Si le problème persiste, contactez l'administrateur du système." />}
        </Box>
    )
}

export default QuizLayout
