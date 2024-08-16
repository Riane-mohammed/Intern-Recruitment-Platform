import React, { useState, Fragment, useEffect } from 'react';
import {
    Box, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Grid, Button, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { theme } from '../../../common/utils/theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getTestById } from '../../../common/api/admin';

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
                                    value={answer.answer}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={1}>
                                {isCheckbox ? (
                                    <Checkbox checked={answer.isCorrect} />
                                ) : (
                                    <Radio
                                        value={`answer-${index}`}
                                        inputProps={{ 'aria-label': `Réponse ${index + 1}` }}
                                        checked={answer.isCorrect}
                                    />
                                )}
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

const ModifyTest = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isActive, setActive] = useState(false);
    const [level, setLevel] = useState('beginner'); // Default to 'beginner'
    const [section, setSection] = useState('Technical'); // Default to 'Technical'
    const [answerType, setAnswerType] = useState('SINGLE_CHOICE'); // Default to 'SINGLE_CHOICE'
    const [numQuestions, setNumQuestions] = useState(0);

    useEffect(() => {
        const getTest = async () => {
            try {
                const testData = await getTestById(id);
                setTest(testData);
                setLevel(testData.level.name || 'beginner');
                setSection(testData.section.name || 'Technical');
                setNumQuestions(testData.questions.length || 0);
            } catch (error) {
                console.error("Failed to fetch test:", error);
            }
        };

        getTest();
    }, [id]);

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
                setAnswerType(test.questions[index].type || 'SINGLE_CHOICE');
                return index;
            }
        });
    };

    const handleAnswerTypeChange = (event) => {
        setAnswerType(event.target.value);
    };

    return (
        <Box>
            <Box
                sx={{
                    p: '15px 20px',
                    borderRadius: 5,
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    bgcolor: '#fff',
                    minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px) - 15px )`
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Link to='/admin/Tests'>
                        <IconButton aria-label="back">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <Button variant='contained' sx={{ mt: 2 }}>
                        Modifier le Test
                    </Button>
                </Box>
                {test && (
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
                                        <MenuItem value="Technique">Technique</MenuItem>
                                        <MenuItem value="Psychotechnique">Psychotechnique</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Niveau Buttons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography fontWeight={500} width={250}>Niveau</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="niveau-label"
                                name="niveau"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            >
                                <FormControlLabel value="Débutant" control={<Radio />} label="Débutant" />
                                <FormControlLabel value="Intermédiaire" control={<Radio />} label="Intermédiaire" />
                                <FormControlLabel value="Avancée" control={<Radio />} label="Avancée" />
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
                                                    sx={{ width: 300 }}
                                                    value={test.questions[activeQuestion].question}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Typography fontWeight={500} width={250}>Type de réponse</Typography>
                                                <FormControl sx={{ width: '50%' }}>
                                                    <InputLabel id="select-small">Type</InputLabel>
                                                    <Select
                                                        labelId="select-small"
                                                        id="select-small"
                                                        value={answerType}
                                                        label="Type"
                                                        onChange={handleAnswerTypeChange}
                                                        size="small"
                                                    >
                                                        <MenuItem value="SINGLE_CHOICE">Choix simple</MenuItem>
                                                        <MenuItem value="MULTIPLE_CHOICE">Choix multiple</MenuItem>
                                                        <MenuItem value="BOOLEAN">Oui/Non</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <RenderAnswers answerType={answerType} activeQuestion={activeQuestion} test={test} />
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ModifyTest;
