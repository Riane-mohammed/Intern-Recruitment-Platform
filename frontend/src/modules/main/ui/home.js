import { Box, Button, Grid, Typography } from "@mui/material";
import logo from "../../../Assets/images/home.svg";
import { theme } from '../../../common/utils/theme';
import { useNavigate } from "react-router-dom";

//icon
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

function Home() {
    const navigate = useNavigate()

    return (
        <Grid container sx={{ minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px + 15px ) )`, p: 4, pt: 1 }}>
            {/* Text Section */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    justifyContent: 'center',
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                <Box sx={{ padding: { xs: 2, md: 4 } }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Testez, évaluez, recrutez : <Typography variant="span" component="span" fontWeight={600}>Gagnez du temps</Typography> et <Typography variant="span" component="span" fontWeight={600}>améliorez la précision</Typography> de vos recrutements
                    </Typography>
                    <Typography variant='h6' color="grey.text" fontWeight={300} >
                    L'avenir s'écrit ici, avec vous.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, marginTop: 1,pl: { xs: 2, md: 4 } }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/Connexion') }>Se Connecter</Button>
                    <Button variant="outlined" startIcon={<ReportProblemIcon />} onClick={() => navigate('/Centre-réclamation') }>Besoin d'Aide ? Réclamez Ici</Button>
                </Box>
            </Grid>

            {/* Image Section */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: { xs: 4, md: 0 },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <img src={logo} alt="Illustration" style={{ minWidth: '100%'}} />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Home;
