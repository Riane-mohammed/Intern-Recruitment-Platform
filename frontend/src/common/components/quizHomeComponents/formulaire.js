import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { setCandidate } from '../../../modules/quiz/actions/candidateActions';

function Formulaire({ handleBackButton, handleNextButton }) {
    const dispatch = useDispatch();
    
    const candidate = useSelector(state => state.candidate.candidate);

    const [form, setForm] = useState(candidate);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = ({
            ...form,
            [name]: value
        });
        setForm(updatedForm);
        dispatch(setCandidate(updatedForm));
    };

    const handleSave = () => {
        dispatch(setCandidate(form));
        handleNextButton();
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    minHeight: '70vh',
                    '& .MuiTextField-root':
                {
                        m: 1,
                        width: '48%'
                },
                    
                }}
        >
            <Box>
                <Typography variant='h5' align='center' fontFamily='poppins, Sora' fontWeight='bold' >
                    FORMULAIRE DE CANDIDAT
                </Typography>
                <Typography variant="subtitle1" component="h2" color="textSecondary" align='center'>
                    Aide-nous à mieux te connaître
                </Typography>
            </Box>
            <Box sx={{px: '5%'}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        required
                        name="firstName"
                        value={form.firstName || ""}
                        onChange={handleChange}
                        label="Nom"
                        sx={{ width: '47% !important' }}
                    />
                    <TextField
                        required
                        name="lastName"
                        value={form.lastName || ""}
                        onChange={handleChange}
                        label="Prénom"
                        sx={{ width: '47% !important' }}
                    />
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="gender"
                        onChange={handleChange}
                        value={form.gender || ""}
                        sx={{ width: '30% !important', mx:'auto' }}
                    >
                        <FormControlLabel
                            sx={{ display: 'flex', justifyContent: 'center', maxHeight: '25px' }}
                            value="male"
                            control={<Radio />}
                            label="Homme" />
                        <FormControlLabel
                            sx={{ display: 'flex', justifyContent: 'center', maxHeight: '25px' }}
                            value="female"
                            control={<Radio />}
                            label="Femme" />
                    </RadioGroup>
                </Box>
                <TextField
                    disabled
                    name="email"
                    value={form.email|| ""}
                    onChange={handleChange}
                    label="Adresse email"
                    defaultValue='med@gmail.com'
                    type="email"
                />
                <TextField
                    label="Date"
                    name="date"
                    value={form.date || ""}
                    onChange={handleChange}
                    type="date"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    required
                    name="numero"
                    value={form.numero || ""}
                    onChange={handleChange}
                    label="Numéro de téléphone"
                />
                <TextField
                    required
                    name="cin"
                    value={form.cin || ""} 
                    onChange={handleChange}
                    label="Numéro de CIN"
                />
                <TextField
                    label="Adresse"
                    name="adresse"
                    value={form.adresse || ""}
                    onChange={handleChange}
                    sx={{ width: '97.5% !important' }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    px: '4%'
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: '45%',
                        bgcolor: 'rgb(0,0,0,0.12)',
                        '&:hover': {
                            bgcolor: 'rgb(0,0,0,0.12)',
                        },
                    }}
                    onClick={handleBackButton}
                    >
                    Précédent
                    </Button>
                <Button
                    variant="contained"
                    sx={{ width: '45%' }}
                    onClick={handleSave}
                >
                    Suivant
                </Button>
            </Box>
        </Box>
    )
}

export default Formulaire
