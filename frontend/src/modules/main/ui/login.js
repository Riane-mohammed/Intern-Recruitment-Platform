import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, TextField, Button, Typography, InputAdornment, IconButton, FormControlLabel, Checkbox, Link, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

// API
import { login, sendPasswordResetEmail, verifyAdminToken } from '../../../common/api/auth';  

// Actions
import { setAuthenticated, setUser } from '../../admin/actions/userActions';

// Login Image
import logo from '../../../assets/images/Login.svg';  
import LoadingOverlay from '../../../common/components/loadingOverlay';

const LoginPage = () => {
    const { token } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Modal States
    const [openModal, setOpenModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState(null);
    const [resetSuccess, setResetSuccess] = useState(null);

    // Snackbar States
    const [snackError, setSnackError] = useState(null);
    const [snackSuccess, setSnackSuccess] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const VerifyToken = async () => {
        try {
            const isValid = await verifyAdminToken({ token });
            if (isValid) {
                setSnackError(null);
                setSnackSuccess("Votre compte a été activé avec succès ! Vous pouvez maintenant vous connecter.");
            } else {
                setSnackSuccess(null);
                setSnackError('Le lien de vérification est invalide ou a expiré.');
            }
        } catch (error) {
            console.error("Failed to verify token:", error);
            setSnackSuccess(null);
            setSnackError('Une erreur est survenue lors de la vérification du lien.');
            console.log("Error message set:", "Une erreur est survenue lors de la vérification du lien.");
        }
    };


    useEffect(() => {
        if (token) {
            VerifyToken();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email: email, password: password };
        try {
            const response = await login(credentials);
            setSnackError(null);
            dispatch(setUser(response));
            dispatch(setAuthenticated(true));
        } catch (error) {
            console.error('Login failed:', error);
            setSnackError('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setResetError(null);
        setResetSuccess(null);
        setResetEmail('');
    };

    const handlePasswordReset = async () => {
        setIsLoading(true);
        try {
            await sendPasswordResetEmail({ email: resetEmail });
            setResetError(null);
            setResetSuccess('Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
        } catch (error) {
            console.error('Failed to send password reset email:', error);
            setResetSuccess(null);
            setResetError('Cet e-mail n\'existe pas.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Loading Overlay */}
            <LoadingOverlay isLoading={isLoading} />
            <Grid container>
                {/* SVG */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <img src={logo} alt="Illustration" width="80%" />
                    </Box>
                </Grid>

                {/* Login Form */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 3,
                            minWidth: '500px',
                            border: '1px solid',
                            borderColor: 'grey.light'
                        }}
                    >
                        <Typography variant="h5" align="center" fontWeight={600} color='primary' gutterBottom>
                            Connexion
                        </Typography>
                        <TextField
                            label="Adresse e-mail"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                borderRadius: '8px',
                                width: '90%'
                            }}
                        />

                        <TextField
                            label="Mot de passe"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                borderRadius: '8px',
                                width: '90%'
                            }}
                        />

                        {/* Remember Me Checkbox and Forgot Password Link */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: '100%',
                                mt: 2
                            }}
                        >
                            <FormControlLabel
                                control={<Checkbox size='small' />}
                                label={<Typography variant="body2">Se souvenir de moi</Typography>}
                            />
                            <Link href="#" variant="body2" onClick={handleOpenModal}>
                                Mot de passe oublié ?
                            </Link>
                        </Box>

                        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, width: '75%' }} type="submit">
                            Se connecter
                        </Button>
                    </Box>
                </Grid>

                {/* Password Reset Modal */}
                <Dialog
                    open={openModal}
                    onClose={handleCloseModal}
                    PaperProps={{
                        sx: {
                            width: '500px',
                            height: '350px',
                            maxWidth: '90%',
                            borderRadius: 5,
                            py: 1
                        }
                    }}
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Lock />
                            <Typography variant="h6">Mot de passe oublié ?</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" gutterBottom>
                                Vous devez ajouter votre e-mail. Nous vous enverrons un lien de réinitialisation.
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Email"
                                fullWidth
                                variant="outlined"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                helperText={resetError ? resetError : (resetSuccess ? resetSuccess : '')}
                                error={!!resetError}
                                sx={{ mt: 2 }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="secondary">
                            Annuler
                        </Button>
                        <Button
                            onClick={handlePasswordReset}
                            color="primary"
                            disabled={isLoading}
                        >
                            Réinitialiser
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Error Snackbar */}
                <Snackbar
                    open={Boolean(snackError)}
                    autoHideDuration={6000}
                    onClose={() => setSnackError(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackError(null)} severity="error">
                        {snackError}
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={Boolean(snackSuccess)}
                    autoHideDuration={6000}
                    onClose={() => setSnackSuccess(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackSuccess(null)} severity="success">
                        {snackSuccess}
                    </Alert>
                </Snackbar>

            </Grid>
        </>
    );
};

export default LoginPage;
