import { Box, Typography } from "@mui/material"

function FinishedPage() {
    return (
        <Box
            sx={{
                pb: '150px'
            }}
        >
            <Typography fontWeight='600' textAlign='center' color='primary' fontSize='3rem'>
                Merci de votre participation !
            </Typography>
            <Typography textAlign='center'>
                Merci d'avoir passé le quiz de recrutement. Bon courage pour la suite ! Si vous avez réussi à passer l'examen, nous vous enverrons un email. Bonne chance !
            </Typography>
        </Box>
    )
}

export default FinishedPage;
