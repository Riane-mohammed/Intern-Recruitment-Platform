import { Box, Typography, Modal, Button, Divider } from '@mui/material';

//icons
import InfoIcon from '@mui/icons-material/Info';
import AnalyticsIcon from '@mui/icons-material/Analytics';

function ViewModal({ open, handleClose, selectedCandidateData }) {
    const labels = [
        "Nom Complet",
        "Email",
        "Téléphone",
        "Adresse",
        "CIN",
        "Sexe",
        "Date de naissance"
    ];

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
                width: 1000,
                bgcolor: 'background.paper',
                border: '2px solid primary',
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Box
                        sx={{
                        width: 500
                    }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="div"
                            display='flex'
                            alignItems='center'
                            color='grey.main'>
                            <InfoIcon color='grey.main' sx={{ mr: '5px' }} /> Information
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                py: 4
                            }}
                        >
                            <Box>
                                {labels.map((label, index) => (
                                    <Typography
                                        key={index}
                                        fontWeight={600}
                                        color="primary"
                                        mt={index !== 0 ? 2 : 0}>
                                        {label}
                                    </Typography>
                                ))}
                            </Box>
                            <Box>
                                {labels.map((_, index) => (
                                    <Typography key={index} mt={index !== 0 ? 2 : 0} fontWeight={600} color='primary'>
                                        :
                                    </Typography>
                                ))}
                            </Box>
                            <Box>
                                {selectedCandidateData && (
                                    <>
                                        <Typography>
                                            {selectedCandidateData.firstName} {selectedCandidateData.lastName}
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            {selectedCandidateData.email}
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            {selectedCandidateData.phone}
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            {selectedCandidateData.address}
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            {selectedCandidateData.cin}
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            {selectedCandidateData.gender}
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            {selectedCandidateData.birthday}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="div"
                            display='flex'
                            alignItems='center'
                            color='grey.main'>
                            <AnalyticsIcon color='grey.main' sx={{ mr: '5px' }} /> Statistiques
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Button variant='contained' onClick={handleClose} sx={{ mt: 2 }}>
                        Fermer
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ViewModal;