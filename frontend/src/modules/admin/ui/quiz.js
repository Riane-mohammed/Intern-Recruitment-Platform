import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

//components
import Search from '../../../common/components/search';

//icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const rows = [
    { id: 1, name: 'PFA 2020', numberOfTests: 3, totalInvitations: 20, passed: 15, createdDate: '2020-01-01' },
    { id: 2, name: 'PFA 2021', numberOfTests: 5, totalInvitations: 30, passed: 25, createdDate: '2021-02-15' },
    { id: 3, name: 'PFA 2022', numberOfTests: 4, totalInvitations: 25, passed: 20, createdDate: '2022-03-20' },
    { id: 4, name: 'PFA 2023', numberOfTests: 6, totalInvitations: 35, passed: 30, createdDate: '2023-04-10' },
    { id: 5, name: 'Quiz Mathématiques 1', numberOfTests: 2, totalInvitations: 15, passed: 10, createdDate: '2021-05-05' },
    { id: 6, name: 'Quiz Sciences 1', numberOfTests: 3, totalInvitations: 20, passed: 18, createdDate: '2021-06-12' },
    { id: 7, name: 'Quiz Histoire 1', numberOfTests: 4, totalInvitations: 25, passed: 22, createdDate: '2021-07-18' },
    { id: 8, name: 'Quiz Géographie 1', numberOfTests: 2, totalInvitations: 18, passed: 15, createdDate: '2021-08-25' },
    { id: 9, name: 'Quiz Littérature 1', numberOfTests: 5, totalInvitations: 28, passed: 24, createdDate: '2021-09-30' },
    { id: 10, name: 'Quiz Art 1', numberOfTests: 3, totalInvitations: 20, passed: 17, createdDate: '2021-10-10' },
    { id: 11, name: 'Quiz Physique 1', numberOfTests: 4, totalInvitations: 30, passed: 27, createdDate: '2021-11-15' },
    { id: 12, name: 'Quiz Chimie 1', numberOfTests: 3, totalInvitations: 22, passed: 19, createdDate: '2021-12-20' },
    { id: 13, name: 'Quiz Biologie 1', numberOfTests: 5, totalInvitations: 26, passed: 23, createdDate: '2022-01-25' },
    { id: 14, name: 'Quiz Anglais 1', numberOfTests: 2, totalInvitations: 17, passed: 13, createdDate: '2022-02-14' },
    { id: 15, name: 'Quiz Musique 1', numberOfTests: 4, totalInvitations: 24, passed: 20, createdDate: '2022-03-18' },
    { id: 16, name: 'Quiz Technologie 1', numberOfTests: 3, totalInvitations: 21, passed: 18, createdDate: '2022-04-22' },
    { id: 17, name: 'Quiz Économie 1', numberOfTests: 5, totalInvitations: 27, passed: 24, createdDate: '2022-05-10' },
    { id: 18, name: 'Quiz Philosophie 1', numberOfTests: 3, totalInvitations: 19, passed: 16, createdDate: '2022-06-15' },
    { id: 19, name: 'Quiz Sociologie 1', numberOfTests: 4, totalInvitations: 25, passed: 21, createdDate: '2022-07-20' },
    { id: 20, name: 'Quiz Anthropologie 1', numberOfTests: 2, totalInvitations: 16, passed: 14, createdDate: '2022-08-25' },
];

function Quiz() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');
    const rowsPerPage = 8;

    const handleAdd = () => {
        navigate('Ajouter');
    };

    const openLeaderboard = (row) => {
        navigate(`id=${row.id.toString()}`);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleDelete = () => console.log(selectedRows);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((row) => row.id);
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
                        {rows.length} Quizzes
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
                                    indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                                    checked={rows.length > 0 && selectedRows.length === rows.length}
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
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isItemSelected = selectedRows.indexOf(row.id) !== -1;
                                return (
                                    <TableRow key={row.id} selected={isItemSelected}>
                                        <TableCell sx={{ p: 0, pl: 2 }}>
                                            <Checkbox
                                                checked={isItemSelected}
                                                onChange={() => handleClick(row.id)}
                                                inputProps={{ 'aria-label': `select row ${row.id}` }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 0 }}>{row.name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.numberOfTests}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.createdDate}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.totalInvitations}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.passed}</TableCell>
                                        <TableCell sx={{ p: 0 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <IconButton aria-label="Leaderboard" onClick={() => openLeaderboard(row)}>
                                                    <LeaderboardIcon color='primary' />
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
    );
}

export default Quiz;


