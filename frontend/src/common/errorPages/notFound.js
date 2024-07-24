import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Box
            sx={{
                fontFamily: 'poppins',
                margin: '100px'
            }}
        >
            <Typography fontWeight='600' textAlign='center' color='primary' fontSize='3rem'>
                Page introuvable
            </Typography>
            <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                Code d'erreur : 404
            </Typography>
            <Typography textAlign='center'>
                L'adresse demandée n'a pas été trouvée dans le système.
            </Typography>
            <Box
                sx={{
                    m: 4,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    p: 2,
                }}
            >
                <Typography variant='body1' fontWeight='600'>
                    Instructions :
                </Typography>
                <Typography variant='body1'>
                    Vérifiez l'URL saisie. Si vous avez un compte, essayez de vous connecter.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2
                    }}
                >
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                        sx={{ mx: 1 }}>
                            Aller à la page de connexion
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default NotFound
