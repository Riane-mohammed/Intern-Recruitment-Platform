import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';

//components
import LoadingOverlay from '../../../common/components/loadingOverlay';

//apis
import { addAdmin, getAllEmails, getAllUsernames } from '../../../common/api/admin';

//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Visibility, VisibilityOff } from "@mui/icons-material";

function AddAdmin() {
    // States for form inputs
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAccountPassword, setNewAccountPassword] = useState('');
    const [confirmNewAccountPassword, setConfirmNewAccountPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // States for error and success messages
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState('');

    // States
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [existingEmails, setExistingEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAndSetUsernames = async () => {
        try {
            const usernamesData = await getAllUsernames();
            setExistingUsernames(usernamesData);
        } catch (error) {
            console.error("Failed to fetch usernames:", error);
        }
    };

    const fetchAndSetEmails = async () => {
        try {
            const emailsData = await getAllEmails();
            setExistingEmails(emailsData);
        } catch (error) {
            console.error("Failed to fetch emails:", error);
        }
    };

    useEffect(() => {
        fetchAndSetEmails();
        fetchAndSetUsernames();
    }, []);

    const handleCreateAccount = async () => {
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setSuccess('');

        // Validate input
        if (newAccountPassword !== confirmNewAccountPassword) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (existingUsernames.includes(newUsername)) {
            setUsernameError("Le nom d'utilisateur est déjà pris.");
            return;
        }

        if (existingEmails.includes(newEmail)) {
            setEmailError("L'email d'utilisateur est déjà pris.");
            return;
        }

        try {
            setIsLoading(true);
            const newAccount = {
                username: newUsername,
                email: newEmail,
                password: newAccountPassword,
            };

            await addAdmin(newAccount);
            setSuccess("Un e-mail de vérification a été envoyé pour activer votre compte.");
            setNewUsername('');
            setNewEmail('');
            setNewAccountPassword('');
            setConfirmNewAccountPassword('');
        } catch (error) {
            setUsernameError("Erreur lors de la création du compte.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    return (
        <>
            {/* Loading Overlay */}
            <LoadingOverlay isLoading={isLoading} />
            <div style={{ padding: '20px' }}>
                
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Link to='/admin/gestion-administrateurs'>
                            <IconButton aria-label="back">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>

                <Typography variant='h5' fontWeight={500} color='primary'>
                    Créer un autre compte
                </Typography>
                    </Box>

                <Box display="flex" justifyContent="center" mt={4} gap={4}>
                    <Box flex={1} maxWidth="500px" display="flex" flexDirection="column" alignItems="center" p={2} border={1} borderColor="grey.300" bgcolor='white' borderRadius="8px">
                        <Typography variant='h5' fontWeight={500} color='primary' gutterBottom>
                            Nouveau Compte
                        </Typography>
                        <TextField
                            label="Nom d'utilisateur"
                            fullWidth
                            margin="normal"
                            sx={{ maxWidth: 400 }}
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            error={!!usernameError}
                            helperText={usernameError}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            sx={{ maxWidth: 400 }}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            sx={{ maxWidth: 400 }}
                            value={newAccountPassword}
                            onChange={(e) => setNewAccountPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                        <TextField
                            label="Confirmer le mot de passe"
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            sx={{ maxWidth: 400 }}
                            value={confirmNewAccountPassword}
                            onChange={(e) => setConfirmNewAccountPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={handleCreateAccount}
                        >
                            Créer le compte
                        </Button>
                    </Box>
                </Box>

                {/* Success Snackbar */}
                <Snackbar
                    open={Boolean(success)}
                    autoHideDuration={6000}
                    onClose={() => setSuccess('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSuccess('')} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}

export default AddAdmin;
