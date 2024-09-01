import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Card, CardContent, IconButton, Snackbar, Alert } from "@mui/material";
import { theme } from '../../../common/utils/theme';

// SVG
import { ReactComponent as ContactIcon } from '../../../assets/images/Contact.svg'; 

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

// APIs
import { addReclamation } from "../../../common/api/admin";

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

function ClaimsForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = formData.name ? "" : "Nom est requis.";
        tempErrors.email = formData.email ? 
            (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email) ? "" : "Email invalide.") 
            : "Email est requis.";
        tempErrors.message = formData.message ? "" : "Message est requis.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                await addReclamation(formData);
                setSuccess('Réclamation envoyée avec succès!');
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                setErrors({});
            } catch (error) {
                console.error('Failed adding reclamation', error);
            }
        }
    };

    return (
        <Box sx={{
            minHeight: `calc(100vh - (${theme.mixins.toolbar.minHeight}px + 15px))`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        }}>
            <Box sx={{ position: 'relative', display: 'flex' }}>
                <Card sx={{ maxWidth: 900, width: '100%', padding: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Grid container spacing={4}>
                            {/* Left Side - Form */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" color='primary' gutterBottom fontWeight={600}>
                                    Réclamations et Assistance
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
                                    Déposez vos réclamations ici et nous nous engageons à y répondre dans les plus brefs délais
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        name="name"
                                        label="Nom"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name}
                                    />
                                    <TextField
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email}
                                    />
                                    <TextField
                                        name="message"
                                        label="Message"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        sx={{ mb: 3 }}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.message)}
                                        helperText={errors.message}
                                    />
                                    <Button variant="contained" fullWidth color="primary" type="submit">
                                        Envoyer
                                    </Button>
                                </form>
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
            {/* Success Snackbar */}
            <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setSuccess('')} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ClaimsForm;
