import {
    Box, Grid,
    IconButton,
    Modal,
    Typography, 
} from '@mui/material';
import { useState } from 'react';

// Icons
import CloseIcon from '@mui/icons-material/Close';

const ViewTest = ({ open, handleClose, selectedTest }) => {

    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isActive, setActive] = useState(false);
    const test = selectedTest;

    const handleQuestionClick = (index) => {
        setActiveQuestion((prevActiveQuestion) => {
            if (prevActiveQuestion === index) {
                setActive(false);
                return null;
            } else {
                setActive(true);
                return index;
            }
        });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="title"
            aria-describedby="description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 700,
                bgcolor: 'background.paper',
                border: '2px solid #1976d2',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                overflow: 'auto',
                maxHeight: '80vh',
            }}>
                {test && (
                    <>
                        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant='h5' fontWeight={700} color='text.primary'>
                                {test.title}
                            </Typography>
                            <IconButton aria-label="close" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            {test.section && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                                        Section:
                                    </Typography>
                                    <Typography variant='h6' fontWeight={500} color='text.secondary'>
                                        {test.section.name}
                                    </Typography>
                                </Box>
                            )}
                            {test.level && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                                        Niveau:
                                    </Typography>
                                    <Typography variant='h6' fontWeight={500} color='text.secondary'>
                                        {test.level.name}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 2 }}>
                            {test.questions && test.questions.map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 35,
                                        height: 35,
                                        bgcolor: activeQuestion === index ? 'primary.main' : 'grey.300',
                                        color: activeQuestion === index ? 'white' : 'text.primary',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                            color: 'white',
                                        },
                                    }}
                                    onClick={() => handleQuestionClick(index)}
                                >
                                    {index + 1}
                                </Box>
                            ))}
                        </Box>

                        {isActive && activeQuestion !== null && (
                            <Box sx={{ mt: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                                        Question:
                                    </Typography>
                                    <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                        {test.questions[activeQuestion].question}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                                        Type de Réponse:
                                    </Typography>
                                    <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                        {test.questions[activeQuestion].type}
                                    </Typography>
                                </Box>
                                <Box sx={{ mt: 5 }}>
                                    <Grid container spacing={2}>
                                        {test.questions[activeQuestion].answers.map((answer) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                key={answer.id}
                                                sx={{
                                                    bgcolor: answer.isCorrect ? '#c8e6c9' : '#ffcdd2',
                                                    mb: 2,
                                                    p: 2,
                                                    borderRadius: 2,
                                                    textAlign: 'center',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {answer.answer}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default ViewTest;
