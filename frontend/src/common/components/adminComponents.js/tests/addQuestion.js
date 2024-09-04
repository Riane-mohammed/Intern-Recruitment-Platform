import { Box, Button,Checkbox, Grid, IconButton, Modal, Radio, RadioGroup, TextField, Typography, FormControlLabel, FormControl } from "@mui/material";
import { useState } from "react";

//icons
import CreateIcon from '@mui/icons-material/Create';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addOrUpdateQuestion, deleteImage, uploadAnswerImage, uploadQuestionImage } from "../../../api/admin";
import { extractFilePath } from "../../../utils/helpers";

function AddQuestion({ open, handleClose, handleSave, testId }) {
    const [formData, setFormData] = useState({
        id: null,
        question: '',
        image: '',
        type: '',
        point: 0,
        answers: [
            {
                answer: '',
                correct: false,
                image: ''
            }
        ],
        testId: testId,
    });

    const [answerType, setAnswerType] = useState('text');
    const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAnswerChange = async (index, key, value) => {
        if (key === "image") {
            try {
                // Delete the old image if it exists
                if (formData.answers[index].image) {
                    await deleteImg(extractFilePath(formData.answers[index].image));
                }

                // Upload the new image
                const path = await uploadAnswerImg(value);
                const updatedAnswers = formData.answers.map((answer, idx) =>
                    idx === index ? { ...answer, image: path } : answer
                );
                setFormData({ ...formData, answers: updatedAnswers });
            } catch (error) {
                console.error("Error uploading answer image:", error);
            }
        } else {
            const updatedAnswers = formData.answers.map((answer, idx) =>
                idx === index ? { ...answer, [key]: value } : answer
            );
            setFormData({ ...formData, answers: updatedAnswers });
        }
    };

    

    const handleRadioChange = (index) => {
        const updatedAnswers = formData.answers.map((answer, idx) => ({
            ...answer,
            correct: idx === index
        }));
        setFormData({ ...formData, answers: updatedAnswers });
    };

    const handleAnswerTypeChange = (e) => {
        const newAnswerType = e.target.value;
        setAnswerType(newAnswerType);

        const updatedAnswers = formData.answers.map(answer => {
            if (newAnswerType === 'image') {
                return { ...answer, answer: '' };
            } else {
                return { ...answer, image: null };
            }
        });

        setFormData({ ...formData, answers: updatedAnswers });
    };

    const handleQuestionTypeChange = (e) => {
        const newQuestionType = e.target.value;
        setQuestionType(newQuestionType);

        let updatedAnswers = formData.answers || [];

        if (newQuestionType === 'MULTIPLE_CHOICE' || newQuestionType === 'SINGLE_CHOICE') {
            while (updatedAnswers.length < 4) {
                updatedAnswers.push({ answer: '', correct: false, image : '' });
            }
            if (updatedAnswers.length > 4) {
                updatedAnswers = updatedAnswers.slice(0, 4);
            }
        } else if (newQuestionType === 'BOOLEAN') {
            while (updatedAnswers.length < 2) {
                updatedAnswers.push({ answer: '', correct: false, image : '' });
            }
            if (updatedAnswers.length > 2) {
                updatedAnswers = updatedAnswers.slice(0, 2);
            }
        }

        setFormData({ ...formData, type: newQuestionType, answers: updatedAnswers });
    };


    const handleQuestionImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                if (formData.image) {
                    await deleteImg(extractFilePath(formData.image));
                }

                const imagePath = await uploadQstImg(file);
                setFormData({ ...formData, image: imagePath });

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

    const handleSubmit = async () => {
        try {
            await addOrUpdateQuestion(formData);
            setFormData({
                id: null,
                question: '',
                image: '',
                type: '',
                point: 0,
                answers: [
                    {
                        answer: '',
                        correct: false,
                        image: ''
                    }
                ],
                testId: testId,
            });
        } catch (error) {
            console.error("Error updating candidate:", error);
        }

        handleSave();
        handleClose();
    };

    const RenderAnswers = ({ answerType, questionType }) => {
        const renderOptions = (count, isCheckbox) => (
            formData.answers.slice(0, count).map((answer, index) => (
                <Grid container spacing={4} key={index} sx={{ mb: 2 }}>
                    {answerType === 'image' ? (
                        <>
                            <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                {answer.image && (
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
                                )}
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id={`file-upload-${index}`}
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleAnswerChange(index, 'image', e.target.files[0])}
                                />

                                <label htmlFor={`file-upload-${index}`}>
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
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={10}>
                            <TextField
                                label={`Réponse ` + (index + 1)}
                                value={answer.answer || ''}
                                onChange={(e) => handleAnswerChange(index, 'answer', e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    )}
                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        {isCheckbox ? (
                            <Checkbox
                                checked={answer.correct}
                                onChange={(e) => handleAnswerChange(index, 'correct', e.target.checked)}
                            />
                        ) : (
                            <Radio
                                checked={answer.correct}
                                onChange={() => handleRadioChange(index)}
                                value="answer"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': `Réponse ${index + 1}` }}
                            />
                        )}
                    </Grid>
                </Grid>
            ))
        );

        switch (questionType) {
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
                width: 1050,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="div"
                    display='flex'
                    alignItems='center'
                    color='grey.main'>
                    <CreateIcon color='grey.main' sx={{ mr: '5px' }} /> Modifier Question {formData ? formData.id : ''}
                </Typography>
                <Grid
                    container
                    spacing={4}
                    sx={{
                        py: 4
                    }}
                >
                    <Grid item xs={6} sx={{ borderRight: '1px solid ', borderColor: 'grey.light', pr: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                name="question"
                                label="Question"
                                value={formData.question || ''}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mr: 2, mt: 2 }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="question-image-upload"
                                style={{ display: 'none' }}
                                onChange={handleQuestionImageChange}
                            />
                            <label htmlFor="question-image-upload">
                                <IconButton
                                    variant="contained"
                                    component="span"
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                    }}
                                >
                                    <CloudUploadIcon />
                                </IconButton>
                            </label>
                        </Box>
                        {formData.image &&
                            <Box
                                component="img"
                                src={formData.image}
                                alt={`question-${formData.id}`}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '400px',
                                    objectFit: 'contain',
                                    display: 'block',
                                    marginTop: '16px',
                                }}
                            />
                        }
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <Typography fontWeight={500} width={80} mt={2}>Point</Typography>
                        <TextField
                            id={`point-${formData}`}
                            variant="outlined"
                            type="number"
                            sx={{ width: '20%', mt: 2 }}
                            size='small'
                            inputProps={{ min: 0 }}
                            value={formData.point || ''}
                            onChange={(e) =>
                                setFormData((prevForm) => {
                                    return { ...prevForm, point: parseInt(e.target.value, 10) };
                                })
                            }
                        />
                    </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography fontWeight={500} width={200} sx={{ mr: 2 }}>Type des Réponses</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-labelledby="answer-type-label"
                                name="answer-type"
                                value={questionType}
                                onChange={handleQuestionTypeChange}
                            >
                                <FormControlLabel value="MULTIPLE_CHOICE" control={<Radio />} label="Choix Multiple" />
                                <FormControlLabel value="SINGLE_CHOICE" control={<Radio />} label="Choix Simple" />
                                <FormControlLabel value="BOOLEAN" control={<Radio />} label="Boolean" />
                            </RadioGroup>
                        </FormControl>
                        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            <Typography fontWeight={500} sx={{ mr: 2 }} >Type de Contenu </Typography>
                            <RadioGroup
                                row
                                aria-label="answer-type"
                                name="answerType"
                                value={answerType}
                                onChange={handleAnswerTypeChange}
                                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
                            >
                                <FormControlLabel value="text" control={<Radio />} label="Text" />
                                <FormControlLabel value="image" control={<Radio />} label="Image" />
                            </RadioGroup>
                        </Box>
                        {formData.answers &&
                            <RenderAnswers answerType={answerType} questionType={questionType} />
                        }
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        gap: 2
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            bgcolor: 'rgb(0,0,0,0.12)',
                            '&:hover': {
                                bgcolor: 'rgb(0,0,0,0.12)',
                            },
                        }}
                        onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant='contained' onClick={handleSubmit} sx={{ mt: 2 }}>
                        Sauvegarder
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddQuestion;
