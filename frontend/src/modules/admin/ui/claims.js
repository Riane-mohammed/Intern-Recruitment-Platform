import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, Typography, Paper, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from '@mui/material';

//icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import InfoIcon from '@mui/icons-material/Info';

//helpers
import { truncateText } from '../../../common/utils/helpers';

//apis
import { deleteReclamation, getAllReclamations, replyToReclamation } from '../../../common/api/admin';
import LoadingOverlay from '../../../common/components/loadingOverlay';

function Claims() {
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedClaims, setSelectedClaims] = useState([]);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentClaim, setCurrentClaim] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState({
    subject: '',
    response: '',
    reclamationId: null,
  });
  const rowsPerPage = 11;

  useEffect(() => {
    const getClaims = async () => {
      try {
        const ClaimsData = await getAllReclamations();
        setClaims(ClaimsData);
      } catch (error) {
        console.error("Failed to fetch Claims:", error);
      }
    };
    getClaims();
  }, []);

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Handle selecting or deselecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = claims.map((claim) => claim.id);
      setSelectedClaims(newSelecteds);
    } else {
      setSelectedClaims([]);
    }
  };

  // Handle row selection
  const handleClick = (id) => {
    const selectedIndex = selectedClaims.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedClaims, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedClaims.slice(1));
    } else if (selectedIndex === selectedClaims.length - 1) {
      newSelected = newSelected.concat(selectedClaims.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedClaims.slice(0, selectedIndex),
        selectedClaims.slice(selectedIndex + 1),
      );
    }

    setSelectedClaims(newSelected);
  };

  const handleDelete = async () => {
    try {
      await deleteReclamation(selectedClaims);
      setSelectedClaims([]);
      const ClaimsData = await getAllReclamations();
      setClaims(ClaimsData);
    } catch (error) {
      console.error("Failed to delete claims:", error);
    }
  };

  const handleOpenReplyModal = (claim) => {
    setReplyMessage({
      subject: '',
      response: '',
      reclamationId: claim.id,
    });
    setCurrentClaim(claim);
    setReplyModalOpen(true);
  };

  const handleOpenViewModal = (claim) => {
    setCurrentClaim(claim);
    setViewModalOpen(true);
  };

  const handleSendReply = async () => {
    setIsLoading(true);
    try {
      await replyToReclamation(replyMessage);
      setError('');
      setSuccess('Réponse envoyé avec succès!');
      const ClaimsData = await getAllReclamations();
      setClaims(ClaimsData);
    } catch (error) {
      console.error("Failed to fetch Claims:", error);
      setError('Erreur lors de l\'envoi du Réponse.');
    } finally {
      setIsLoading(false);
    }
    setReplyMessage({
      subject: '',
      response: '',
      reclamationId: null,
    });
    setReplyModalOpen(false);
  };

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} />

      <Box sx={{ p: '10px' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5' fontWeight={500} color='primary'>
            Réclamations
          </Typography>
        </Box>
        {/* Table */}
        {claims &&
          <TableContainer component={Paper} sx={{ maxWidth: '100%', minHeight: '600px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h6' fontWeight={500} color='primary'>
                {claims.length} Réclamations
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {selectedClaims.length > 0 && (
                  <>
                    <Typography fontWeight={500} color='primary'>
                      sélectionné : {selectedClaims.length}
                    </Typography>
                    <IconButton sx={{ width: '45px', height: '45px' }} onClick={handleDelete} aria-label="delete">
                      <DeleteRoundedIcon color='error' />
                    </IconButton>
                  </>
                )}
                <TablePagination
                  component="div"
                  count={claims.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[rowsPerPage]}
                  labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count !== -1 ? count : `plus de ${to}`}`}
                />
              </Box>
            </Box>
            <Table sx={{ border: '1px solid', borderColor: 'grey.light', borderRadius: '10px', overflow: 'hidden', boxShadow: 1 }}>
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
                      indeterminate={selectedClaims.length > 0 && selectedClaims.length < claims.length}
                      checked={claims.length > 0 && selectedClaims.length === claims.length}
                      onChange={handleSelectAllClick}
                      inputProps={{
                        'aria-label': 'Select all claims'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((claim) => {
                    const isItemSelected = selectedClaims.indexOf(claim.id) !== -1;
                    return (
                      <TableRow
                        key={claim.id}
                        selected={isItemSelected}
                      >
                        <TableCell sx={{ p: 0, pl: 2 }}>
                          <Checkbox
                            checked={isItemSelected}
                            onChange={() => handleClick(claim.id)}
                            inputProps={{
                              'aria-label': `select row ${claim.id}`
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 0 }} >{claim.name}</TableCell>
                        <TableCell sx={{ py: 0 }} >{claim.email}</TableCell>
                        <TableCell sx={{ py: 0 }} >{truncateText(claim.message, 30)}</TableCell>
                        <TableCell sx={{ p: 0 }}>
                          <Box sx={{ textAlign: 'center', py: 0 }}>
                            <IconButton
                              aria-label="View"
                              onClick={() => handleOpenViewModal(claim)}
                            >
                              <VisibilityRoundedIcon color='blue' />
                            </IconButton>
                            {claim.status ?
                              <IconButton
                                aria-label="done"
                                disabled
                              >
                                <DoneAllIcon color='green' />
                              </IconButton>
                              :
                              <IconButton
                                aria-label="Reply"
                                onClick={() => handleOpenReplyModal(claim)}
                              >
                                <ReplyIcon color='primary' />
                              </IconButton>}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        }

        {/* Reply Modal */}
        <Dialog open={replyModalOpen} onClose={() => setReplyModalOpen(false)}>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ReplyIcon />
              <Typography variant="h6">Répondre</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Sujet"
              fullWidth
              variant="outlined"
              value={replyMessage.subject}
              onChange={(e) => setReplyMessage({ ...replyMessage, subject: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Message"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={replyMessage.response}
              onChange={(e) => setReplyMessage({ ...replyMessage, response: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReplyModalOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleSendReply} color="primary">
              Envoyer
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Modal */}
        <Dialog
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          PaperProps={{
            sx: {
              width: '500px', // Set the width of the modal
              borderRadius: '12px', // Set the border radius of the modal
            },
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: 2 }}>
              <InfoIcon color="grey.text" />
              <Typography variant="h6">Détails</Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ ml: 2 }}>
            {currentClaim && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography variant="body1" color='primary' fontWeight={500}>
                  Nom:
                </Typography>
                <Typography ml={2}>
                  {currentClaim.name}
                </Typography>
                <Typography variant="body1" color='primary' fontWeight={500}>
                  Email:
                </Typography>
                <Typography ml={2}>
                  {currentClaim.email}
                </Typography>
                <Typography variant="body1" color='primary' fontWeight={500}>
                  Message:
                </Typography>
                <Typography ml={2}>
                  {currentClaim.message}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewModalOpen(false)} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Snackbar */}
        <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setSuccess('')} severity="success">
            {success}
          </Alert>
        </Snackbar>
        {/* Error Snackbar */}
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default Claims;
