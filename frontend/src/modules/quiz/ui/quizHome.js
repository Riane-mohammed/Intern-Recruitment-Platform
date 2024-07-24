import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { decrement, increment } from '../actions/candidateActions';

//Componenets
import ProgressBar from '../../../common/components/bars/progressBar'
import Conditions from '../../../common/components/quizHomeComponents/conditions';
import Formulaire from '../../../common/components/quizHomeComponents/formulaire';
import Regles from '../../../common/components/quizHomeComponents/regles';
import VerifyEmail from '../../../common/components/quizHomeComponents/verifyEmail';


function QuizHome() {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const isVerified = useSelector(state => state.candidate.isVerified);
    const currentPage = useSelector(state => state.candidate.currentPage);

    const pageNames = [
        "CONDITIONS",
        "FORMULAIRE",
        "RÈGLES"
    ];

    const handleNextButton = () => {
        dispatch(increment(pageNames.length));
    };
    
    const handleBackButton = () => {
        dispatch(decrement());
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

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
                        <Regles 
                            handleNextButton={handleNextButton} 
                            handleBackButton={handleBackButton} 
                        />
                    }
                </Box>
            </Box>
        ) : (
            <VerifyEmail />
        )
    );
}

export default QuizHome
