import { Box, Typography, Modal, Button, Grid } from '@mui/material';

//icons
import InfoIcon from '@mui/icons-material/Info';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

function ViewModal({ open, handleClose, selectedQuestionData }) {
    
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
                        <InfoIcon color='grey.main' sx={{ mr: '5px' }} /> Question {selectedQuestionData ? selectedQuestionData.id : ''}
                    </Typography>
                    {selectedQuestionData &&
                        <Grid container spacing={4} sx={{ py: 3 }}>
                            <Grid item xs={selectedQuestionData.image ? 6 : 12} sx={{display: 'flex',flexDirection: 'column' , justifyContent: 'center', alignItems: 'center'}}>
                                { selectedQuestionData.question &&
                                <Typography fontWeight={500} textAlign='center'>
                                    {selectedQuestionData.question}
                                </Typography>
                                }
                                {selectedQuestionData.image &&
                                    <Box
                                        component="img"
                                        src={selectedQuestionData.image}
                                        alt={`question-${selectedQuestionData.id}`}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '400px',
                                            objectFit: 'contain',
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                }
                            </Grid>
                            <Grid item xs={selectedQuestionData.image ? 6 : 12} sx={{ display: 'flex', alignItems: 'cneter'}}>
                                <Grid container spacing={4} sx={{ py: 5 }}>
                                    {selectedQuestionData.answers.map((answer) => (
                                        <Grid item xs={selectedQuestionData.image ? 12 : 6} key={answer.id} >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {answer.image ? (
                                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    <Box
                                                        component="img"
                                                        src={answer.image}
                                                        alt="answer"
                                                        sx={{
                                                            maxWidth: '300px',
                                                            maxHeight: '80px',
                                                            objectFit: 'contain',
                                                            display: 'block',
                                                        }}
                                                        />
                                                        {answer.isCorrect ?
                                                            <CheckBoxIcon sx={{ color: '#06d00169' }} />
                                                            :
                                                            <DisabledByDefaultRoundedIcon sx={{ color: '#ff000045' }} />}
                                                    </Box>
                                                ) : (
                                                    <Button
                                                        disabled
                                                        sx={{
                                                            width: '75%',
                                                            backgroundColor: answer.isCorrect ? '#06d00169' : '#ff000045',
                                                            color: 'white !important'
                                                        }}
                                                    >
                                                        {answer.answer}
                                                    </Button>
                                                )}

                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
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