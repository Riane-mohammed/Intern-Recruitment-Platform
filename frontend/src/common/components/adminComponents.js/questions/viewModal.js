import { Box, Typography, Modal, Button, Grid } from '@mui/material';

//icons
import InfoIcon from '@mui/icons-material/Info';

function ViewModal({ open, handleClose, selectedRowData }) {

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
                width: 700,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                border: '2px solid primary',
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
            }}>
                <Box>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="div"
                        display='flex'
                        alignItems='center'
                        color='grey.main'>
                        <InfoIcon color='grey.main' sx={{ mr: '5px' }} /> Question {selectedRowData ? selectedRowData.id : ''}
                    </Typography>
                    {selectedRowData &&
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                pt: 5,
                            }}
                        >
                            <Typography fontWeight={500}>
                                {selectedRowData.questionText}
                            </Typography>
                            <Grid container spacing={4} sx={{ py: 5 }}>
                                {selectedRowData.answers.map((answer) => (
                                    <Grid item xs={6} key={answer.id} >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Button
                                                disabled
                                                sx={{
                                                    width: '75%',
                                                    backgroundColor: answer.isCorrect ? '#06d00169' : '#ff000045',
                                                    color: 'white !important'
                                                }}
                                            >
                                                {answer.answerText}
                                            </Button>

                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    }
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