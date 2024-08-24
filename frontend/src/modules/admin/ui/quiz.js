import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

//components
import Search from '../../../common/components/search';

//icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

//apis
import { deleteQuizzes, getAllQuizzes } from '../../../common/api/admin';

//helper
import { formatTimestampToDate, parseEmailString } from '../../../common/utils/helpers';

function Quiz() {
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [page, setPage] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');
    const rowsPerPage = 8;

    useEffect(() => {
        const getQuizzes = async () => {
            try {
                const QuizzesData = await getAllQuizzes();
                setQuiz(QuizzesData);
            } catch (error) {
                console.error("Failed to fetch Quizzes:", error);
            }
        };

        getQuizzes();
    }, []);

    const handleAdd = () => {
        navigate('Ajouter');
    };

    const openLeaderboard = (row) => {
        navigate(`id=${row.id.toString()}`);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleDelete = async () => {
        try {
            await deleteQuizzes(selectedRows);
            setSelectedRows([]);
            const QuizzesData = await getAllQuizzes();
            setQuiz(QuizzesData);
        } catch (error) {
            console.error("Failed to delete quizzes:", error);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = quiz.map((row) => row.id);
            setSelectedRows(newSelecteds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }

        setSelectedRows(newSelected);
    };

    return (
        <Box sx={{ p: '10px' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' fontWeight={500} color='primary'>
                    Quizzes
                </Typography>
                <Button variant="contained" onClick={handleAdd}>+ Ajouter</Button>
            </Box>
            {/* Filter Bar */}
            <Box sx={{ my: 2, p: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Search />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Filtre 1</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter1}
                            onChange={(e) => setFilter1(e.target.value)}
                            label="Filtre 1"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>choix 1</MenuItem>
                            <MenuItem value={20}>choix 2</MenuItem>
                            <MenuItem value={30}>choix 3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Filtre 2</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter2}
                            onChange={(e) => setFilter2(e.target.value)}
                            label="Filtre 2"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>choix 1</MenuItem>
                            <MenuItem value={20}>choix 2</MenuItem>
                            <MenuItem value={30}>choix 3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="outlined">Filtrer</Button>
            </Box>
            {/* Table */}
            <TableContainer sx={{ maxWidth: '100%', minHeight: '480px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6' fontWeight={500} color='primary'>
                        {quiz.length} Quizzes
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {selectedRows.length > 0 && (
                            <>
                                <Typography fontWeight={500} color='primary'>
                                    sélectionné : {selectedRows.length}
                                </Typography>
                                <IconButton sx={{ width: '45px', height: '45px' }} onClick={handleDelete} aria-label="delete">
                                    <DeleteRoundedIcon color='error' />
                                </IconButton>
                            </>
                        )}
                        <TablePagination
                            component="div"
                            count={quiz.length}
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
                                    indeterminate={selectedRows.length > 0 && selectedRows.length < quiz.length}
                                    checked={quiz.length > 0 && selectedRows.length === quiz.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{ 'aria-label': 'Select all candidates' }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Nom du Quiz</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Nombre de tests</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Date de creation</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Nombre de convoqués</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Nombre passés</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {quiz &&
                        <TableBody>
                            {quiz
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((q) => {
                                    const isItemSelected = selectedRows.indexOf(q.id) !== -1;
                                    return (
                                        <TableRow key={q.id} selected={isItemSelected}>
                                            <TableCell sx={{ p: 0, pl: 2 }}>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onChange={() => handleClick(q.id)}
                                                    inputProps={{ 'aria-label': `select q ${q.id}` }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ py: 0 }}>{q.title}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', py: 0 }}>{q.quizTests.length}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', py: 0 }}>{formatTimestampToDate(q.createdAt)}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', py: 0 }}>{parseEmailString(q.emails).length}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', py: 0 }}>{q.candidates.length}</TableCell>
                                            <TableCell sx={{ p: 0 }}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <IconButton aria-label="Leaderboard" onClick={() => openLeaderboard(q)}>
                                                        <LeaderboardIcon color='primary' />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    }
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Quiz;


