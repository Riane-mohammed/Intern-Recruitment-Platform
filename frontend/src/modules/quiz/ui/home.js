import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Actions
import { decrement, increment, setCurrentPage } from '../actions/candidateActions';

//Componenets
import ProgressBar from '../../../common/components/bars/progressBar'
import Conditions from '../../../common/components/quizComponents/home/conditions';
import Formulaire from '../../../common/components/quizComponents/home/formulaire';
import Rules from '../../../common/components/quizComponents/home/rules';
import VerifyEmail from '../../../common/components/quizComponents/home/verifyEmail';
import AlertModal from '../../../common/components/quizComponents/home/alertModal';

//icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


function QuizHome() {
    const confirmationAlert = "Confirmez-vous que toutes les données sont correctes? Une fois le quiz lancé, les informations saisies ne pourront plus être modifiées.";

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    
    const isVerified = useSelector(state => state.candidate.isVerified);
    const currentPage = useSelector(state => state.candidate.currentPage);
    
    const pageNames = [
        "CONDITIONS",
        "FORMULAIRE",
        "RÈGLES"
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleStartQuiz = () => {
        dispatch(setCurrentPage(1));
        navigate('quiz-en-cours');
    };
    
    const handleNextButton = () => {
        dispatch(increment(pageNames.length));
    };
    
    const handleBackButton = () => {
        dispatch(decrement());
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleStart = () => handleOpen();;

    return (
        isVerified ? (
            <Box
                component='div'
                sx={{
                    width: '85vw',
                    height: '80vh',
                }}
            >
                <ProgressBar currentPageNumber={currentPage} pageNames={pageNames} />
                <Box 
                    sx={{
                        bgcolor: 'white',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: 5,
                        minHeight: '70vh',
                        boxShadow: 2,
                        p: "10px"
                    }}
                >    
                    {currentPage === 1 && 
                        <Conditions 
                            checked={checked} 
                            handleCheckboxChange={handleCheckboxChange} 
                            handleNextButton={handleNextButton} 
                        />
                    }
                    {currentPage === 2 && 
                        <Formulaire 
                            handleNextButton={handleNextButton} 
                            handleBackButton={handleBackButton} 
                        />
                    }
                    {currentPage === 3 && 
                        <Rules 
                            handleBackButton={handleBackButton} 
                            handleStart={handleStart}
                        />
                    }
                    <AlertModal
                        open={open}
                        handleClose={handleClose}
                        hendleConfirm={handleStartQuiz}
                        title="Alerte d'information"
                        color='primary.main'
                        icon={<InfoOutlinedIcon color='primary' sx={{ mr: 1 }} />}
                        message={confirmationAlert}
                        />
                </Box>
            </Box>
        ) : (
            <VerifyEmail />
        )
    );
}

export default QuizHome
