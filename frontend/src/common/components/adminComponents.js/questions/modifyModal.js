import { Box, Button, Checkbox, Grid, IconButton, Modal, Radio, RadioGroup, TextField, Typography, FormControlLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";

//icons
import CreateIcon from '@mui/icons-material/Create';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ModifyModal({ open, handleClose, selectedQuestionData, handleSave }) {
    const [formData, setFormData] = useState({});
    const [answerType, setAnswerType] = useState('text');
    const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');

    useEffect(() => {
        if (selectedQuestionData) {
            setFormData({ ...selectedQuestionData });
            setAnswerType(selectedQuestionData.answers?.[0]?.image ? 'image' : 'text');
            setQuestionType(selectedQuestionData.type || 'MULTIPLE_CHOICE');
        }
    }, [selectedQuestionData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAnswerChange = (index, key, value) => {
        const updatedAnswers = formData.answers.map((answer, idx) =>
            idx === index ? { ...answer, [key]: value } : answer
        );
        setFormData({ ...formData, answers: updatedAnswers });
    };
    

    const handleRadioChange = (index) => {
        const updatedAnswers = formData.answers.map((answer, idx) => ({
            ...answer,
            isCorrect: idx === index
        }));
        setFormData({ ...formData, answers: updatedAnswers });
    };

    const handleAnswerTypeChange = (e) => {
        setAnswerType(e.target.value);
    };

    const handleQuestionTypeChange = (e) => {
        setQuestionType(e.target.value);
        setFormData({ ...formData, type: e.target.value });
    };

    const handleQuestionImageChange = (e) => {
        setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
    };

    const handleSubmit = () => {
        console.log('Updated Question Details:', formData);
        handleSave(formData);
        handleClose();
    };

    const RenderAnswers = ({ answerType, questionType }) => {
        const renderOptions = (count, isCheckbox) => (
            formData.answers.slice(0, count).map((answer, index) => (
                <Grid container spacing={4} key={answer.id} sx={{ mb: 2 }}>
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
                                    id={`file-upload-${answer.id}`}
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleAnswerChange(index, 'image', URL.createObjectURL(e.target.files[0]))}
                                />
                                <label htmlFor={`file-upload-${answer.id}`}>
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
                        <Grid item xs={10} >
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
                                checked={answer.isCorrect}
                                onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                            />
                        ) : (
                            <Radio
                                checked={answer.isCorrect}
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
                    <Grid item xs={6} sx={{borderRight: '1px solid ', borderColor: 'grey.light', pr: 1}}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                name="question"
                                label="Question"
                                value={formData.question || ''}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mr: 2 }}
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

export default ModifyModal;
