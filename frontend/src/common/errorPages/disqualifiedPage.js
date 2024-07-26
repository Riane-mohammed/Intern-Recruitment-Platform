import { Box, Typography } from "@mui/material"

function DisqualifiedPage() {
    return (
        <Box
            sx={{
                fontFamily: 'Poppins',
                pb: '150px'
            }}
        >
            <Typography fontWeight='600' textAlign='center' color='primary' fontSize='3rem'>
                Disqualifié
            </Typography>
            <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                Vous avez été disqualifié du quiz.
            </Typography>
            <Typography textAlign='center'>
                Il semble que vous ayez quitté la page du quiz, ce qui enfreint les règles du quiz. Si vous pensez qu'il s'agit d'une erreur, veuillez contacter le support pour plus d'assistance.
            </Typography>
        </Box>
    )
}

export default DisqualifiedPage;
