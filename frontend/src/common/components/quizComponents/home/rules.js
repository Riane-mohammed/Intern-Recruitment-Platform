import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { formatTime } from '../../../utils/helpers';

function Rules({ handleBackButton, handleStart }) {
    const quiz = useSelector(state => state.candidate.quiz);

    const testNames = quiz?.quizTests.map(quizTest => quizTest.test.title);
    const totalQuestions = quiz?.quizTests.reduce((acc, quizTest) => acc + quizTest.test.questions.length, 0) || 0;
    const globalTimeInMinutes = (totalQuestions * 20);
    
    return (
        <Box
            sx={{
                    minHeight: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
            <Box>
                <Typography variant='h5' align='center' fontFamily='poppins, Sora' fontWeight='bold' >
                    RÈGLES
                </Typography>
                <Typography variant="subtitle1" component="h2" color="textSecondary" align='center'>
                    Lisez attentivement les instructions avant de commencer.
                </Typography>
            </Box>
            <Typography  component='div' mx='150px' fontFamily='poppins, Sora' >
                Pour compléter votre candidature, vous devrez passer un test en ligne d'une durée de {formatTime(globalTimeInMinutes)} minutes.
                Ce test se divise en trois sections :
                {testNames.map((name, index) => (
                    <span key={index} style={{ color: 'blue' }}>
                        {name}
                        {index < testNames.length - 1 && ', '}
                    </span>
                ))}
                <br/>
                <br/>
                Chaque section peut comprendre un nombre différent de questions. Vous pouvez passer à la question suivante si vous êtes bloqué ou si vous ne connaissez pas la réponse. Une réponse incorrecte entraînera une déduction d'un point.
                <br/>
                <br/>
                <span style={{fontWeight: 'bold'}}>Important :</span> Plus vous répondez rapidement, plus vous accumulez de points.
                <br/>
                <br/>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    Bonne chance 🙏 ! 
                </Box>
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    px: '4%'
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: '45%',
                        bgcolor: 'rgb(0,0,0,0.12)',
                        '&:hover': {
                            bgcolor: 'rgb(0,0,0,0.12)',
                        },
                    }}
                    onClick={handleBackButton}
                    >
                    Précédent
                    </Button>
                <Button
                    onClick={handleStart}
                    variant="contained"
                    sx={{ width: '45%' }}
                >
                    Commencer
                </Button>
            </Box>
        </Box>
    )
}

export default Rules
