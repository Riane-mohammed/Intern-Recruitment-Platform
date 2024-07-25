import { Box } from '@mui/material'

//Components
import ProgressBar from '../../../common/components/bars/progressBar'
import { useSelector } from 'react-redux';

function QuizTests() {
    const currentPage = useSelector( state => state.candidate.currentPage );

    const testNames = [
        "Calcul Mental",
        "Psychologique",
        "Technique"
    ];

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
    )
}

export default QuizTests
