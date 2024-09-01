import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const DataByIdNotFound = ({ name }) => {
    return (
        <Box
            sx={{
                fontFamily: 'Poppins',
                margin: '100px'
            }}
        >
            <Typography fontWeight='600' textAlign='center' color='primary' fontSize='3rem'>
                {name} Introuvable
            </Typography>
            <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                Erreur 404
            </Typography>
            <Typography textAlign='center'>
                Le {name.toLowerCase()} que vous cherchez n'a pas été trouvé dans notre système.
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
                    Que faire ensuite ?
                </Typography>
                <Typography variant='body1'>
                    Veuillez vérifier l'URL pour vous assurer qu'il n'y a pas d'erreurs. Si vous avez saisi un mauvais identifiant, essayez de le corriger. Sinon, retournez à la page de {name.toLowerCase()} pour explorer d'autres contenus.
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
                        to={`/admin/${name}${name.toLowerCase() === 'test' ? 's' : ''}`}
                        variant="contained"
                        color="primary"
                        sx={{ mx: 1 }}>
                        Retour à la page de {name}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default DataByIdNotFound;
