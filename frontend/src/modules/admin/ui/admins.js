import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography, Button, Modal } from '@mui/material';

// Components
import Search from '../../../common/components/search';

// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

// APIs
import { deleteAdmins, downgradeAdmin, getAllAdmins, upgradeAdmin } from '../../../common/api/admin';
import { useNavigate } from 'react-router-dom';

const AlertModal = ({open, title, handleClose, color, icon, message, hendleConfirm }) => {

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
                    width: 500,
                    bgcolor: 'background.paper',
                    border: `2px solid ${color} `,
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 4,
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="div"
                    display='flex'
                    alignItems='center'>
                    {icon}{title}
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{
                        mt: 2,
                        ml: 4
                    }}>
                        {message}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        mt: 2
                    }}
                >
                    <Button
                        variant='outlined'
                        onClick={handleClose}
                        sx={{
                            mr: 2,
                            color: color,
                            borderColor: color,
                            '&:hover': {
                                borderColor: color,
                            },
                        }}
                    >
                        Annuler</Button>
                    <Button
                        variant='contained'
                        onClick={hendleConfirm}
                        sx={{
                            bgcolor: color,
                            '&:hover': {
                                bgcolor: color,
                            },
                        }}>Confirmer</Button>
                </Box>
            </Box>
        </Modal>
    )
}

function Admins() {
    const navigate = useNavigate();
    
    const [openUpgrade, setOpenUpgrade] = useState(false);
    const [openDowngrade, setOpenDowngrade] = useState(false);

    const [admins, setAdmins] = useState([]);
    const [selectedAdminId, setSelectedAdminId] = useState(null);
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState([]);

    const rowsPerPage = 8;

    const handleCloseUpgrade = () => setOpenUpgrade(false);
    const handleCloseDowngrade = () => setOpenDowngrade(false);

    const handleOpenUpgrade = (id) => {
        setSelectedAdminId(id);
        setOpenUpgrade(true);
    }
    const handleOpenDowngrade = (id) => {
        setSelectedAdminId(id);
        setOpenDowngrade(true);
    }

    const handleConfirmUpgrade = async () => {
        try {
            await upgradeAdmin(selectedAdminId);
            getAdmins();
        } catch (error) {
            console.error("Failed to upgrade admin with id " + selectedAdminId + " : " , error);
        }
        handleCloseUpgrade();
    }

    const handleConfirmDowngrade = async () => {
        try {
            await downgradeAdmin(selectedAdminId);
            getAdmins();
        } catch (error) {
            console.error("Failed to downgrade admin with id " + selectedAdminId + " : " , error);
        }
        handleCloseDowngrade();
    }

    const getAdmins = async () => {
        try {
            const AdminsData = await getAllAdmins();
            setAdmins(AdminsData);
            setFilteredAdmins(AdminsData);
        } catch (error) {
            console.error("Failed to fetch Admins:", error);
        }
    };

    useEffect(() => {
        getAdmins();
    }, []);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleDelete = async () => {
        try {
            await deleteAdmins(selectedRows);
            setSelectedRows([]);
            setSearchQuery('');
            getAdmins();
        } catch (error) {
            console.error("Failed to delete Admins:", error);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = filteredAdmins.map((admin) => admin.id);
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

    const handleAdd = () => {
        navigate('Ajouter');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        setFilteredAdmins(
            admins.filter((admin) =>
                admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                admin.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, admins]);

    return (
        <Box sx={{ p: '10px' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' fontWeight={500} color='primary'>
                    Administrateurs
                </Typography>
                <Button variant="contained" onClick={handleAdd}>+ Ajouter</Button>
            </Box>
            {/* Filter Bar */}
            <Box sx={{ my: 2, p: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                <Search value={searchQuery} onChange={handleSearchChange} placeholder="Rechercher par email" />
            </Box>
            {/* Table */}
            {admins &&
                <TableContainer sx={{ maxWidth: '100%', minHeight: '480px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='h6' fontWeight={500} color='primary'>
                            {filteredAdmins.length} Adminisrateurs
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
                                count={filteredAdmins.length}
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
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredAdmins.length}
                                        checked={filteredAdmins.length > 0 && selectedRows.length === filteredAdmins.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'Select all candidates',
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Nom d'utilisateur</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} >Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align='center'>Super Administrateur</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align='center'>Activé</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAdmins
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((admin) => {
                                    const isItemSelected = selectedRows.indexOf(admin.id) !== -1;
                                    return (
                                        <TableRow
                                            key={admin.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell sx={{ p: 0, pl: 2 }}>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onChange={() => handleClick(admin.id)}
                                                    inputProps={{
                                                        'aria-label': `select admin ${admin.id}`
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ py: 0 }}>{admin.username}</TableCell>
                                            <TableCell sx={{ py: 0 }}>{admin.email}</TableCell>
                                            <TableCell sx={{ py: 0 }} align='center'>
                                                {admin.superAdmin ?
                                                    <>
                                                        <IconButton
                                                            aria-label="super"
                                                            disabled={admin.superAdmin}
                                                        >
                                                            <CheckBoxIcon color='green' />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="downgrade"
                                                            onClick={() => handleOpenDowngrade(admin.id)}
                                                        >
                                                            <DownloadRoundedIcon align='red' />
                                                        </IconButton>
                                                    </>
                                                    :
                                                    <IconButton
                                                        aria-label="upgrade"
                                                        disabled={admin.superAdmin}
                                                        onClick={() => handleOpenUpgrade(admin.id)}
                                                    >
                                                        <FileUploadRoundedIcon color='primary' />
                                                    </IconButton>
                                                }
                                            </TableCell>
                                            <TableCell sx={{ py: 0 }} align='center'>
                                                <IconButton
                                                    aria-label="done"
                                                    disabled
                                                >
                                                    {admin.active ?
                                                        <CheckBoxIcon color='green' />
                                                        :
                                                        <DisabledByDefaultRoundedIcon color='red' />
                                                    }
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>

                    </Table>
                </TableContainer>
            }
            <AlertModal
                open={openUpgrade}
                title="Confirmer l'élévation de privilèges"
                handleClose={handleCloseUpgrade}
                color='red.main'
                icon={<FileUploadRoundedIcon  color='red' sx={{ mr: 1 }} />}
                message='Êtes-vous sûr de vouloir élever cet utilisateur au statut de Super Administrateur ?'
                hendleConfirm={handleConfirmUpgrade} 
                />
            <AlertModal
                open={openDowngrade}
                title="Confirmer la rétrogradation"
                handleClose={handleCloseDowngrade}
                color='red.main'
                icon={<DownloadRoundedIcon color='red' sx={{ mr: 1 }} />}
                message='Êtes-vous sûr de vouloir rétrograder cet utilisateur du statut de Super Administrateur ?'
                hendleConfirm={handleConfirmDowngrade} 
                />
        </Box>
    );
}

export default Admins
