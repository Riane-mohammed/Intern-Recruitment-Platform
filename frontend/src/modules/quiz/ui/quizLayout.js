import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material'
import { Outlet, useLocation, useParams } from 'react-router-dom'

//actions
import { setCandidateEmail, setDisqualified, setExpired, setPreviousPath, setValid } from '../actions/candidateActions';

//logo
import logo from '../../../assets/images/logoPortNetWeb.png';

//componenets
import Loding from '../../../common/components/loding';
import FinishedPage from '../../../common/components/quizComponents/tests/finishedPage';

//Error Pages
import QuizErrorPage from '../../../common/errorPages/quizError';
import DisqualifiedPage from '../../../common/errorPages/disqualifiedPage';


function QuizLayout() {
    const message = "Please wait while we verify your authorization to access this page.";
    const { token } = useParams();
    const quizPath = `/espace-quiz/token=${token}/quiz-en-cours`;
    const location = useLocation();

    const dispatch = useDispatch();

    const previousPath = useSelector(state => state.candidate.previousPath);
    const isValid = useSelector(state => state.candidate.isValid);
    const isExpired = useSelector(state => state.candidate.isExpired);
    const isDisqualified = useSelector(state => state.candidate.isDisqualified);
    const isFinished = useSelector(state => state.candidate.isFinished);

    const email = "moha@gmail.com";


    useEffect(() => {
        const handlePathChange = () => {
            if (previousPath === quizPath && location.pathname !== quizPath && !isFinished ) {
                dispatch(setDisqualified(true));
            }
        };

        handlePathChange();
        dispatch(setPreviousPath(location.pathname));
    }, [location.pathname, previousPath, dispatch, quizPath, isFinished]);

    useEffect(() => {
        const TokenIsExpired = (token) => {
            return false;
        };

        const TokenIsValid = (token) => {
            if (token === "azer") {
                return true;
            } else {
                return false;
            }
        };

        const validateToken = (token) => {
            if (TokenIsValid(token)) {
                if (TokenIsExpired(token)) {
                    dispatch(setValid(false));
                    dispatch(setExpired(true));
                } else {
                    dispatch(setValid(true));
                    dispatch(setExpired(false));
                    dispatch(setCandidateEmail(email))
                }
            } else {
                dispatch(setValid(false));
            }
        };

        validateToken(token);
    }, [token, dispatch]);

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
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
                }}
        >
            <Box
                sx={{
                    width: '240px',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0
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
            {isDisqualified && <DisqualifiedPage />}
            {isFinished && !isDisqualified && <FinishedPage />}
            {isValid && !isExpired && !isDisqualified && !isFinished && <Outlet />}
            {isExpired &&
                <QuizErrorPage
                    name="Token expiré"
                    code="401"
                    description="Votre token a expiré et n'est plus valide."
                    instructions="Veuillez vous reconnecter pour obtenir un nouveau token et réessayer." />}
            {isValid === false && !isExpired &&
                <QuizErrorPage
                    name="Accès non autorisé"
                    code="401"
                    description="Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource."
                    instructions="Veuillez vérifier votre token et réessayer. Si le problème persiste, contactez l'administrateur du système." />}
        </Box>
    )
}

export default QuizLayout
