import { Box, Button, Checkbox, Grid, Modal, Radio, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

//icons
import CreateIcon from '@mui/icons-material/Create';

function ModifyModal({ open, handleClose, selectedRowData, handleSave }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (selectedRowData) {
            setFormData({ ...selectedRowData });
        }
    }, [selectedRowData]);

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

    const handleSubmit = () => {
        handleSave(formData);
        handleClose();
    };

    const renderAnswers = () => {
        if (!formData.answers) return null;

        switch (formData.answerType) {
            case 'CHOIX_MULTIPLE':
                return formData.answers.map((answer, index) => (
                    <Grid container spacing={4} key={answer.id}>
                        <Grid item xs={10}>
                            <TextField
                                label={`Rèponse ` + (index + 1)}
                                value={answer.answerText}
                                onChange={(e) => handleAnswerChange(index, 'answerText', e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Checkbox
                                checked={answer.isCorrect}
                                onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                            />
                        </Grid>
                    </Grid>
                ));
            default:
                return formData.answers.map((answer, index) => (
                    <Grid container spacing={4} key={answer.id}>
                        <Grid item xs={10}>
                            <TextField
                                label={`Rèponse ` + (index + 1)}
                                value={answer.answerText}
                                onChange={(e) => handleAnswerChange(index, 'answerText', e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Radio
                                checked={answer.isCorrect}
                                onChange={() => handleRadioChange(index)}
                                value="answer"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': "Rèponse " + (index + 1) }}
                            />
                        </Grid>
                    </Grid>
                ));
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
                width: 600,
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        py: 4
                    }}
                >
                    <TextField
                        name="questionText"
                        label="Question"
                        value={formData.questionText || ''}
                        onChange={handleChange}
                    />
                    {renderAnswers()}
                </Box>
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
