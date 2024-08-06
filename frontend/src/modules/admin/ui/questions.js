import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography, FormControl, MenuItem, Select, InputLabel, Button } from '@mui/material';

//components
import Search from '../../../common/components/search';
import ViewModal from '../../../common/components/adminComponents.js/questions/viewModal';
import ModifyModal from '../../../common/components/adminComponents.js/questions/modifyModal';

//icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

const rows = [
    {
        id: 1, 
        questionText: 'Quels pays suivants sont en Amérique du Sud ?', 
        answerType: "CHOIX_MULTIPLE", 
        level: 'débutant', 
        category: 'technique',
        answers: [
            { id: 1, answerText: 'Brésil', isCorrect: true },
            { id: 2, answerText: 'Argentine', isCorrect: true },
            { id: 3, answerText: 'Mexique', isCorrect: false },
            { id: 4, answerText: 'Chili', isCorrect: true }
        ]
    },
    {
        id: 2, 
        questionText: 'La Terre est-elle ronde ?', 
        answerType: "BOOLEAN", 
        level: 'débutant', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Oui', isCorrect: true },
            { id: 2, answerText: 'Non', isCorrect: false }
        ]
    },
    {
        id: 3, 
        questionText: 'Quelle est la capitale de la France ?', 
        answerType: "CHOIX_SIMPLE", 
        level: 'débutant', 
        category: 'technique',
        answers: [
            { id: 1, answerText: 'Paris', isCorrect: true },
            { id: 2, answerText: 'Londres', isCorrect: false },
            { id: 3, answerText: 'Berlin', isCorrect: false },
            { id: 4, answerText: 'Madrid', isCorrect: false }
        ]
    },
    {
        id: 4, 
        questionText: 'Le feu est-il chaud ?', 
        answerType: "BOOLEAN", 
        level: 'débutant', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Oui', isCorrect: true },
            { id: 2, answerText: 'Non', isCorrect: false }
        ]
    },
    {
        id: 5, 
        questionText: 'Sélectionnez les couleurs primaires.', 
        answerType: "CHOIX_MULTIPLE", 
        level: 'intermédiaire', 
        category: 'technique',
        answers: [
            { id: 1, answerText: 'Rouge', isCorrect: true },
            { id: 2, answerText: 'Vert', isCorrect: false },
            { id: 3, answerText: 'Bleu', isCorrect: true },
            { id: 4, answerText: 'Jaune', isCorrect: true }
        ]
    },
    {
        id: 6, 
        questionText: 'Quel est le résultat de 2 + 2 ?', 
        answerType: "CHOIX_SIMPLE", 
        level: 'débutant', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: '3', isCorrect: false },
            { id: 2, answerText: '4', isCorrect: true },
            { id: 3, answerText: '5', isCorrect: false }
        ]
    },
    {
        id: 7, 
        questionText: 'Quels de ces éléments sont des métaux ?', 
        answerType: "CHOIX_MULTIPLE", 
        level: 'intermédiaire', 
        category: 'technique',
        answers: [
            { id: 1, answerText: 'Fer', isCorrect: true },
            { id: 2, answerText: 'Oxygène', isCorrect: false },
            { id: 3, answerText: 'Cuivre', isCorrect: true },
            { id: 4, answerText: 'Or', isCorrect: true }
        ]
    },
    {
        id: 8, 
        questionText: 'Est-ce que le Soleil tourne autour de la Terre ?', 
        answerType: "BOOLEAN", 
        level: 'débutant', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Oui', isCorrect: false },
            { id: 2, answerText: 'Non', isCorrect: true }
        ]
    },
    {
        id: 9, 
        questionText: 'Quelle est la formule chimique de l\'eau ?', 
        answerType: "CHOIX_SIMPLE", 
        level: 'intermédiaire', 
        category: 'technique',
        answers: [
            { id: 1, answerText: 'H2O', isCorrect: true },
            { id: 2, answerText: 'CO2', isCorrect: false },
            { id: 3, answerText: 'O2', isCorrect: false },
            { id: 4, answerText: 'NaCl', isCorrect: false }
        ]
    },
    {
        id: 10, 
        questionText: 'Sélectionnez les planètes du système solaire.', 
        answerType: "CHOIX_MULTIPLE", 
        level: 'intermédiaire', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Mars', isCorrect: true },
            { id: 2, answerText: 'Jupiter', isCorrect: true },
            { id: 3, answerText: 'Soleil', isCorrect: false },
            { id: 4, answerText: 'Lune', isCorrect: false }
        ]
    },
    {
        id: 11, 
        questionText: 'La lumière voyage-t-elle plus vite que le son ?', 
        answerType: "BOOLEAN", 
        level: 'intermédiaire', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Oui', isCorrect: true },
            { id: 2, answerText: 'Non', isCorrect: false }
        ]
    },
    {
        id: 12, 
        questionText: 'Quelle est la racine carrée de 81 ?', 
        answerType: "CHOIX_SIMPLE", 
        level: 'intermédiaire', 
        category: 'technique',
        answers: [
            { id: 1, answerText: '9', isCorrect: true },
            { id: 2, answerText: '8', isCorrect: false },
            { id: 3, answerText: '7', isCorrect: false },
            { id: 4, answerText: '10', isCorrect: false }
        ]
    },
    {
        id: 13, 
        questionText: 'Sélectionnez les organes humains.', 
        answerType: "CHOIX_MULTIPLE", 
        level: 'avancé', 
        category: 'technique',
        answers: [
            { id: 1, answerText: 'Cœur', isCorrect: true },
            { id: 2, answerText: 'Foie', isCorrect: true },
            { id: 3, answerText: 'Estomac', isCorrect: true },
            { id: 4, answerText: 'Pomme', isCorrect: false }
        ]
    },
    {
        id: 14, 
        questionText: 'La gravité existe-t-elle sur la Lune ?', 
        answerType: "BOOLEAN", 
        level: 'intermédiaire', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Oui', isCorrect: true },
            { id: 2, answerText: 'Non', isCorrect: false }
        ]
    },
    {
        id: 15, 
        questionText: 'Quelle est la langue officielle du Brésil ?', 
        answerType: "CHOIX_SIMPLE", 
        level: 'intermédiaire', 
        category: 'technique',
        answers: [
            { id: 1, answerText: 'Portugais', isCorrect: true },
            { id: 2, answerText: 'Espagnol', isCorrect: false },
            { id: 3, answerText: 'Français', isCorrect: false },
            { id: 4, answerText: 'Anglais', isCorrect: false }
        ]
    },
    {
        id: 16, 
        questionText: 'Sélectionnez les composants d\'un ordinateur.', 
        answerType: "CHOIX_MULTIPLE", 
        level: 'avancé', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Processeur', isCorrect: true },
            { id: 2, answerText: 'Mémoire RAM', isCorrect: true },
            { id: 3, answerText: 'Disque dur', isCorrect: true },
            { id: 4, answerText: 'Carte SD', isCorrect: false }
        ]
    },
    {
        id: 17, 
        questionText: 'L\'eau bout-elle à 100 degrés Celsius ?', 
        answerType: "BOOLEAN", 
        level: 'avancé', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Oui', isCorrect: true },
            { id: 2, answerText: 'Non', isCorrect: false }
        ]
    },
    {
        id: 18, 
        questionText: 'Quelle est la distance de la Terre au Soleil ?', 
        answerType: "CHOIX_SIMPLE", 
        level: 'avancé', 
        category: 'technique',
        answers: [
            { id: 1, answerText: '150 millions de kilomètres', isCorrect: true },
            { id: 2, answerText: '100 millions de kilomètres', isCorrect: false },
            { id: 3, answerText: '200 millions de kilomètres', isCorrect: false },
            { id: 4, answerText: '250 millions de kilomètres', isCorrect: false }
        ]
    },
    {
        id: 19, 
        questionText: 'Sélectionnez les villes en France.', 
        answerType: "CHOIX_MULTIPLE", 
        level: 'avancé', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Paris', isCorrect: true },
            { id: 2, answerText: 'Lyon', isCorrect: true },
            { id: 3, answerText: 'Madrid', isCorrect: false },
            { id: 4, answerText: 'Marseille', isCorrect: true }
        ]
    },
    {
        id: 20, 
        questionText: 'La lumière peut-elle être polarisée ?', 
        answerType: "BOOLEAN", 
        level: 'avancé', 
        category: 'psychotechnique',
        answers: [
            { id: 1, answerText: 'Oui', isCorrect: true },
            { id: 2, answerText: 'Non', isCorrect: false }
        ]
    }
];



function Questions() {
    const [page, setPage] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openModifyModal, setOpenModifyModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [level, setLevel] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const rowsPerPage = 8;

    const handleOpenViewModal = (row) => {
        setSelectedRowData(row);
        setOpenViewModal(true);
    };

    const handleFilter = (row) => {
        console.log(level, category, type);
    };

    const handleOpenModifyModal = (row) => {
        setSelectedRowData(row);
        setOpenModifyModal(true);
    };

    const handleCloseViewModal = () => setOpenViewModal(false);
    const handleCloseModifyModal = () => setOpenModifyModal(false);

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
                        {rows.length} Questions
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
                            <TableCell
                                sx={{
                                    width: '42px',
                                    p: 0,
                                    pl: 2
                                }}
                            >
                                <Checkbox
                                    indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                                    checked={rows.length > 0 && selectedRows.length === rows.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'Select all candidates'
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Question</TableCell>
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isItemSelected = selectedRows.indexOf(row.id) !== -1;
                                return (
                                    <TableRow
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell sx={{ p: 0, pl: 2 }}>
                                            <Checkbox
                                                checked={isItemSelected}
                                                onChange={() => handleClick(row.id)}
                                                inputProps={{
                                                    'aria-label': `select row ${row.id}`
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 0 }}>{row.questionText}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.answerType}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.level}</TableCell>
                                        <TableCell sx={{ textAlign: 'center', py: 0 }}>{row.category}</TableCell>
                                        <TableCell sx={{ p: 0 }}>
                                            <Box sx={{ textAlign: 'center', py: 0 }}>
                                                <IconButton
                                                    onClick={() => handleOpenModifyModal(row)}
                                                    aria-label="Modify"
                                                >
                                                    <CreateRoundedIcon color='primary' />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleOpenViewModal(row)}
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
            <ViewModal open={openViewModal} handleClose={handleCloseViewModal} selectedRowData={selectedRowData} />
            <ModifyModal open={openModifyModal} handleClose={handleCloseModifyModal} selectedRowData={selectedRowData} handleSave={handleSave} />
        </Box>
    );
}

export default Questions;
