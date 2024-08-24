import React, { useEffect, useState } from 'react';
import { theme } from '../../../common/utils/theme';
import {
    Box, TextField, Button, Chip, Grid, Autocomplete, Typography,
    IconButton, InputAdornment, Snackbar, Alert
} from '@mui/material';
import { Link } from 'react-router-dom';

//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

//apis
import { addQuiz, getAllTests } from '../../../common/api/admin';

const AddQuiz = () => {
    const [tests, setTests] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [quizTime, setQuizTime] = useState('');
    const [candidateEmails, setCandidateEmails] = useState('');
    const [testPercentages, setTestPercentages] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // State for success message

    useEffect(() => {
        const getTests = async () => {
            try {
                const TestsData = await getAllTests();
                setTests(TestsData);
            } catch (error) {
                console.error("Failed to fetch Tests:", error);
            }
        };
        getTests();
    }, []);

    const handleAddTest = (event, value) => {
        if (value && !selectedTests.find(test => test.id === value.id)) {
            setSelectedTests([...selectedTests, value]);
            setTestPercentages(prev => ({ ...prev, [value.id]: 50.0 }));
        }
    };

    const handleDeleteChip = (testId) => {
        setSelectedTests(selectedTests.filter(test => test.id !== testId));
        setTestPercentages(prev => {
            const { [testId]: _, ...rest } = prev;
            return rest;
        });
    };

    const handlePercentageChange = (testId, value) => {
        setTestPercentages(prev => ({ ...prev, [testId]: value }));
    };

    const handleSave = async () => {
        const totalPercentage = Object.values(testPercentages).reduce((sum, p) => sum + parseFloat(p || 0), 0);

        if (totalPercentage !== 100) {
            setError('Le pourcentage total doit être exactement de 100%.');
            return;
        }

        const quizTests = selectedTests.map(test => ({
            testId: test.id,
            percentage: testPercentages[test.id] || 0
        }));

        const newQuiz = {
            title: quizTitle,
            description: quizDescription,
            emails: candidateEmails,
            quizTests,
            duration: parseInt(quizTime, 10) // Convert duration to integer
        };

        try {
            await addQuiz(newQuiz);
            setSelectedTests([]);
            setQuizTitle('');
            setQuizDescription('');
            setQuizTime('');
            setCandidateEmails('');
            setTestPercentages({});
            setError('');
            setSuccess('Quiz ajouté avec succès!');
        } catch (error) {
            console.error('Failed adding quiz', error);
            setError('Erreur lors de l\'ajout du quiz.');
        }
    };

    return (
        <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff', minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px) - 15px )` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Link to='/admin/Quiz'>
                    <IconButton aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Typography variant="h6">
                    Ajouter un Quiz
                </Typography>
            </Box>
            {tests &&
                <Grid container spacing={2}>
                    {/* Title and Description */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Titre du Quiz"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Description du Quiz"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={2}
                            value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <TextField
                            label="Temps du Quiz (en jours)"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={quizTime}
                            onChange={(e) => setQuizTime(e.target.value)}
                            type="number"
                            inputProps={{ min: 1 }}
                            sx={{ py: 0 }}
                        />
                    </Grid>
                    {/* Test Search and Selection */}
                    <Grid item xs={12} md={8}>
                        <Autocomplete
                            freeSolo
                            options={tests}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Rechercher un test"
                                    variant="outlined"
                                />
                            )}
                            onChange={handleAddTest}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            filterOptions={(options, params) => {
                                return options.filter(option =>
                                    option.title.toLowerCase().includes(params.inputValue.toLowerCase())
                                );
                            }}
                        />
                        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selectedTests.map((test) => (
                                <Box key={test.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <Chip
                                        label={test.title}
                                        onDelete={() => handleDeleteChip(test.id)}
                                        deleteIcon={<CloseIcon />}
                                    />
                                    <TextField
                                        label="Pourcentage"
                                        type="number"
                                        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                                        value={testPercentages[test.id] || ''}
                                        onChange={(e) => handlePercentageChange(test.id, e.target.value)}
                                        sx={{ width: '120px' }}
                                        size="small"
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    {/* Candidate Emails */}
                    <Grid item xs={12}>
                        <TextField
                            label="Emails des Candidats"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={5}
                            value={candidateEmails}
                            onChange={(e) => setCandidateEmails(e.target.value)}
                        />
                    </Grid>
                </Grid>
            }

            {/* Save Button */}
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
                Sauvegarder le Quiz
            </Button>

            {/* Error Snackbar */}
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error">
                    {error}
                </Alert>
            </Snackbar>

            {/* Success Snackbar */}
            <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')}>
                <Alert onClose={() => setSuccess('')} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddQuiz;
