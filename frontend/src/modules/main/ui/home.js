import { Box, Button, Grid, Typography } from "@mui/material";
import logo from "../../../assets/images/home.svg";
import { theme } from '../../../common/utils/theme';
import { useNavigate } from "react-router-dom";

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
                        Postulez avec <Typography variant="span" component="span" fontWeight={600}>votre CV</Typography> et saisissez <Typography variant="span" component="span" fontWeight={600}>l'opportunité</Typography> de devenir un membre clé de <Typography variant="span" component="span" fontWeight={600}>Portnet.</Typography>
                    </Typography>
                    <Typography variant='h6' color="grey.text" fontWeight={300} >
                        L'innovation commence ici, avec vous.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, marginTop: 1,pl: { xs: 2, md: 4 } }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/Postuler') }>Postuler</Button>
                    <Button variant="outlined" onClick={() => navigate('/Contactez-nous') }>En savoir plus</Button>
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
