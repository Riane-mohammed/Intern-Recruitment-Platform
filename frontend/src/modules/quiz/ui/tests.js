import { Box } from '@mui/material'

//Components
import ProgressBar from '../../../common/components/bars/progressBar'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function QuizTests() {
    const currentPage = useSelector(state => state.candidate.currentPage);

    const testNames = [
        "Calcul Mental",
        "Psychologique",
        "Technique"
    ];

    
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave this page?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, []);

    return (
        <Box
            component='div'
            sx={{
                width: '85vw',
                height: '80vh',
            }}
        >
            <ProgressBar currentPageNumber={currentPage} pageNames={testNames} />
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
            </Box>
        </Box>
    );
}

export default QuizTests;
