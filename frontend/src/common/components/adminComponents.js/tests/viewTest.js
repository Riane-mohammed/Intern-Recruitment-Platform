import {
    Box, Grid,
    IconButton,
    Modal,
    Typography, 
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Testt = {
    "id": "1",
    "title": "Science",
    "section": "Technical",
    "level": "beginner",
    "questions": [
        {
            "id": "q1",
            "questionText": "What is the boiling point of water?",
            "image": null,
            "answerType": "SINGLE_CHOICE",
            "answers": [
                {
                    "id": "a1",
                    "answerText": "100°C",
                    "isCorrect": true
                },
                {
                    "id": "a2",
                    "answerText": "90°C",
                    "isCorrect": false
                },
                {
                    "id": "a3",
                    "answerText": "110°C",
                    "isCorrect": false
                },
                {
                    "id": "a4",
                    "answerText": "120°C",
                    "isCorrect": false
                }
            ]
        },
        {
            "id": "q2",
            "questionText": "Which of the following are planets in our solar system?",
            "image": null,
            "answerType": "MULTIPLE_CHOICE",
            "answers": [
                {
                    "id": "a5",
                    "answerText": "Earth",
                    "isCorrect": true
                },
                {
                    "id": "a6",
                    "answerText": "Mars",
                    "isCorrect": true
                },
                {
                    "id": "a7",
                    "answerText": "Pluto",
                    "isCorrect": true
                },
                {
                    "id": "a8",
                    "answerText": "Moon",
                    "isCorrect": false
                }
            ]
        },
        {
            "id": "q3",
            "questionText": "The Earth is flat.",
            "image": null,
            "answerType": "BOOLEAN",
            "answers": [
                {
                    "id": "a9",
                    "answerText": "Vraie",
                    "isCorrect": false
                },
                {
                    "id": "a10",
                    "answerText": "Faux",
                    "isCorrect": true
                }
            ]
        },
        {
            "id": "q4",
            "questionText": "Which element has the chemical symbol 'O'?",
            "image": null,
            "answerType": "SINGLE_CHOICE",
            "answers": [
                {
                    "id": "a11",
                    "answerText": "Oxygen",
                    "isCorrect": true
                },
                {
                    "id": "a12",
                    "answerText": "Gold",
                    "isCorrect": false
                },
                {
                    "id": "a13",
                    "answerText": "Silver",
                    "isCorrect": false
                },
                {
                    "id": "a14",
                    "answerText": "Osmium",
                    "isCorrect": false
                }
            ]
        },
        {
            "id": "q5",
            "questionText": "Which of the following are types of energy?",
            "image": null,
            "answerType": "MULTIPLE_CHOICE",
            "answers": [
                {
                    "id": "a15",
                    "answerText": "Kinetic",
                    "isCorrect": true
                },
                {
                    "id": "a16",
                    "answerText": "Potential",
                    "isCorrect": true
                },
                {
                    "id": "a17",
                    "answerText": "Thermal",
                    "isCorrect": true
                },
                {
                    "id": "a18",
                    "answerText": "Elastic",
                    "isCorrect": false
                }
            ]
        },
        {
            "id": "q6",
            "questionText": "Sound travels faster in water than in air.",
            "image": null,
            "answerType": "BOOLEAN",
            "answers": [
                {
                    "id": "a19",
                    "answerText": "Vraie",
                    "isCorrect": true
                },
                {
                    "id": "a20",
                    "answerText": "Faux",
                    "isCorrect": false
                }
            ]
        },
        {
            "id": "q7",
            "questionText": "What is the main gas found in the air we breathe?",
            "image": null,
            "answerType": "SINGLE_CHOICE",
            "answers": [
                {
                    "id": "a21",
                    "answerText": "Nitrogen",
                    "isCorrect": true
                },
                {
                    "id": "a22",
                    "answerText": "Oxygen",
                    "isCorrect": false
                },
                {
                    "id": "a23",
                    "answerText": "Carbon Dioxide",
                    "isCorrect": false
                },
                {
                    "id": "a24",
                    "answerText": "Hydrogen",
                    "isCorrect": false
                }
            ]
        },
        {
            "id": "q8",
            "questionText": "Which of the following are states of matter?",
            "image": null,
            "answerType": "MULTIPLE_CHOICE",
            "answers": [
                {
                    "id": "a25",
                    "answerText": "Solid",
                    "isCorrect": true
                },
                {
                    "id": "a26",
                    "answerText": "Liquid",
                    "isCorrect": true
                },
                {
                    "id": "a27",
                    "answerText": "Gas",
                    "isCorrect": true
                },
                {
                    "id": "a28",
                    "answerText": "Plasma",
                    "isCorrect": true
                }
            ]
        },
        {
            "id": "q9",
            "questionText": "Which planet is known as the Red Planet?",
            "image": null,
            "answerType": "SINGLE_CHOICE",
            "answers": [
                {
                    "id": "a29",
                    "answerText": "Mars",
                    "isCorrect": true
                },
                {
                    "id": "a30",
                    "answerText": "Jupiter",
                    "isCorrect": false
                },
                {
                    "id": "a31",
                    "answerText": "Saturn",
                    "isCorrect": false
                },
                {
                    "id": "a32",
                    "answerText": "Venus",
                    "isCorrect": false
                }
            ]
        },
        {
            "id": "q10",
            "questionText": "Is photosynthesis a process used by plants to convert sunlight into food?",
            "image": null,
            "answerType": "BOOLEAN",
            "answers": [
                {
                    "id": "a33",
                    "answerText": "Vraie",
                    "isCorrect": true
                },
                {
                    "id": "a34",
                    "answerText": "Faux",
                    "isCorrect": false
                }
            ]
        }
    ]
};

const ViewTest = ({ open, handleClose }) => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isActive, setActive] = useState(false);
    const test = Testt;

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
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h5' fontWeight={700} color='text.primary' >
                        {test.title}
                    </Typography>
                    <IconButton aria-label="close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                            Section:
                        </Typography>
                        <Typography variant='h6' fontWeight={500} color='text.secondary'>
                            {test.section}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                            Niveau:
                        </Typography>
                        <Typography variant='h6' fontWeight={500} color='text.secondary'>
                            {test.level}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 2 }}>
                    {test.questions.map((_, index) => (
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                            Question:
                        </Typography>
                        <Typography variant='body1' fontWeight={500} color='text.secondary'>
                            {test.questions[activeQuestion].questionText}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body1' fontWeight={500} color='primary' width={200}>
                            Type de Réponse:
                        </Typography>
                        <Typography variant='body1' fontWeight={500} color='text.secondary'>
                            {test.questions[activeQuestion].answerType}
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
                                    {answer.answerText}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default ViewTest;
