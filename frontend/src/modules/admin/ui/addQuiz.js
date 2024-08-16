import React, { useState } from 'react';
import { theme } from '../../../common/utils/theme';
import {
    Box, TextField, Button, Chip, Grid, Autocomplete, Typography,
    IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';

//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

// Mock data
const tests = [
    { id: 1, name: 'Math Test 1' },
    { id: 2, name: 'Science Test 1' },
    { id: 3, name: 'History Test 1' },
    { id: 4, name: 'Math Test 2' },
    { id: 5, name: 'Science Test 2' },
    // More tests...
];

const AddQuiz = () => {
    const [selectedTests, setSelectedTests] = useState([]);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [quizTime, setQuizTime] = useState('');
    const [candidateEmails, setCandidateEmails] = useState('');

    const handleAddTest = (event, value) => {
        if (value && !selectedTests.find(test => test.id === value.id)) {
            setSelectedTests([...selectedTests, value]);
        }
    };

    const handleDeleteChip = (testId) => {
        setSelectedTests(selectedTests.filter(test => test.id !== testId));
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
            <Grid container spacing={2}>
                {/* Title and Description */}
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Titre du Quiz"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
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
                {/* Test Search and Selection */}
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        freeSolo
                        options={tests}
                        getOptionLabel={(option) => option.name}
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
                                option.name.toLowerCase().includes(params.inputValue.toLowerCase())
                            );
                        }}
                    />
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedTests.map((test) => (
                            <Chip
                                key={test.id}
                                label={test.name}
                                onDelete={() => handleDeleteChip(test.id)}
                                deleteIcon={<CloseIcon />}
                            />
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'start'}}>
                    <TextField
                        label="Temps du Quiz (en jours)"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={quizTime}
                        onChange={(e) => setQuizTime(e.target.value)}
                        type="number"
                        inputProps={{ min: 1 }}
                    />
                </Grid>
                {/* Candidate Emails */}
                <Grid item xs={12}>
                    <TextField
                        label="Emails des Candidats"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={candidateEmails}
                        onChange={(e) => setCandidateEmails(e.target.value)}
                    />
                </Grid>
            </Grid>

            {/* Save Button */}
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Sauvegarder le Quiz
            </Button>
        </Box>
    );
};

export default AddQuiz;
