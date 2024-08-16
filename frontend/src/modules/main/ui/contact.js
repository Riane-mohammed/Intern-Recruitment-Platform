import { Box, Button, Grid, TextField, Typography, Card, CardContent, IconButton } from "@mui/material";
import { theme } from '../../../common/utils/theme';
import { ReactComponent as ContactIcon } from '../../../Assets/images/Contact.svg'; 

// Icons
import FaxIcon from '@mui/icons-material/Fax';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';

function ContactUs() {

    const contactInfo = [
        {
            id: 1,
            icon: <LocationOnIcon color="primary" sx={{ mr: 2 }} />,
            info: 'Enceinte Portuaire, Bâtiment de la Capitainerie, 2ème étage Port de Casablanca'
        },
        {
            id: 2,
            icon: <EmailIcon color="primary" sx={{ mr: 2 }} />,
            info: 'contact@portnet.ma'
        },
        {
            id: 3,
            icon: <LocalPhoneIcon color="primary" sx={{ mr: 2 }} />,
            info: '+212 5 20 473 100'
        },
        {
            id: 4,
            icon: <FaxIcon color="primary" sx={{ mr: 2 }} />,
            info: '+212 5 20 473 101'
        },
    ];

    return (
        <Box sx={{
            minHeight: `calc(100vh - (${theme.mixins.toolbar.minHeight}px + 15px))`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative', // This allows the social media card to be positioned relative to this container
        }}>
            <Box sx={{ position: 'relative', display: 'flex' }}>
                <Card sx={{ maxWidth: 900, width: '100%', padding: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Grid container spacing={4}>
                            {/* Left Side - Form */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" color='primary' gutterBottom fontWeight={600}>
                                    Contactez-nous
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
                                    Nous sommes là pour vous ! Comment pouvons-nous vous aider ?
                                </Typography>

                                <TextField
                                    label="Nom"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Message"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ mb: 3 }}
                                />
                                <Button variant="contained" fullWidth color="primary">
                                    Envoyer
                                </Button>
                            </Grid>

                            {/* Right Side - Contact Info */}
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: { xs: 'center', md: 'flex-start' },
                                        textAlign: { xs: 'center', md: 'left' },
                                    }}
                                >
                                    <Box sx={{ mx: 'auto' }}>
                                        <ContactIcon width="100%" style={{ maxWidth: '300px' }} />
                                    </Box>
                                    {contactInfo.map((contact) => (
                                        <Box key={contact.id} sx={{ display: 'flex', mb: 1, alignItems: 'center', ml: 2, }}>
                                            {contact.icon}
                                            <Typography color="textSecondary" fontSize='14px' gutterBottom>
                                                {contact.info}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Right Side Social Media Card */}
                <Card sx={{
                    position: 'absolute',
                    top: 0,
                    right: -40,
                    textAlign: 'center',
                    boxShadow: 3,
                    borderRadius: '0 8px 8px 0',
                    backgroundColor: 'primary.main',
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
                        <IconButton color="blanc" aria-label="Facebook" component="a" href="https://web.facebook.com/PORTNETSA?_rdc=2&_rdr" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="blanc" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/company/portnet" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton color="blanc" aria-label="YouTube" component="a" href="https://www.youtube.com/channel/UC9vtz2NXQbiVAZ4rFPSOJtA" target="_blank" rel="noopener noreferrer">
                            <YouTubeIcon />
                        </IconButton>
                        <IconButton color="blanc" aria-label="X" component="a" href="https://x.com/PORTNETSA?mx=2" target="_blank" rel="noopener noreferrer">
                            <XIcon />
                        </IconButton>
                        <IconButton color="blanc" aria-label="Instagram" component="a" href="https://www.instagram.com/portnet_officiel" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </IconButton>
                    </Box>

                </Card>
            </Box>
        </Box>
    );
}

export default ContactUs;
