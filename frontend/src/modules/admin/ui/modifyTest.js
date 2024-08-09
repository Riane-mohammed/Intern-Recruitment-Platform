import React, { useState, Fragment } from 'react';
import {
    Box, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Grid, Button, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { theme } from '../../../common/utils/theme';

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

const SaveButton = () => (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant='contained' sx={{ mt: 2 }}>
            Sauvegarder la question
        </Button>
    </Box>
);

const RenderAnswers = ({ answerType, activeQuestion, test }) => {
    const question = test.questions[activeQuestion];

    const renderOptions = (count, isCheckbox) => (
        <>
            <RadioGroup name={`question-${activeQuestion}`} aria-labelledby='choix-simple-label'>
                <Grid container spacing={4}>
                    {question.answers.map((answer, index) => (
                        <Fragment key={index}>
                            <Grid item xs={5}>
                                <TextField
                                    label={`Réponse ${index + 1}`}
                                    sx={{ width: '100%' }}
                                    value={answer.answerText}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                {isCheckbox ? <Checkbox checked={answer.isCorrect} /> : <Radio value={`answer-${index}`} inputProps={{ 'aria-label': `Réponse ${index + 1}` }} checked={answer.isCorrect} />}
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </RadioGroup>
            <SaveButton />
        </>
    );

    switch (answerType) {
        case 'MULTIPLE_CHOICE':
            return renderOptions(question.answers.length, true);
        case 'SINGLE_CHOICE':
            return renderOptions(question.answers.length, false);
        case 'BOOLEAN':
            return renderOptions(2, false);
        default:
            return null;
    }
};

const AddTest = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isActive, setActive] = useState(false);
    const [section, setSection] = useState(Testt.section);
    const test = Testt;
    const [answerType, setAnswerType] = useState('');
    const [numQuestions, setNumQuestions] = useState(test.questions.length || 0);

    const handleNumQuestionsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setNumQuestions(isNaN(value) ? 0 : value);
        setActive(false);
        setActiveQuestion(null);
    };

    const handleQuestionClick = (index) => {
        setActiveQuestion((prevActiveQuestion) => {
            if (prevActiveQuestion === index) {
                setActive(false);
                return null;
            } else {
                setActive(true);
                setAnswerType(test.questions[index].answerType);
                return index;
            }
        });
    };

    const handleAnswerTypeChange = (event) => {
        setAnswerType(event.target.value);
    };

    return (
        <Box>
            <Box sx={{ p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff', minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px) - 15px )` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Link to='/Tests'>
                        <IconButton aria-label="back">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <Button variant='contained' sx={{ mt: 2 }}>
                        Modifier le Test
                    </Button>
                </Box>
                {test &&
                    <Box sx={{ mt: 2, px: 5 }}>
                        {/* Nom */}
                        <Grid container spacing={4} sx={{ mb: 2 }}>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography fontWeight={500} width={250}>Nom</Typography>
                                <TextField id="nom" variant="outlined" size="small" value={test.title} />
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography fontWeight={500} width={200}>Section</Typography>
                                <FormControl size="small" sx={{ width: '60%' }}>
                                    <InputLabel id="section-select-small-label">Section</InputLabel>
                                    <Select
                                        labelId="section-select-label"
                                        id="section-select"
                                        label="Section"
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Aucun</em>
                                        </MenuItem>
                                        <MenuItem value="Technical">Technique</MenuItem>
                                        <MenuItem value="Psychotechnique">Psychotechnique</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Niveau Buttons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography fontWeight={500} width={250}>Niveau</Typography>
                            <RadioGroup row aria-labelledby="niveau-label" name="niveau" value={test.level}>
                                <FormControlLabel value="beginner" control={<Radio />} label="Débutant" />
                                <FormControlLabel value="intermediate" control={<Radio />} label="Intermédiaire" />
                                <FormControlLabel value="advanced" control={<Radio />} label="Avancée" />
                            </RadioGroup>
                        </Box>

                        {/* Nombre of questions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography fontWeight={500} width={250}>Nombres des questions</Typography>
                            <TextField
                                id="nbrQst"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0 }}
                                size="small"
                                value={numQuestions}
                                onChange={handleNumQuestionsChange}
                            />
                        </Box>

                        {/* Questions */}
                        <Typography fontWeight={500} width={250}>Questions</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 1, my: 2 }}>
                            {Array.from({ length: numQuestions }, (_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        bgcolor: activeQuestion === index ? 'primary.main' : 'secondary.main',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleQuestionClick(index)}
                                >
                                    {index + 1}
                                </Box>
                            ))}
                        </Box>

                        {/* Answers */}
                        <Box>
                            {isActive && (
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Typography fontWeight={500} width={250}>Texte</Typography>
                                                <TextField
                                                    id="text"
                                                    multiline
                                                    rows={1}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ width: '100%' }}
                                                    value={test.questions[activeQuestion].questionText}
                                                />
                                            </Box>
                                            {/* Type Buttons */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Typography fontWeight={500} width={200}>Type des Réponses</Typography>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="answer-type-label"
                                                    name="answer-type"
                                                    value={answerType}
                                                    onChange={handleAnswerTypeChange}
                                                >
                                                    <FormControlLabel value="MULTIPLE_CHOICE" control={<Radio />} label="Choix Multiple" />
                                                    <FormControlLabel value="SINGLE_CHOICE" control={<Radio />} label="Choix Simple" />
                                                    <FormControlLabel value="BOOLEAN" control={<Radio />} label="Boolean" />
                                                </RadioGroup>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <RenderAnswers answerType={answerType} activeQuestion={activeQuestion} test={test} />
                                </>
                            )}
                        </Box>
                    </Box>}
            </Box>
        </Box>
    );
};

export default AddTest;
