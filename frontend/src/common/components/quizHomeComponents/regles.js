import { Box, Button, Typography } from '@mui/material'

function Regles({ handleBackButton, handleStartQuiz }) {
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
            <Typography mx='150px' fontFamily='poppins, Sora' >
                Pour compléter votre candidature, vous devrez passer un test en ligne d'une durée de 15 minutes.
                Ce test se divise en trois sections : <span style={{color: 'blue'}}>Calcul Mental</span>, <span style={{color: 'blue'}}>Psychologique</span> et<span style={{color: 'blue'}}>Technique</span> .
                <br/>
                <br/>
                Chaque section comprend 15 questions ne nécessitant aucune connaissance préalable spécifique. Vous pouvez passer à la question suivante si vous êtes bloqué ou si vous ne connaissez pas la réponse. Une réponse incorrecte entraînera une déduction d'un point.
                <br/>
                <br/>
                <span style={{fontWeight: 'bold'}}>Important :</span> Plus vous répondez rapidement, plus vous accumulez de points.
                <br/>
                <br/>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    Bonne chance et que le meilleur gagne 🙏 ! 
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
                    onClick={handleStartQuiz}
                    variant="contained"
                    sx={{ width: '45%' }}
                >
                    Commencer
                </Button>
            </Box>
        </Box>
    )
}

export default Regles
