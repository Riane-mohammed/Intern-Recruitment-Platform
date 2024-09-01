import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { setCandidate } from '../../../../modules/quiz/actions/candidateActions';

function Formulaire({ handleBackButton, handleNextButton }) {
    const dispatch = useDispatch();
    
    const candidate = useSelector(state => state.candidate.candidate);

    const [form, setForm] = useState(candidate);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!form.firstName) tempErrors.firstName = "Nom est requis.";
        if (!form.lastName) tempErrors.lastName = "Prénom est requis.";
        if (!form.gender) tempErrors.gender = "Genre est requis.";
        if (!form.email) tempErrors.email = "Adresse email est requise.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "L'adresse email est invalide.";
        if (!form.phone) tempErrors.phone = "Numéro de téléphone est requis.";
        else if (!/^\d{10}$/.test(form.phone)) tempErrors.phone = "Le numéro de téléphone doit contenir 10 chiffres.";
        if (!form.cin) tempErrors.cin = "Numéro de CIN est requis.";
        else if (form.cin.length !== 8) tempErrors.cin = "Le numéro de CIN doit contenir 8 caractères.";
        if (!form.address) tempErrors.address = "Adresse est requise.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = {
            ...form,
            [name]: value
        };
        setForm(updatedForm);
        dispatch(setCandidate(updatedForm));
    };

    const handleSave = async () => {
        if (validate()) {
            dispatch(setCandidate(form));
            handleNextButton();
        }
    };

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
                '& .MuiTextField-root': {
                    m: 1,
                    width: '48%',
                },
            }}
        >
            <Box>
                <Typography variant='h5' align='center' fontFamily='poppins, Sora' fontWeight='bold'>
                    FORMULAIRE DE CANDIDAT
                </Typography>
                <Typography variant="subtitle1" component="h2" color="textSecondary" align='center'>
                    Aide-nous à mieux te connaître
                </Typography>
            </Box>
            <Box sx={{ px: '5%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        required
                        name="firstName"
                        value={form.firstName || ""}
                        onChange={handleChange}
                        label="Nom"
                        sx={{ width: '47% !important' }}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        required
                        name="lastName"
                        value={form.lastName || ""}
                        onChange={handleChange}
                        label="Prénom"
                        sx={{ width: '47% !important' }}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="gender"
                        onChange={handleChange}
                        value={form.gender || ""}
                        sx={{ width: '30% !important', mx: 'auto' }}
                    >
                        <FormControlLabel
                            sx={{ display: 'flex', justifyContent: 'center', maxHeight: '25px' }}
                            value="MALE"
                            control={<Radio />}
                            label="Homme"
                        />
                        <FormControlLabel
                            sx={{ display: 'flex', justifyContent: 'center', maxHeight: '25px' }}
                            value="FEMALE"
                            control={<Radio />}
                            label="Femme"
                        />
                    </RadioGroup>
                    {errors.gender && <Typography color="error" variant="body2" sx={{ ml: 2 }}>{errors.gender}</Typography>}
                </Box>
                <TextField
                    disabled
                    name="email"
                    onChange={handleChange}
                    label="Adresse email"
                    defaultValue={form.email || ""}
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    required
                    label="Date"
                    name="birthday"
                    value={form.birthday || ""}
                    onChange={handleChange}
                    type="date"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    required
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                    label="Numéro de téléphone"
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <TextField
                    required
                    name="cin"
                    value={form.cin || ""}
                    onChange={handleChange}
                    label="Numéro de CIN"
                    error={!!errors.cin}
                    helperText={errors.cin}
                />
                <TextField
                    required
                    label="Adresse"
                    name="address"
                    value={form.address || ""}
                    onChange={handleChange}
                    sx={{ width: '97.5% !important' }}
                    error={!!errors.address}
                    helperText={errors.address}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    px: '4%',
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
    );
}

export default Formulaire;
