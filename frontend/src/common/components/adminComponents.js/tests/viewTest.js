import {
    Box, Button, Grid,
    IconButton,
    Modal,
    Typography, 
} from '@mui/material';
import { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

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
                width: 1000,
                bgcolor: 'background.paper',
                border: '2px solid #1976d2',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                overflow: 'auto',
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

                        <Grid container spacing={4} sx={{ py: 3 }}>
                            <Grid item xs={4} pr={2}>
                                <Box sx={{ mb: 3 }}>
                                    {test.section && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                                                Section:
                                            </Typography>
                                            <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                                {test.section.name}
                                            </Typography>
                                        </Box>
                                    )}
                                    {test.level && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                                                Niveau:
                                            </Typography>
                                            <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                                {test.level.name}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 2 }}>
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
                                                borderRadius: 2,
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

                            </Grid>
                            <Grid item xs={8} borderLeft='1px solid' borderColor='grey.light'>
                                {isActive && activeQuestion !== null && (
                                    <Grid container spacing={4}>
                                        <Grid item xs={test.questions[activeQuestion].image ? 6 : 12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            {test.questions[activeQuestion].question &&
                                                <Typography fontWeight={500} textAlign='center'>
                                                    {test.questions[activeQuestion].question}
                                                </Typography>
                                            }
                                            {test.questions[activeQuestion].image &&
                                                <Box
                                                    component="img"
                                                    src={test.questions[activeQuestion].image}
                                                    alt={`question-${test.questions[activeQuestion].id}`}
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
                                        <Grid item xs={test.questions[activeQuestion].image ? 6 : 12} sx={{ display: 'flex', alignItems: 'cneter' }}>
                                            <Grid container spacing={4} sx={{ py: 5 }}>
                                                {test.questions[activeQuestion].answers.map((answer, index) => (
                                                    <Grid item xs={test.questions[activeQuestion].image ? 12 : 6} key={answer.id || index} >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            {answer.image ? (
                                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                                                    {answer.correct ?
                                                                        <CheckBoxIcon sx={{ color: '#06d00169' }} />
                                                                        :
                                                                        <DisabledByDefaultRoundedIcon sx={{ color: '#ff000045' }} />}
                                                                </Box>
                                                            ) : (
                                                                <Button
                                                                    disabled
                                                                    sx={{
                                                                        width: '75%',
                                                                        backgroundColor: answer.correct ? '#06d00169' : '#ff000045',
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
                                )}
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default ViewTest;
