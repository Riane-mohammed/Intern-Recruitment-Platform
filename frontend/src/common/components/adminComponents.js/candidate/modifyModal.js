import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

//icons
import CreateIcon from '@mui/icons-material/Create';

function ModifyModal({ open, handleClose, selectedRowData, handleSave }) {
    const [formData, setFormData] = useState({ ...selectedRowData });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                width: 600,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="div"
                    display='flex'
                    alignItems='center'
                    color='grey.main'>
                    <CreateIcon color='grey.main' sx={{ mr: '5px' }} /> Modifier
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        py: 4
                    }}
                >
                    <TextField
                        name="name"
                        label="Nom Complet"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        name="phone"
                        label="Téléphone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        name="age"
                        label="Age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        gap: 2
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            bgcolor: 'rgb(0,0,0,0.12)',
                            '&:hover': {
                                bgcolor: 'rgb(0,0,0,0.12)',
                            },
                        }}
                        onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant='contained' onClick={handleSubmit} sx={{ mt: 2 }}>
                        Sauvegarder
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModifyModal;