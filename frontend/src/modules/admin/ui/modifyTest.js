import React, { useState, Fragment, useEffect, useRef } from 'react';
import {
    Box, IconButton, Typography, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Grid, Button, Select, MenuItem, InputLabel, FormControl,
    Snackbar,
    Alert,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { theme } from '../../../common/utils/theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addOrUpdateTest, deleteImage, getAllLevels, getAllSections, getTestById, uploadAnswerImage, uploadQuestionImage } from '../../../common/api/admin';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import EditQuestionModal from '../../../common/components/adminComponents.js/tests/EditQuestionModal';
import { extractFilePath, truncateText } from '../../../common/utils/helpers';
import AddQuestion from '../../../common/components/adminComponents.js/tests/addQuestion';
import DataByIdNotFound from '../../../common/errorPages/dataByIdNotFound';
import LoadingOverlay from '../../../common/components/loadingOverlay';
import DeleteIcon from '@mui/icons-material/Delete';

const RenderAnswers = ({ answerType, activeQuestion, handleAnswerChange, updatedTest, contentType, localImages, handleDeleteImage }) => {
    const question = updatedTest.questions[activeQuestion];

    const renderOptions = (count, isCheckbox) => {
        return (
            <RadioGroup name={`question-${activeQuestion}`} aria-labelledby={`choix-label-${activeQuestion}`}>
                <Grid container spacing={4}>
                    {Array.from({ length: count }, (_, index) => (
                        <Fragment key={index}>
                            <Grid item xs={5}>
                                {contentType[activeQuestion] === 'image' ? (
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
                                        
                                        {(localImages[index] || question?.answers[index]?.image) && (
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ ml: 1, color: 'text.secondary' }}
                                                >
                                                    {(localImages[index] || question?.answers[index]?.image).split('/').pop()}
                                                </Typography>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteImage(activeQuestion, index)}
                                                    sx={{
                                                        color: 'error.main',
                                                        ml: 2
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </Box>
                                ) : (
                                    <TextField
                                        label={`Réponse ${index + 1}`}
                                        id={`answer-text-${activeQuestion}-${index}`} // Unique ID
                                        sx={{ width: '100%' }}
                                        value={question?.answers[index]?.answer || ''} // Ensure value is defined
                                        onChange={(e) => handleAnswerChange(e, activeQuestion, index, false, 'text')}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={1}>
                                {isCheckbox ? (
                                    <Checkbox
                                        id={`checkbox-${activeQuestion}-${index}`} // Unique ID
                                        checked={question?.answers[index]?.correct || false} // Default to false if undefined
                                        onChange={(e) => handleAnswerChange(e, activeQuestion, index, true)}
                                    />
                                ) : (
                                    <Radio
                                        id={`radio-${activeQuestion}-${index}`} // Unique ID
                                        value={`answer-${index}`}
                                        inputProps={{ 'aria-label': `Réponse ${index + 1}` }}
                                        checked={question?.answers[index]?.correct || false}
                                        onChange={(e) => handleAnswerChange(e, activeQuestion, index, true)}
                                    />
                                )}
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </RadioGroup>
        );
    };

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




const ModifyTest = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isActive, setActive] = useState(false);
    const [answerType, setAnswerType] = useState('SINGLE_CHOICE');
    const [numQuestions, setNumQuestions] = useState(0);
    const [openAddModal, setOpenAddModal] = useState(false);

    const [updatedTest, setUpdatedTest] = useState({});

    const [localImages, setLocalImages] = useState({});
    const [sections, setSections] = useState([]);
    const [levels, setLevels] = useState([]);
    const [contentType, setContentType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleOpenAddModal = (row) => {
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => setOpenAddModal(false);

    const fetchTest = async (testId) => {
        try {
            setIsLoading(true);
            const testData = await getTestById(testId);
            setTest(testData);
            setNumQuestions(testData.questions.length || 0);

            setContentType(
                testData.questions.map((question) =>
                    question.answers[0]?.answer !== "" ? 'text' : 'image'
                )
            );

            setUpdatedTest((prev) => ({
                ...prev,
                id: testData.id,
                title: testData.title,
                sectionId: testData.section.id,
                levelId: testData.level.id,
                questions: testData.questions.map((question) => ({
                    question: question.question,
                    image: question.image,
                    type: question.type,
                    point: question.point,
                    answers: question.answers.map((answer) => ({
                        answer: answer.answer,
                        image: answer.image,
                        correct: answer.correct,
                    })),
                })),
            }));
        } catch (error) {
            console.error("Failed to fetch test:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Call fetchTest on component mount
    useEffect(() => {
        if (id) {
            fetchTest(id);
        }
    }, [id]);

    // You can now call fetchTest wherever you need
    const handleRefresh = () => {
        if (id) {
            fetchTest(id);
        }
    };

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
        setAnswerType(test.questions[index].type || '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAnswerTypeChange = (event) => {
        const value = event.target.value;
        setAnswerType(value);

        setUpdatedTest((prevTest) => {
            const updatedQuestions = [...prevTest.questions];
            const updatedAnswers = updatedQuestions[activeQuestion].answers.map((answer) => ({
                ...answer,
                answer: "",
                image: "",
                correct: false
            }));

            updatedQuestions[activeQuestion] = {
                ...updatedQuestions[activeQuestion],
                type: value,
                answers: updatedAnswers
            };

            return { ...prevTest, questions: updatedQuestions };
        });
    };

    const handleAnswerChange = async (e, questionIndex, answerIndex, isCorrectField = false, contentType = 'text') => {
        const { value, checked, files } = e.target;

        setUpdatedTest((prevTest) => {
            // Create a copy of the current questions and answers
            const updatedQuestions = [...prevTest.questions];
            const updatedAnswers = [...(updatedQuestions[questionIndex]?.answers || [])];

            // Ensure that the answer object exists
            if (!updatedAnswers[answerIndex]) {
                updatedAnswers[answerIndex] = { answer: '', image: '', correct: false };
            }

            // Handle image file upload
            if (contentType === 'image' && files?.length > 0) {
                (async () => {
                    try {
                        const file = files[0];
                        const tempImages = { ...localImages };
                        tempImages[answerIndex] = file.name;
                        setLocalImages(tempImages);

                        // Delete old image if it exists
                        if (updatedAnswers[answerIndex].image) {
                            await deleteImg(extractFilePath(updatedAnswers[answerIndex].image));
                        }

                        // Upload new image and update path
                        const path = await uploadAnswerImg(file);
                        updatedAnswers[answerIndex].image = path;
                    } catch (error) {
                        console.error("Error uploading answer image:", error);
                    }
                })();
            }

            // Update answer or correct status
            if (isCorrectField) {
                if (answerType === 'MULTIPLE_CHOICE') {
                    // Handle `Checkbox` - allow multiple selections
                    updatedAnswers[answerIndex].correct = checked;
                } else {
                    // Handle `Radio` - only one can be selected
                    updatedAnswers.forEach((answer, idx) => {
                        if (idx === answerIndex) {
                            answer.correct = checked;
                        } else {
                            answer.correct = false; // Uncheck others
                        }
                    });
                }
            } else {
                if (contentType === 'text') {
                    updatedAnswers[answerIndex].answer = value;
                }
            }

            // Update the questions array
            updatedQuestions[questionIndex].answers = updatedAnswers;
            return { ...prevTest, questions: updatedQuestions };
        });
    };

    const handleQstImgChange = async (e, questionIndex) => {
        const file = e.target.files[0];
        if (file) {
            try {
                if (test.questions[questionIndex].image) {
                    await deleteImg(extractFilePath(test.questions[questionIndex].image));
                }

                const imagePath = await uploadQstImg(file);
                setUpdatedTest((prevTest) => {
                    const updatedQuestions = [...prevTest.questions];
                    updatedQuestions[questionIndex].image = imagePath;
                    return { ...prevTest, questions: updatedQuestions };
                });

            } catch (error) {
                console.error("Error handling question image:", error);
            }
        }
    };

    const deleteImg = async (path) => {
        try {
            const formData = new FormData();
            formData.append('path', path);

            const result = await deleteImage(formData);
            return result;
        } catch (error) {
            console.error('Error deleting image:', error);
        };
    }

    const uploadQstImg = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await uploadQuestionImage(formData);
        return `http://localhost:8080${response.path}`;
    }

    const uploadAnswerImg = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await uploadAnswerImage(formData);

        if (response && response.path) {
            return `http://localhost:8080${response.path}`;
        } else {
            throw new Error("Path not found in response");
        }
    };

    const handleContentTypeChange = (event, indx) => {
        const value = event.target.value;
        setContentType((prev) =>
            prev.map((item, index) => index === indx ? value : item)
        );
    };


    const handleModify = async () => {
        try {
            setIsLoading(true);
            console.log(updatedTest);
            await addOrUpdateTest(updatedTest);
            setError('');
            setSuccess('Test Modifié avec succès!');
            handleRefresh();
        } catch (error) {
            console.error("Error updating Test:", error);
            setError('Erreur lors de la modification du test.');
        } finally {
            setIsLoading(false);
        }

    };

    const openModal = () => {
        setCurrentText(test.questions[activeQuestion]?.question || '');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setUpdatedTest((prevTest) => {
            const updatedQuestions = [...prevTest.questions];
            updatedQuestions[activeQuestion].question = currentText;
            return { ...prevTest, questions: updatedQuestions };
        });
    };

    const handleQuestionTextChange = (e) => {
        setCurrentText(e.target.value);
    };

    const handleSave = async () => {
        try {
            handleRefresh()
        } catch (error) {
            console.error("Failed to delete Questions:", error);
        }
    }

    const handleDeleteImage = async (questionIndex, answerIndex) => {
        try {
            const question = updatedTest.questions[questionIndex];
            const imagePath = question.answers[answerIndex]?.image;

            if (imagePath) {
                await deleteImg(extractFilePath(imagePath));
            }

            setUpdatedTest((prevTest) => {
                const updatedQuestions = [...prevTest.questions];
                const updatedAnswers = [...updatedQuestions[questionIndex].answers];

                updatedAnswers[answerIndex].image = '';
                updatedQuestions[questionIndex].answers = updatedAnswers;

                return { ...prevTest, questions: updatedQuestions };
            });

            setLocalImages((prevImages) => {
                const updatedImages = { ...prevImages };
                delete updatedImages[answerIndex];
                return updatedImages;
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };


    if (!test && !isLoading) return <DataByIdNotFound name='Test' />;

    return (
        <>
            {/* Loading Overlay */}
            <LoadingOverlay isLoading={isLoading} />

            <Box>
                <Box sx={{ p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff', minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px) - 15px )` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Link to='/admin/Tests'>
                            <IconButton aria-label="back">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Button variant='contained' sx={{ mt: 2 }} onClick={handleModify}>
                            Modifier le Test
                        </Button>
                    </Box>
                    {test &&
                        <Box sx={{ mt: 2, px: 5 }}>
                            {/* Nom */}
                            <Grid container spacing={4} sx={{ mb: 2 }}>
                                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography fontWeight={500} width={250}>Nom</Typography>
                                    <TextField
                                        id="nom"
                                        variant="outlined"
                                        size="small"
                                        value={updatedTest.title || ''}
                                        onChange={(e) => setUpdatedTest({ ...updatedTest, title: e.target.value })}
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
                                            value={updatedTest.sectionId || test.section.id}
                                            onChange={(e) => setUpdatedTest({ ...updatedTest, sectionId: e.target.value })}
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
                                    value={updatedTest.levelId || test.level.id}
                                    onChange={(e) => setUpdatedTest({ ...updatedTest, levelId: parseInt(e.target.value) })}
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
                                    disabled
                                    variant="outlined"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    size="small"
                                    value={numQuestions}
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
                                {/* add question button */}

                                <IconButton aria-label="delete" onClick={handleOpenAddModal}>
                                    <AddIcon />
                                </IconButton>
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
                                                                value={truncateText(updatedTest.questions[activeQuestion]?.question, 20)}
                                                                onClick={openModal}
                                                                readOnly
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ pt: '0 !important' }}>
                                                            <Box
                                                                sx={{
                                                                    position: 'relative',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: updatedTest.questions[activeQuestion]?.image ? 'space-between' : 'start'
                                                                }}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    id="file-upload"
                                                                    style={{ display: 'none' }}
                                                                    onChange={(e) => handleQstImgChange(e, activeQuestion)}
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
        
                                                                {updatedTest.questions[activeQuestion]?.image && (
                                                                    <>
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{ ml: 1, color: 'text.secondary' }}
                                                                        >
                                                                            {updatedTest.questions[activeQuestion].image.split('/').pop()} {/* Display filename */}
                                                                        </Typography>
                                                                        <IconButton
                                                                            onClick={async () => {
                                                                                try {
                                                                                    // console.log(updatedTest.questions[activeQuestion].image);
                                                                                    await deleteImg(extractFilePath(updatedTest.questions[activeQuestion].image));
                                                                                    setUpdatedTest((prevTest) => {
                                                                                        const updatedQuestions = [...prevTest.questions];
                                                                                        updatedQuestions[activeQuestion].image = ''; // Clear the image path
                                                                                        return { ...prevTest, questions: updatedQuestions };
                                                                                    });
                                                                                } catch (error) {
                                                                                    console.error('Error deleting image:', error);
                                                                                }
                                                                            }}
                                                                            sx={{
                                                                                color: 'error.main',
                                                                                ml: 1,
                                                                                '&:hover': {
                                                                                    color: 'error.dark',
                                                                                },
                                                                            }}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </>
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
                                                                    value={updatedTest.questions[activeQuestion]?.point || 0}
                                                                    onChange={(e) =>
                                                                        setUpdatedTest((prevTest) => {
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
                                                value={contentType[activeQuestion]}
                                                onChange={(event) => handleContentTypeChange(event, activeQuestion)}
                                            >
                                                <FormControlLabel value="image" control={<Radio />} label="Image" />
                                                <FormControlLabel value="text" control={<Radio />} label="Text" />
                                            </RadioGroup>
                                        </Box>

                                        {/* Pass contentType as a key to force re-render */}
                                        {contentType && answerType && (
                                            <RenderAnswers
                                                key={`${contentType[activeQuestion]}-${answerType}`}
                                                answerType={answerType}
                                                activeQuestion={activeQuestion}
                                                handleAnswerChange={handleAnswerChange}
                                                updatedTest={updatedTest}
                                                contentType={contentType}
                                                localImages={localImages}
                                                handleDeleteImage={handleDeleteImage}
                                            />
                                        )}
                                    </>
                                )}
                            </Box>
                        </Box>
                    }
                </Box>
                {/* Modal */}
                <EditQuestionModal
                    open={modalOpen}
                    handleClose={closeModal}
                    questionText={currentText}
                    handleQuestionTextChange={handleQuestionTextChange}
                />

                {test &&
                    <AddQuestion open={openAddModal} handleClose={handleCloseAddModal} handleSave={handleSave} testId={test.id} />
                }

                {/* Error Snackbar */}
                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={() => setError('')} severity="error">
                        {error}
                    </Alert>
                </Snackbar>

                {/* Success Snackbar */}
                <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={() => setSuccess('')} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default ModifyTest;
