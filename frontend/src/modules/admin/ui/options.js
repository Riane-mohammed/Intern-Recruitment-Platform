import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    Box, IconButton, Checkbox, Typography, Grid, Paper, TextField, Button, Chip
} from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// Modal components
import AddSectionModal from '../../../common/components/adminComponents.js/options/addSectionModal';
import EditSectionModal from '../../../common/components/adminComponents.js/options/editSectionModal';
import ViewSectionModal from '../../../common/components/adminComponents.js/options/viewSectionModal';

//apis
import { addLevel, addSetion, deleteLevel, deleteSections, getAllLevels, getAllSections, updateSection } from '../../../common/api/admin';

//helpers
import { truncateText } from '../../../common/utils/helpers';

function Options() {
    const [page, setPage] = useState(0);
    const rowsPerPage = 4;
    const [selectedRows, setSelectedRows] = useState([]);

    // State for levels
    const [levels, setLevels] = useState([]);
    const [newLevel, setNewLevel] = useState('');

    // State for sections
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState('');
    const [updatedSectionName, setUpdatedSectionName] = useState('');
    const [newSectionDescription, setNewSectionDescription] = useState('');
    const [updatedSectionDescription, setUpdatedSectionDescription] = useState('');
    const [selectedSection, setSelectedSection] = useState(null);


    const getSections = async () => {
        try {
            const SectionsData = await getAllSections();
            setSections(SectionsData);
        } catch (error) {
            console.error("Failed to fetch Sections:", error);
        }
    };

    const getLevels = async () => {
        try {
            const LevelsData = await getAllLevels();
            setLevels(LevelsData);
        } catch (error) {
            console.error("Failed to fetch Levels:", error);
        }
    };
    useEffect(() => {
        getLevels();
        getSections();
    }, []);

    // Handlers for levels
    const handleAddLevel = async () => {
        try {
            await addLevel(newLevel);
            getLevels();
        } catch (error) {
            console.error("Failed to add Level:", error);
        }
    };

    const handleDeleteLevel = async (id) => {
        try {
            await deleteLevel(id);
            getLevels();
        } catch (error) {
            console.error("Failed to delete Level:", error);
        }
    };

    // Handlers for sections
    const handleAddSection = async () => {
        try {
            await addSetion({ name: newSectionName, description: newSectionDescription });
            getSections();
        } catch (error) {
            console.error("Failed to add Section:", error);
        }
        handleCloseAddModal()
    };

    const handleEditSection = async () => {
        try {
            await updateSection(selectedSection.id, { name: updatedSectionName, description: updatedSectionDescription });
            setSelectedSection(null);
            setUpdatedSectionDescription('');
            setUpdatedSectionName('');
            getSections();
        } catch (error) {
            console.error("Failed to update section :", error);
        }
        handleCloseEditModal();
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleDelete = async() => {
        try {
            await deleteSections(selectedRows);
            setSelectedRows([]);
            getSections();
        } catch (error) {
            console.error("Failed to delete sections:", error);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = sections.map((section) => section.id);
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

    // Modals state
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleOpenEditModal = (section) => {
        setSelectedSection(section);
        setUpdatedSectionName(section.name);
        setUpdatedSectionDescription(section.description);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleOpenViewModal = (section) => {
        setSelectedSection(section);
        setOpenViewModal(true);
    };

    const handleCloseViewModal = () => setOpenViewModal(false);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant='h5' fontWeight={500} color='primary' gutterBottom>
                Options
            </Typography>

            <Grid container spacing={3} direction="column">
                {/* Levels Section */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2, borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                        <Typography variant='h6' fontWeight={500} color='primary' gutterBottom>Gestion des Niveau</Typography>
                        <Grid container>
                            <Grid item xs={10}>
                                <TextField
                                    label="Nouveau"
                                    value={newLevel}
                                    onChange={(e) => setNewLevel(e.target.value)}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                                <Button variant="contained" color="primary" fullWidth onClick={handleAddLevel}>
                                    Ajouter
                                </Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="h6">Tous Les Niveaux</Typography>
                            {levels &&
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {levels.map((level, index) => (
                                        <Chip
                                            key={index}
                                            label={level.name}
                                            onDelete={() => handleDeleteLevel(level.id)}
                                            sx={{ margin: 0.5 }}
                                        />
                                    ))}
                                </Box>
                            }
                        </Box>
                    </Paper>
                </Grid>

                {/* Sections Section */}
                <Grid item xs={12} sx={{ py: '0 !important', mt: 2 }}>
                    <TableContainer elevation={3} sx={{ maxWidth: '100%', minHeight: '360px', p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant='h6' fontWeight={500} color='primary'>Gestion des Catégories</Typography>
                            <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
                                Ajouter
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                {selectedRows.length > 0 && (
                                    <>
                                        <Typography fontWeight={500} color='primary'>
                                            Sélectionné : {selectedRows.length}
                                        </Typography>
                                        <IconButton sx={{ width: '45px', height: '45px' }} onClick={handleDelete} aria-label="delete">
                                            <DeleteRoundedIcon color='error' />
                                        </IconButton>
                                    </>
                                )}
                                <TablePagination
                                    component="div"
                                    count={sections.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPageOptions={[rowsPerPage]}
                                    labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`}
                                />
                            </Box>
                        </Box>
                        <Table sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: '10px', overflow: 'hidden', boxShadow: 1 }}>
                            <TableHead sx={{ bgcolor: 'blue.light' }}>
                                <TableRow>
                                    <TableCell sx={{ width: '42px', p: 0, pl: 2 }}>
                                        <Checkbox
                                            indeterminate={selectedRows.length > 0 && selectedRows.length < sections.length}
                                            checked={sections.length > 0 && selectedRows.length === sections.length}
                                            onChange={handleSelectAllClick}
                                            inputProps={{
                                                'aria-label': 'Select all sections',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>Titre</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align='center'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {sections &&
                                <TableBody>
                                    {sections
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((section) => {
                                            const isItemSelected = selectedRows.includes(section.id);
                                            return (
                                                <TableRow
                                                    key={section.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell sx={{ p: 0, pl: 2 }}>
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={() => handleClick(section.id)}
                                                            inputProps={{
                                                                'aria-label': `select section ${section.id}`
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ py: 0 }}>{section.name}</TableCell>
                                                    <TableCell sx={{ py: 0 }}>{truncateText(section.description,50)}</TableCell>
                                                    <TableCell align='center' sx={{ py: 0 }}>
                                                        <IconButton onClick={() => handleOpenViewModal(section)} aria-label="view">
                                                            <VisibilityIcon color='primary' />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleOpenEditModal(section)} aria-label="edit">
                                                            <EditIcon color='secondary' />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            {/* Modals */}
            <AddSectionModal
                open={openAddModal}
                onClose={handleCloseAddModal}
                onAdd={handleAddSection}
                newSectionName={newSectionName}
                setNewSectionName={setNewSectionName}
                newSectionDescription={newSectionDescription}
                setNewSectionDescription={setNewSectionDescription}
            />
            <EditSectionModal
                open={openEditModal}
                onClose={handleCloseEditModal}
                onSave={handleEditSection}
                section={selectedSection}
                setNewSectionName={setUpdatedSectionName}
                setNewSectionDescription={setUpdatedSectionDescription}
                updatedSectionName={updatedSectionName}
                updatedSectionDescription={updatedSectionDescription}
            />
            <ViewSectionModal
                open={openViewModal}
                onClose={handleCloseViewModal}
                section={selectedSection}
            />
        </Box>
    );
}

export default Options;
