import { Box } from '@mui/material'
import { useSelector } from 'react-redux';
import { useState } from 'react';

//Components
import HomeTest from '../../../common/components/quizComponents/tests/homeTest';
import TestPage from '../../../common/components/quizComponents/tests/testPage';
import ProgressBar from '../../../common/components/bars/progressBar'
import AlertModal from '../../../common/components/quizComponents/tests/alertModal';

//icons
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

function QuizTests() {
    const alertMessage = "Si vous quittez cette page, vous serez automatiquement disqualifié.";

    const quiz = useSelector(state => state.candidate.quiz);

    const currentPage = useSelector(state => state.candidate.currentPage);
    const isStarted = useSelector(state => state.candidate.isStarted);

    const [open, setOpen] = useState(true);
    const currentTest = quiz.quizTests[currentPage - 1].test;
    
    const testNames = quiz.quizTests.map(quizTest => quizTest.test.title);

    const handleClose = () => setOpen(false);
    
    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault();
    //         event.returnValue = 'Are you sure you want to leave this page?';
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };

    // }, []);

    return (
        <Box
            component='div'
            sx={{
                width: '85vw',
                mb: 2
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
                    p: "10px",
                }}
            >
                {!isStarted && <HomeTest title={currentTest.title} time={currentTest.questions.length * 20} numberOfQuestions={currentTest.questions.length} /> }
                {isStarted && <TestPage test={currentTest} time={currentTest.questions.length * 20} quizLength={testNames.length} />  }
                <AlertModal
                    open={open}
                    handleClose={handleClose}
                    title="Attention"
                    color='red.main'
                    icon={<ReportProblemIcon color='red' sx={{ mr: 1 }} />}
                    message={alertMessage}
                />
            </Box>
        </Box>
    );
}

export default QuizTests;
