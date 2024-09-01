import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { setIsCodeSent, setVerified } from '../../../../modules/quiz/actions/candidateActions';
import { verifyCode, sendCode } from '../../../api/quiz';

const VerifyEmail = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [validationError, setValidationError] = useState('');
    const email = useSelector(state => state.candidate.candidate.email);
    const isCodeSent = useSelector(state => state.candidate.isCodeSent);

    const dispatch = useDispatch();

    const sendCodeOnMount = async () => {
        if (!isCodeSent && email !== "") {
            try {
                await sendCode({ 'email': email });
                dispatch(setIsCodeSent(true));
            } catch (error) {
                console.error('Error sending verification code:', error);
            }
        }
    };

    useEffect(() => {
        sendCodeOnMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    const handleCodeChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value);
            setValidationError('');
        } else {
            setValidationError('Le code doit être composé de chiffres et avoir une longueur maximale de 6 caractères.');
        }
    };

    const handleVerify = async () => {
        if (code.length === 6) {
            try {
                await verifyCode({ "email": email, "code": code });
                setError(false);
                dispatch(setVerified(true));
            } catch (error) {
                console.error('Error verifying code:', error);
                setError(true);
            }
        } else {
            setValidationError('Veuillez entrer un code de 6 chiffres.');
        }
    };

    const handleResendCode = async () => {
        try {
            await sendCode({ 'email': email });
            dispatch(setIsCodeSent(true));
            setError(false);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error resending verification code:', error);
            setError(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                padding: '16px',
                borderRadius: 5,
                border: '1px solid rgba(0, 0, 0, 0.12)',
                backgroundColor: '#f9f9f9',
                boxShadow: 1,
                fontFamily: 'poppins',
                textAlign: 'center',
                gap: '16px'
            }}
        >
            <Typography variant="h4" fontWeight='600' color='primary' gutterBottom>
                Vérifiez votre identité
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Nous vous avons envoyé un code à six chiffres par email ( {email} ).
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Veuillez entrer le code ci-dessous pour vérifier votre identité.
            </Typography>
            {error && 
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                    *Le code que vous avez saisi est invalide. Vérifiez votre email et essayez à nouveau.
                </Typography>
            }
            {validationError && 
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                    {validationError}
                </Typography>
            }
            <TextField
                label="Entrez le code"
                variant="outlined"
                value={code}
                onChange={handleCodeChange}
                inputProps={{ maxLength: 6 }}
                sx={{
                    my: 2,
                    width: '60%',
                    maxWidth: '300px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                    }
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%'}}>
                <Button
                    disabled={code.length !== 6 || validationError !== ''}
                    variant="contained"
                    color="primary"
                    onClick={handleVerify}
                    sx={{
                        width: '60%',
                        maxWidth: '300px',
                        padding: '10px 0',
                        borderRadius: '8px',
                        textTransform: 'none',
                    }}
                >
                    Vérifier
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleResendCode}
                    sx={{
                        width: '60%',
                        maxWidth: '300px',
                        padding: '10px 0',
                        borderRadius: '8px',
                        textTransform: 'none',
                        borderColor: '#757575', 
                        color: '#757575',
                        '&:hover': {
                            borderColor: '#555',
                            color: '#555',
                        },
                    }}
                >
                    Renvoyer le code
                </Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Code de vérification renvoyé avec succès !
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VerifyEmail;
