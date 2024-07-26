import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { setVerified } from '../../../modules/quiz/actions/candidateActions';

const VerifyEmail = ({ setIsVerified }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const email = useSelector(state => state.candidate.candidate.email);

    const dispatch = useDispatch();

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleVerify = () => {
        if (code === "123456") {
            setError(false);
            dispatch(setVerified(true));
        } else {
            setError(true);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '16px',
                fontFamily: 'poppins'
            }}
        >
            <Typography variant="h4" fontWeight='600' color='primary' gutterBottom>
                Vérifiez votre identité
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Nous vous avons envoyé un code à six chiffres par email ( {email} ). Veuillez entrer le code ci-dessous pour vérifier votre identité.
            </Typography>
            {error && 
                <Typography variant='subtitle2' color='error' >*Le code que vous avez saisi est invalide. Vérifiez votre email et essayez à nouveau.</Typography>
            }
            <TextField
                label="Entrez le code"
                variant="standard"
                value={code}
                onChange={handleCodeChange}
                inputProps={{ maxLength: 6 }}
                sx={{ my: 2}}
            />
            <Button
                disabled={code.length !== 6}
                variant="contained"
                color="primary"
                onClick={handleVerify}
            >
                Vérifier
            </Button>
        </Box>
    );
};

export default VerifyEmail;
