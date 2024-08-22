import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography, FormControl, MenuItem, Select, InputLabel, Button } from '@mui/material';

//components
import Search from '../../../common/components/search';
import ViewModal from '../../../common/components/adminComponents.js/questions/viewModal';
import ModifyModal from '../../../common/components/adminComponents.js/questions/modifyModal';

//icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

//helpers
import { questionTypes, truncateText } from '../../../common/utils/helpers';

//api
import { getAllQuestions, getTestById } from '../../../common/api/admin';

function Questions() {
    const [page, setPage] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openModifyModal, setOpenModifyModal] = useState(false);
    const [selectedQuestionData, setSelectedQuestionData] = useState(null);
    const [level, setLevel] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const rowsPerPage = 8;

const getQuestions = async () => {
    try {
        const QuestionsData = await getAllQuestions();

        // Fetch the test data for each question and add it to the question object
        const updatedQuestions = await Promise.all(
            QuestionsData.map(async (question) => {
                const testData = await getTestById(question.testId);
                return {
                    ...question,
                    testName: testData.title,
                    testLevel: testData.level,   
                    testSection: testData.section
                };
            })
        );

        setQuestions(updatedQuestions);
    } catch (error) {
        console.error("Failed to fetch Questions:", error);
    }
};

    useEffect(() => {
        getQuestions();
    }, []);


    const handleOpenViewModal = (row) => {
        setSelectedQuestionData(row);
        setOpenViewModal(true);
    };

    const handleFilter = (row) => {
        console.log(level, category, type);
    };

    const handleOpenModifyModal = (row) => {
        setSelectedQuestionData(row);
        setOpenModifyModal(true);
    };

    const handleCloseViewModal = () => setOpenViewModal(false);
    const handleCloseModifyModal = () => setOpenModifyModal(false);

    const handleChangePage = (newPage) => setPage(newPage);

    const handleDelete = () => console.log(selectedQuestions);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = questions.map((row) => row.id);
            setSelectedQuestions(newSelecteds);
        } else {
            setSelectedQuestions([]);
        }
    };

    const handleClick = (id) => {
        const selectedIndex = selectedQuestions.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedQuestions, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedQuestions.slice(1));
        } else if (selectedIndex === selectedQuestions.length - 1) {
            newSelected = newSelected.concat(selectedQuestions.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedQuestions.slice(0, selectedIndex),
                selectedQuestions.slice(selectedIndex + 1),
            );
        }

        setSelectedQuestions(newSelected);
    };

    const handleSave = () => console.log('updated successfully');

    return (
        <Box sx={{ p: '10px' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' fontWeight={500} color='primary'>
                    Questions
                </Typography>
            </Box>
            {/* Filter Bar */}
            <Box sx={{ my: 2, p: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Search />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Catégorie</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Catégorie"
                        >
                            <MenuItem value="">
                                <em>Aucun</em>
                            </MenuItem>
                            <MenuItem value="Technical" >Technique</MenuItem>
                            <MenuItem value="Psychotechnique" >Psychotechnique</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Niveau</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            label="Niveau"
                        >
                            <MenuItem value="">
                                <em>Aucun</em>
                            </MenuItem>
                            <MenuItem value="Beginner" >Débutant</MenuItem>
                            <MenuItem value="Intermediate" >Intermédiaire</MenuItem>
                            <MenuItem value="Advanced" >Avancé</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Type</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            label="Type"
                        >
                            <MenuItem value="">
                                <em>Aucun</em>
                            </MenuItem>
                            <MenuItem value="MULTI_CHOICE" >Choix multiple</MenuItem>
                            <MenuItem value="SINGLE_CHOICE" >Choix unique</MenuItem>
                            <MenuItem value="BOOLEAN" >Boolean</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="outlined" onClick={handleFilter}>Filtrer</Button>
            </Box>
            {/* Table */}
            <TableContainer sx={{ maxWidth: '100%', minHeight: '480px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6' fontWeight={500} color='primary'>
                        {questions.length} Questions
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {selectedQuestions.length > 0 && (
                            <>
                                <Typography fontWeight={500} color='primary'>
                                    sélectionné : {selectedQuestions.length}
                                </Typography>
                                <IconButton sx={{ width: '45px', height: '45px' }} onClick={handleDelete} aria-label="delete">
                                    <DeleteRoundedIcon color='error' />
                                </IconButton>
                            </>
                        )}
                    <TablePagination
                        component="div"
                        count={questions.length}
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
                            <TableCell
                                sx={{
                                    width: '42px',
                                    p: 0,
                                    pl: 2
                                }}
                            >
                                <Checkbox
                                    indeterminate={selectedQuestions.length > 0 && selectedQuestions.length < questions.length}
                                    checked={questions.length > 0 && selectedQuestions.length === questions.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'Select all candidates'
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Question</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Nom du test</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Type</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                                Niveau
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                                Catégorie
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((question) => {
                                const isItemSelected = selectedQuestions.indexOf(question.id) !== -1;
                                return (
                                    <TableRow
                                        key={question.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell sx={{ p: 0, pl: 2 }}>
                                            <Checkbox
                                                checked={isItemSelected}
                                                onChange={() => handleClick(question.id)}
                                                inputProps={{
                                                    'aria-label': `select question ${question.id}`
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 0 }}>{truncateText(question.question, 20)}</TableCell>
                                        <TableCell sx={{ py: 0 }}>{question.testName}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{questionTypes[question.type]}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{question.testLevel.name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{question.testSection.name}</TableCell>
                                        <TableCell sx={{ p: 0 }}>
                                            <Box sx={{ textAlign: 'center', py: 0 }}>
                                                <IconButton
                                                    onClick={() => handleOpenModifyModal(question)}
                                                    aria-label="Modify"
                                                >
                                                    <CreateRoundedIcon color='primary' />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleOpenViewModal(question)}
                                                    aria-label="View"
                                                >
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
            <ViewModal open={openViewModal} handleClose={handleCloseViewModal} selectedQuestionData={selectedQuestionData} />
            <ModifyModal open={openModifyModal} handleClose={handleCloseModifyModal} selectedQuestionData={selectedQuestionData} handleSave={handleSave} />
        </Box>
    );
}

export default Questions;
