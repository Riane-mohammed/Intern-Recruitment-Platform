import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, InputAdornment, IconButton, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

//icons
import { Visibility, VisibilityOff } from "@mui/icons-material";

//components
import LoadingOverlay from "../../../common/components/loadingOverlay";
import { updatePassword, verifyPasswordToken } from "../../../common/api/auth";

const RecoverPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setValid] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const validateToken = async (token) => {
        try {
            setIsLoading(true);
            const isValid = await verifyPasswordToken({ token });
            setValid(isValid);
            if (!isValid) {
                setError("Token invalide ou expiré.");
            }
        } catch (error) {
            setError("Erreur lors de la validation du token.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            validateToken(token);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleSave = async () => {
        if (newPassword === confirmPassword) {
            try {
                setIsLoading(true);
                await updatePassword({
                    newPassword: newPassword,
                    token: token
                });
                setSuccess('Mot de passe réinitialisé avec succès!');
                setTimeout(() => {
                    navigate('/Connexion');
                }, 2000);
            } catch (error) {
                console.error("failed to change password :", error)
            } finally {
                setIsLoading(false);
            }
        } else {
            setError("Les mots de passe ne correspondent pas.");
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    return (
        <>
            {/* Loading Overlay */}
            <LoadingOverlay isLoading={isLoading} />
            {isValid &&
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                >
                    <Box
                        width="500px"
                        p={4}
                        boxShadow={3}
                        borderRadius={2}
                        sx={{ backgroundColor: '#fff' }}
                    >
                        <Typography variant="h6" align="center" gutterBottom>
                            Nouveau mot de passe
                        </Typography>
                        <TextField
                            label="Nouveau mot de passe"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError(''); // Clear error on change
                            }}
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
                            error={!!error}
                            helperText={error}
                        />
                        <TextField
                            label="Confirmer le nouveau mot de passe"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError(''); // Clear error on change
                            }}
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
                            error={!!error}
                            helperText={error}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleSave}
                        >
                            Enregistrer
                        </Button>
                    </Box>
                    {/* Success Snackbar */}
                    <Snackbar
                        open={Boolean(success)}
                        autoHideDuration={6000}
                        onClose={() => setSuccess('')}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top center
                    >
                        <Alert onClose={() => setSuccess('')} severity="success">
                            {success}
                        </Alert>
                    </Snackbar>
                </Box>
            }
        </>
    );
};

export default RecoverPassword;
