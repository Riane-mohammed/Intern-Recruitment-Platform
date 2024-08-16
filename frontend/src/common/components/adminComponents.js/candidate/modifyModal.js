import { Box, Button, FormControlLabel, Grid, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CreateIcon from '@mui/icons-material/Create';

function ModifyModal({ open, handleClose, selectedCandidateData, handleSave }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (selectedCandidateData) {
            setFormData({ ...selectedCandidateData });
        }
    }, [selectedCandidateData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        handleSave(formData);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
                width: '80%',
                maxWidth: '600px'
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="div"
                    display='flex'
                    alignItems='center'
                    color='grey.main'
                    mb={2}
                >
                    <CreateIcon color='grey.main' sx={{ mr: '5px' }} /> Modifier
                </Typography>
                <Box sx={{ px: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="firstName"
                                value={formData.firstName || ''}
                                onChange={handleChange}
                                label="Nom"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="lastName"
                                value={formData.lastName || ''}
                                onChange={handleChange}
                                label="Prénom"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RadioGroup
                                aria-labelledby="gender-radio-buttons-group-label"
                                name="gender"
                                onChange={handleChange}
                                value={formData.gender || ''}
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                name="email"
                                onChange={handleChange}
                                label="Adresse email"
                                value={formData.email || ''}
                                type="email"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date"
                                name="date"
                                value={formData.birthday || ''}
                                onChange={handleChange}
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                label="Numéro de téléphone"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="cin"
                                value={formData.cin || ''}
                                onChange={handleChange}
                                label="Numéro de CIN"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Adresse"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'rgb(0,0,0,0.12)',
                                '&:hover': {
                                    bgcolor: 'rgb(0,0,0,0.12)',
                                },
                            }}
                            onClick={handleClose}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleSubmit}
                        >
                            Sauvegarder
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModifyModal;
