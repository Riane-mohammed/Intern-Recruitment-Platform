import React, { useState, Fragment, useEffect, useRef } from 'react';
import {
    Box, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Grid, Button, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { theme } from '../../../common/utils/theme';

//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//componenets
import EditQuestionModal from '../../../common/components/adminComponents.js/tests/EditQuestionModal';

//api
import { getAllLevels, getAllSections } from '../../../common/api/admin';

const RenderAnswers = ({ answerType, activeQuestion, handleAnswerChange, newTest, contentType }) => {
    const renderOptions = (count, isCheckbox) => (
        <RadioGroup name={`question-${activeQuestion}`} aria-labelledby={`choix-label-${activeQuestion}`}>
            <Grid container spacing={4}>
                {Array.from({ length: count }, (_, index) => (
                    <Fragment key={index}>
                        <Grid item xs={5}>
                            {contentType === 'image' ? (
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id={`file-upload-${activeQuestion}-${index}`}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleAnswerChange(e, activeQuestion, index, false, 'image')}
                                    />
                                    <label htmlFor={`file-upload-${activeQuestion}-${index}`}>
                                        <IconButton
                                            variant="contained"
                                            component="span"
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                },
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            <CloudUploadIcon />
                                        </IconButton>
                                    </label>
                                    {newTest.questions[activeQuestion]?.answers[index]?.image && (
                                        <Typography
                                            variant="body2"
                                            sx={{ ml: 1, color: 'text.secondary' }}
                                        >
                                            {newTest.questions[activeQuestion]?.answers[index]?.image.split('/').pop()}
                                        </Typography>
                                    )}
                                </Box>
                            ) : (
                                <TextField
                                    label={`Réponse ${index + 1}`}
                                    id={`answer-text-${activeQuestion}-${index}`} // Unique ID
                                    sx={{ width: '100%' }}
                                    value={newTest.questions[activeQuestion]?.answers[index]?.text || ''}
                                    onChange={(e) => handleAnswerChange(e, activeQuestion, index, false, 'text')}
                                />
                            )}
                        </Grid>
                        <Grid item xs={1}>
                            {isCheckbox ? (
                                <Checkbox
                                    id={`checkbox-${activeQuestion}-${index}`} // Unique ID
                                    checked={newTest.questions[activeQuestion]?.answers[index]?.correct || false}
                                    onChange={(e) => handleAnswerChange(e, activeQuestion, index, true)}
                                />
                            ) : (
                                <Radio
                                    id={`radio-${activeQuestion}-${index}`} // Unique ID
                                    value={`answer-${index}`}
                                    inputProps={{ 'aria-label': `Réponse ${index + 1}` }}
                                    checked={newTest.questions[activeQuestion]?.answers[index]?.correct || false}
                                    onChange={(e) => handleAnswerChange(e, activeQuestion, index, true)}
                                />
                            )}
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
        </RadioGroup>
    );

    switch (answerType) {
        case 'MULTIPLE_CHOICE':
            return renderOptions(4, true);
        case 'SINGLE_CHOICE':
            return renderOptions(4, false);
        case 'BOOLEAN':
            return renderOptions(2, false);
        default:
            return null;
    }
};


const AddTest = () => {
    const [sections, setSections] = useState([]);
    const [levels, setLevels] = useState([]);
    const [newTest, setNewTest] = useState({
        name: '',
        section: '',
        level: '',
        questions: [],
    });
    const [numQuestions, setNumQuestions] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isActive, setActive] = useState(false);
    const [answerType, setAnswerType] = useState('');
    const [contentType, setContentType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentText, setCurrentText] = useState('');


    // Ref for file input
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getSections = async () => {
            try {
                const SectionsData = await getAllSections();
                setSections(SectionsData);
            } catch (error) {
                console.error("Failed to fetch Sections:", error);
            }
        };

        getSections();
    }, []);

    useEffect(() => {
        const getLevels = async () => {
            try {
                const LevelsData = await getAllLevels();
                setLevels(LevelsData);
            } catch (error) {
                console.error("Failed to fetch Levels:", error);
            }
        };

        getLevels();
    }, []);

    const handleNumQuestionsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setNumQuestions(isNaN(value) ? 0 : value);
        setActive(false);
        setActiveQuestion(null);
        setNewTest((prevTest) => ({
            ...prevTest,
            questions: Array.from({ length: value }, (_, index) => ({
                text: '',
                image: '',
                type: '',
                point: 0,
                contentType: '',
                answers: [],
            })),
        }));
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
        setAnswerType(newTest.questions[index].type || '');
        // Reset file input when changing questions
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAnswerTypeChange = (event) => {
        const value = event.target.value;
        setAnswerType(value);
        setNewTest((prevTest) => {
            const updatedQuestions = [...prevTest.questions];
            updatedQuestions[activeQuestion].type = value;
            return { ...prevTest, questions: updatedQuestions };
        });
    };

    const handleAnswerChange = (e, questionIndex, answerIndex, isCorrectField = false, contentType = 'text') => {
        const { value, checked, files } = e.target;
        setNewTest((prevTest) => {
            const updatedQuestions = [...prevTest.questions];
            const updatedAnswers = [...updatedQuestions[questionIndex].answers];
            if (!updatedAnswers[answerIndex]) {
                updatedAnswers[answerIndex] = { text: '', image: '', correct: false };
            }
            if (isCorrectField) {
                updatedAnswers[answerIndex].correct = checked;
            } else {
                if (contentType === 'text') {
                    updatedAnswers[answerIndex].text = value;
                } else if (contentType === 'image' && files.length > 0) {
                    const file = files[0];
                    const imagePath = `/assets/answers/${file.name}`;
                    updatedAnswers[answerIndex].image = imagePath;
                }
            }
            updatedQuestions[questionIndex].answers = updatedAnswers;
            return { ...prevTest, questions: updatedQuestions };
        });
    };


    const handleFileChange = (e, questionIndex) => {
        const file = e.target.files[0];
        if (file) {
            const imagePath = `/assets/questions/${file.name}`;
            setNewTest((prevTest) => {
                const updatedQuestions = [...prevTest.questions];
                updatedQuestions[questionIndex].image = imagePath; // Store filename or path
                return { ...prevTest, questions: updatedQuestions };
            });
        }
    };

    const handleContentTypeChange = (event) => {
        const value = event.target.value;
        setContentType(value);
        setNewTest((prevTest) => {
            const updatedQuestions = [...prevTest.questions];
            updatedQuestions[activeQuestion].contentType = value;
            return { ...prevTest, questions: updatedQuestions };
        });
    };

    const handleAdd = () => {
        console.log(newTest);
    };

    const openModal = () => {
        setCurrentText(newTest.questions[activeQuestion]?.text || '');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setNewTest((prevTest) => {
            const updatedQuestions = [...prevTest.questions];
            updatedQuestions[activeQuestion].text = currentText;
            return { ...prevTest, questions: updatedQuestions };
        });
    };

    const handleQuestionTextChange = (e) => {
        setCurrentText(e.target.value);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
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
                    <Button variant='contained' sx={{ mt: 2 }} onClick={handleAdd}>
                        Ajouter le Test
                    </Button>
                </Box>
                <Box sx={{ mt: 2, px: 5 }}>
                    {/* Nom */}
                    <Grid container spacing={4} sx={{ mb: 2 }}>
                        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography fontWeight={500} width={250}>Nom</Typography>
                            <TextField
                                id="nom"
                                variant="outlined"
                                size="small"
                                onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography fontWeight={500} width={200}>Section</Typography>
                            <FormControl size="small" sx={{ width: '60%' }}>
                                <InputLabel id="section-select-small-label">Section</InputLabel>
                                <Select
                                    labelId="section-select-label"
                                    id="section-select"
                                    label="Section"
                                    value={newTest.section}
                                    onChange={(e) => setNewTest({ ...newTest, section: e.target.value })}
                                >
                                    <MenuItem value="">
                                        <em>Aucun</em>
                                    </MenuItem>
                                    {sections.map((section) => (
                                        <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
                                    ))}
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
                            name="Niveau"
                            onChange={(e) => setNewTest({ ...newTest, level: e.target.value })}
                        >
                            {levels.map((level) => (
                                <FormControlLabel key={level.id} value={level.id} control={<Radio />} label={level.name} />
                            ))}
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
                                        {/* Question Text */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pt: 2 }}>
                                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', pt: '0 !important' }}>
                                                    <Typography fontWeight={500} width={250}>Texte</Typography>
                                                    <TextField
                                                        id={`question-text-${activeQuestion}`} 
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{ width: '100%', cursor: 'pointer' }}
                                                        value={truncateText(newTest.questions[activeQuestion]?.text || '', 20)}
                                                        onClick={openModal}
                                                        readOnly
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sx={{ pt: '0 !important' }}>
                                                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: newTest.questions[activeQuestion].image ? 'end' : 'start' }}>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="file-upload"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, activeQuestion)}
                                                        />
                                                        <label htmlFor="file-upload">
                                                            <IconButton
                                                                variant="contained"
                                                                component="span"
                                                                sx={{
                                                                    backgroundColor: 'primary.main',
                                                                    color: 'white',
                                                                    '&:hover': {
                                                                        backgroundColor: 'primary.dark',
                                                                    },
                                                                    padding: '5px 10px',
                                                                    borderRadius: '4px',
                                                                }}
                                                            >
                                                                <CloudUploadIcon />
                                                            </IconButton>
                                                        </label>
                                                        {newTest.questions[activeQuestion]?.image && (
                                                            <Typography
                                                                variant="body2"
                                                                sx={{ ml: 1, color: 'text.secondary' }}
                                                            >
                                                                {newTest.questions[activeQuestion].image.split('/').pop()} {/* Display filename */}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        </Box>

                                        <Box>
                                            <Grid container spacing={2}>
                                                {/* Point Input */}
                                                <Grid item xs={2}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Typography fontWeight={500} width={150}>Point</Typography>
                                                        <TextField
                                                            id={`point-${activeQuestion}`}
                                                            variant="outlined"
                                                            size="small"
                                                            type="number"
                                                            sx={{ width: '100%' }}
                                                            value={newTest.questions[activeQuestion]?.point || 0}
                                                            onChange={(e) =>
                                                                setNewTest((prevTest) => {
                                                                    const updatedQuestions = [...prevTest.questions];
                                                                    updatedQuestions[activeQuestion].point = parseInt(e.target.value, 10);
                                                                    return { ...prevTest, questions: updatedQuestions };
                                                                })
                                                            }
                                                        />
                                                    </Box>
                                                </Grid>

                                                {/* Type Buttons */}
                                                <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
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
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Answer content : text or image */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography fontWeight={500} width={200}>Contenu des Réponses :</Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby="answer-content-label"
                                        name="answer-content"
                                        value={newTest.questions[activeQuestion]?.contentType || contentType}
                                        onChange={handleContentTypeChange}
                                    >
                                        <FormControlLabel value="image" control={<Radio />} label="Image" />
                                        <FormControlLabel value="text" control={<Radio />} label="Text" />
                                    </RadioGroup>
                                </Box>

                                {/* Pass contentType as a key to force re-render */}
                                {contentType && answerType && (
                                    <RenderAnswers
                                        key={`${contentType}-${answerType}`} 
                                        answerType={answerType}
                                        activeQuestion={activeQuestion}
                                        handleAnswerChange={handleAnswerChange}
                                        newTest={newTest}
                                        contentType={newTest.questions[activeQuestion]?.contentType || contentType}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
            {/* Modal */}
            <EditQuestionModal
                open={modalOpen}
                handleClose={closeModal}
                questionText={currentText}
                handleQuestionTextChange={handleQuestionTextChange}
            />
        </Box>
    );
};

export default AddTest;
