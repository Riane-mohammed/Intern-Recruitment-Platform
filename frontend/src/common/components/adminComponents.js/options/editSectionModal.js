import { Modal, Fade, Backdrop, Box, Typography, TextField, Button } from '@mui/material';

function EditSectionModal({ open, onClose, onSave, section, updatedSectionName, updatedSectionDescription, setNewSectionName, setNewSectionDescription }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 5,
                    border: '2px solid rgba(0, 0, 0, 0.12)'
                }}>
                    {section &&
                        <>
                            <Typography variant='h6' fontWeight={500} color='primary' gutterBottom>Modifier</Typography>
                            <TextField
                                label="Titre"
                                value={updatedSectionName}
                                onChange={(e) => setNewSectionName(e.target.value)}
                                fullWidth
                                size='small'
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                value={updatedSectionDescription}
                                onChange={(e) => setNewSectionDescription(e.target.value)}
                                fullWidth
                                size='small'
                                margin="normal"
                                multiline
                                rows={4}
                            />
                        </>
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button variant="outlined" onClick={onClose}>Annuler</Button>
                        <Button variant="contained" color="primary" onClick={onSave} sx={{ ml: 2 }}>Sauvegarder</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
};
export default EditSectionModal;
