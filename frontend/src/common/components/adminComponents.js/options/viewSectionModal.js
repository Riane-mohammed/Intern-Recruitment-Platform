import { Modal, Fade, Backdrop, Box, Typography, Button } from '@mui/material';

function ViewSectionModal({ open, onClose, section }) {
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
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 5,
                    border: '2px solid rgba(0, 0, 0, 0.12)'
                }}>
                    {section &&
                        <>
                            <Typography variant='h6' fontWeight={500} color='primary' gutterBottom>Voir la Catégorie</Typography>
                            <Typography variant='subtitle1' fontWeight={500}>Titre :</Typography>
                            <Typography>{section.name}</Typography>
                            <Typography variant='subtitle1' fontWeight={500} sx={{ mt: 2 }}>Description :</Typography>
                            <Typography>{section.description}</Typography>
                        </>
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button variant="outlined" onClick={onClose}>Fermer</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
};

export default ViewSectionModal
