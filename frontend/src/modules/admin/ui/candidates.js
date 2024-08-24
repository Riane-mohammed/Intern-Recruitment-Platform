import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography } from '@mui/material';

// Components
import Search from '../../../common/components/search';
import ViewModal from '../../../common/components/adminComponents.js/candidate/viewModal';
import ModifyModal from '../../../common/components/adminComponents.js/candidate/modifyModal';

// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

// Helpers
import { calculateAge } from '../../../common/utils/helpers';

// APIs
import { deleteCandidates, getAllCandidates, updateCandidate } from '../../../common/api/admin';

function Candidates() {
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [selectedCandidateData, setSelectedCandidateData] = useState(null);
  const rowsPerPage = 8;
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const CandidatesData = await getAllCandidates();
        setCandidates(CandidatesData);
      } catch (error) {
        console.error("Failed to fetch Candidates:", error);
      }
    };

    getCandidates();
  }, []);

  const handleOpenViewModal = (row) => {
    setSelectedCandidateData(row);
    setOpenViewModal(true);
  };

  const handleOpenModifyModal = (row) => {
    setSelectedCandidateData(row);
    setOpenModifyModal(true);
  };

  const handleCloseViewModal = () => setOpenViewModal(false);
  const handleCloseModifyModal = () => setOpenModifyModal(false);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleDelete = async () => {
    try {
      await deleteCandidates(selectedRows);
      setSelectedRows([]);
      const CandidatesData = await getAllCandidates();
      setCandidates(CandidatesData);
    } catch (error) {
      console.error("Failed to delete candidates:", error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = candidates.map((candidate) => candidate.email);
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

  const handleSave = async (candidateDetails) => {
    try {
      await updateCandidate(candidateDetails);
      const CandidatesData = await getAllCandidates();
      setCandidates(CandidatesData);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  return (
    <Box sx={{ p: '10px' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' fontWeight={500} color='primary'>
          Candidats
        </Typography>
      </Box>
      {/* Filter Bar */}
      <Box sx={{ my: 2, p: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
        <Search />
      </Box>
      {/* Table */}
      {candidates &&
        <TableContainer sx={{ maxWidth: '100%', minHeight: '480px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h6' fontWeight={500} color='primary'>
              {candidates.length} Candidats
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
                count={candidates.length}
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
                  indeterminate={selectedRows.length > 0 && selectedRows.length < candidates.length}
                  checked={candidates.length > 0 && selectedRows.length === candidates.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'Select all candidates',
                  }}
                />
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Nom Complet</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                  numéro de téléphone
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                  Age
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((candidate) => {
                  const isItemSelected = selectedRows.includes(candidate.email);
                  return (
                    <TableRow
                      key={candidate.email}
                      selected={isItemSelected}
                    >
                      <TableCell sx={{ p: 0, pl: 2 }}>
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleClick(candidate.email)}
                          inputProps={{
                            'aria-label': `select candidate ${candidate.email}`
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 0 }}>{candidate.firstName} {candidate.lastName}</TableCell>
                      <TableCell sx={{ py: 0 }}>{candidate.email}</TableCell>
                      <TableCell sx={{ textAlign: 'center', py: 0 }}>{candidate.phone}</TableCell>
                      <TableCell sx={{ textAlign: 'center', py: 0 }}>{calculateAge(candidate.birthday)}</TableCell>
                      <TableCell sx={{ p: 0 }}>
                        <Box sx={{ textAlign: 'center', py: 0 }}>
                          <IconButton
                            onClick={() => handleOpenModifyModal(candidate)}
                            aria-label="Modify"
                          >
                            <CreateRoundedIcon color='primary' />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenViewModal(candidate)}
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
      }
      <ViewModal open={openViewModal} handleClose={handleCloseViewModal} selectedCandidateData={selectedCandidateData} />
      <ModifyModal open={openModifyModal} handleClose={handleCloseModifyModal} selectedCandidateData={selectedCandidateData} handleSave={handleSave} />
    </Box>
  );
}

export default Candidates;
