import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function AdminNotFound () {
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
                La page que vous cherchez n'existe pas ou a été déplacée.
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
                    Veuillez vérifier l'URL pour vous assurer qu'il n'y a pas d'erreurs. Si vous pensez que c'est une erreur, retournez au tableau de bord pour continuer à gérer vos contenus.
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
                        to="/admin"
                        variant="contained"
                        color="primary"
                        sx={{ mx: 1 }}>
                            Aller au Tableau de Bord
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminNotFound
