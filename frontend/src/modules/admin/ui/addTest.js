import React, { useState, Fragment } from 'react';
import {
    Box, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Grid, Button, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { theme } from '../../../common/utils/theme';

const SaveButton = () => (
    <Box
        sx={{
        display: 'flex',
        justifyContent: 'end',
        }}
    >
        <Button variant='contained' sx={{ mt: 2 }}>
        Sauvegarder la question
        </Button>
    </Box>
);

const RenderAnswers = ({ answerType, activeQuestion }) => {
    const renderOptions = (count, isCheckbox) => (
        <>
        <RadioGroup name={`question-${activeQuestion}`} aria-labelledby='choix-simple-label'>
            <Grid container spacing={4}>
            {Array.from({ length: count }, (_, index) => (
                <Fragment key={index}>
                <Grid item xs={5}>
                    <TextField
                    label={`Réponse ${index + 1}`}
                    sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={1}>
                    {isCheckbox ? <Checkbox /> : <Radio value={`answer-${index}`} inputProps={{ 'aria-label': `Réponse ${index + 1}` }} />}
                </Grid>
                </Fragment>
            ))}
            </Grid>
        </RadioGroup>
        <SaveButton />
        </>
    );

    switch (answerType) {
        case 'multi-choix':
        return renderOptions(4, true);
        case 'choix-simple':
        return renderOptions(4, false);
        case 'boolean':
        return renderOptions(2, false);
        default:
        return null;
    }
};

const AddTest = () => {
    const [numQuestions, setNumQuestions] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isActive, setActive] = useState(false);
    const [answerType, setAnswerType] = useState('');
    const [section, setSection] = useState('');

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
                    <Link to='/admin/Tests'>
                        <IconButton aria-label="back">
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <Button variant='contained' sx={{ mt: 2 }}>
                        Ajouter le Test
                    </Button>
                </Box>
                <Box sx={{ mt: 2, px: 5 }}>
                    {/* Nom */}
                    <Grid container spacing={4} sx={{ mb: 2 }}>
                        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography fontWeight={500} width={250}>Nom</Typography>
                            <TextField id="nom" variant="outlined" size="small" />
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
                        <RadioGroup row aria-labelledby="niveau-label" name="niveau">
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
                                            <TextField id="text" multiline rows={1} variant="outlined" size="small" sx={{ width: '100%' }} />
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
                                                <FormControlLabel value="multi-choix" control={<Radio />} label="Choix Multiple" />
                                                <FormControlLabel value="choix-simple" control={<Radio />} label="Choix Simple" />
                                                <FormControlLabel value="boolean" control={<Radio />} label="Boolean" />
                                            </RadioGroup>
                                        </Box>
                                    </Box>
                                </Box>
                                <RenderAnswers answerType={answerType} activeQuestion={activeQuestion} />
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddTest;
