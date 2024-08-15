import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, List, ListItem, IconButton, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination
} from '@mui/material';
import { theme } from '../../../common/utils/theme';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Mock data
const tests = [
    { id: 1, name: 'Math Test 1', category: 'Mathematics', level: 'Beginner' },
    { id: 2, name: 'Science Test 1', category: 'Science', level: 'Intermediate' },
    { id: 3, name: 'History Test 1', category: 'History', level: 'Advanced' },
    { id: 4, name: 'Math Test 2', category: 'Mathematics', level: 'Intermediate' },
  { id: 5, name: 'Science Test 2', category: 'Science', level: 'Beginner' },
  { id: 6, name: 'History Test 2', category: 'History', level: 'Intermediate' },
  { id: 7, name: 'Math Test 3', category: 'Mathematics', level: 'Advanced' },
  { id: 8, name: 'Science Test 3', category: 'Science', level: 'Advanced' },
  { id: 9, name: 'History Test 3', category: 'History', level: 'Beginner' },
  { id: 10, name: 'Math Test 4', category: 'Mathematics', level: 'Intermediate' },

];

const rows = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 4, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 5, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 6, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
  { id: 7, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
  { id: 8, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 9, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 10, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 11, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
  { id: 12, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
  { id: 13, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 14, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 15, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 16, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
  { id: 17, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
  { id: 18, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 19, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 20, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 21, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
];

const AddQuiz = () => {
    const [selectedTests, setSelectedTests] = useState([]);
    const [quizName, setQuizName] = useState('');
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 8;

    const handleTestChange = (event) => {
        const value = event.target.value;
        setSelectedTests(typeof value === 'string' ? value.split(',') : value);
    };

    const handleQuizNameChange = (event) => {
        setQuizName(event.target.value);
    };

    const handleDeleteTest = (id) => {
        setSelectedTests(prevTests => prevTests.filter(testId => testId !== id));
    };

    const handleSaveQuiz = () => {
        if (quizName.trim() === '') {
            setSnackbarMessage('Le nom du quiz est requis.');
            setSnackbarOpen(true);
            return;
        }
        if (selectedTests.length === 0) {
            setSnackbarMessage('Veuillez sélectionner des tests.');
            setSnackbarOpen(true);
            return;
        }
        if (selectedEmails.length === 0) {
            setSnackbarMessage('Veuillez sélectionner des emails.');
            setSnackbarOpen(true);
            return;
        }

        // Handle save logic here
        console.log('Quiz saved:', { name: quizName, tests: selectedTests, emails: selectedEmails });
        setSnackbarMessage('Quiz enregistré avec succès.');
        setSnackbarOpen(true);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTests = Array.from(selectedTests);
        const [movedTest] = reorderedTests.splice(result.source.index, 1);
        reorderedTests.splice(result.destination.index, 0, movedTest);

        setSelectedTests(reorderedTests);
    };

    const handleOpenViewModal = (row) => {
        // Handle view modal logic
    };

    const handleOpenModifyModal = (row) => {
        // Handle modify modal logic
    };

    const handleCloseViewModal = () => { /* Close view modal */ };
    const handleCloseModifyModal = () => { /* Close modify modal */ };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleDelete = () => console.log(selectedRows);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((row) => row.email);
            setSelectedEmails(newSelecteds);
        } else {
            setSelectedEmails([]);
        }
    };

    const handleClick = (email) => {
        const selectedIndex = selectedEmails.indexOf(email);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedEmails, email);
        } else {
            newSelected = newSelected.concat(selectedEmails.slice(0, selectedIndex), selectedEmails.slice(selectedIndex + 1));
        }

        setSelectedEmails(newSelected);
    };

    return (
        <Box sx={{ p: '20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff', minHeight: `calc( 100vh - ${theme.mixins.toolbar.minHeight}px)` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Link to='/admin/Quiz'>
                    <IconButton aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Button variant='contained' onClick={handleSaveQuiz}>
                    Sauvegarder le Quiz
                </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                {/* Quiz Name */}
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography fontWeight={500} sx={{ width: '150px' }}>Nom du Quiz</Typography>
                    <TextField
                        id="quiz-name"
                        variant="outlined"
                        size="small"
                        value={quizName}
                        onChange={handleQuizNameChange}
                        sx={{ flex: 1 }}
                    />
                </Box>

                {/* Select Tests */}
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography fontWeight={500} sx={{ width: '150px' }}>Sélectionner des Tests</Typography>
                    <FormControl sx={{ flex: 1 }}>
                        <InputLabel id="test-select-label">Tests</InputLabel>
                        <Select
                            labelId="test-select-label"
                            id="test-select"
                            multiple
                            value={selectedTests}
                            onChange={handleTestChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((testId) => {
                                        const test = tests.find(test => test.id === parseInt(testId));
                                        return (
                                            <Box key={testId} sx={{ display: 'flex', alignItems: 'center', bgcolor: 'primary.light', color: 'white', borderRadius: 1, padding: '2px 4px' }}>
                                                <Typography variant="body2" sx={{ mr: 1 }}>{test.name}</Typography>
                                                <IconButton size="small" onClick={() => handleDeleteTest(testId)}>
                                                    <DeleteRoundedIcon sx={{ fontSize: 14 }} />
                                                </IconButton>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            )}
                        >
                            {tests.map((test) => (
                                <MenuItem key={test.id} value={test.id}>
                                    <Checkbox checked={selectedTests.indexOf(test.id.toString()) > -1} />
                                    <Typography variant="body2">{test.name}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Ordered List of Selected Tests */}
                <Typography fontWeight={500} mb={2}>Ordre des Tests Sélectionnés</Typography>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <List
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                            >
                                {selectedTests.map((testId, index) => {
                                    const test = tests.find(test => test.id === parseInt(testId));
                                    return (
                                        <Draggable key={testId} draggableId={testId} index={index}>
                                            {(provided) => (
                                                <ListItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: index % 2 === 0 ? 'grey.100' : 'transparent', mb: 1 }}
                                                >
                                                    <Typography>{index + 1}. {test.name}</Typography>
                                                    <IconButton size="small" onClick={() => handleDeleteTest(testId)}>
                                                        <DeleteRoundedIcon sx={{ fontSize: 14 }} />
                                                    </IconButton>
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>

            {/* Candidates Table */}
            <Box sx={{ mt: 4 }}>
                <Typography variant='h6' fontWeight={500} color='primary'>
                    Sélectionner des Candidats
                </Typography>
                <TableContainer sx={{ maxWidth: '100%', minHeight: '480px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='h6' fontWeight={500} color='primary'>
                            {rows.length} Candidats
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {selectedEmails.length > 0 && (
                                <>
                                    <Typography fontWeight={500} color='primary'>
                                        Sélectionné : {selectedEmails.length}
                                    </Typography>
                                    <IconButton sx={{ width: '45px', height: '45px' }} onClick={() => setSelectedEmails([])} aria-label="delete">
                                        <DeleteRoundedIcon color='error' />
                                    </IconButton>
                                </>
                            )}
                            <TablePagination
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[rowsPerPage]}
                                labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count !== -1 ? count : `plus de ${to}`}`}
                            />
                        </Box>
                    </Box>
                    <Table sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: '10px', overflow: 'hidden', boxShadow: 1 }}>
                        <TableHead sx={{ bgcolor: 'blue.light' }}>
                            <TableRow>
                                <TableCell sx={{ width: '42px', p: 0, pl: 2 }}>
                                    <Checkbox
                                        indeterminate={selectedEmails.length > 0 && selectedEmails.length < rows.length}
                                        checked={rows.length > 0 && selectedEmails.length === rows.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ 'aria-label': 'Select all candidates' }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Nom Complet</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Numéro de Téléphone</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Âge</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const isItemSelected = selectedEmails.indexOf(row.email) !== -1;
                                return (
                                    <TableRow key={row.id} selected={isItemSelected}>
                                        <TableCell sx={{ p: 0, pl: 2 }}>
                                            <Checkbox
                                                checked={isItemSelected}
                                                onChange={() => handleClick(row.email)}
                                                inputProps={{ 'aria-label': `select row ${row.id}` }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 0 }}>{row.name}</TableCell>
                                        <TableCell sx={{ py: 0 }}>{row.email}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.phone}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.age}</TableCell>
                                        <TableCell sx={{ p: 0 }}>
                                            <Box sx={{ textAlign: 'center', py: 0 }}>
                                                <IconButton onClick={() => handleOpenModifyModal(row)} aria-label="Modify">
                                                    <CreateRoundedIcon color='primary' />
                                                </IconButton>
                                                <IconButton onClick={() => handleOpenViewModal(row)} aria-label="View">
                                                    <VisibilityRoundedIcon color='blue' />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddQuiz;
