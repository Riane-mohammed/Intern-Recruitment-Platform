import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, Typography, Button, Paper, Checkbox } from '@mui/material';

function Contact() {
  // State variables
  const [claims, setClaims] = useState([
    { id: 1, nom: 'John Doe', email: 'john.doe@example.com', message: 'probléme de quizz' },
    { id: 2, nom: 'Jane Smith', email: 'jane.smith@example.com', message: 'Probleme de timer' },
    { id: 3, nom: 'azert yuio ', email: 'azert.yuio@example.com', message: 'Probléme de connexion' },
    // Add more claims here
  ]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;
  const [selectedClaims, setSelectedClaims] = useState([]);

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

  // Handle respond action
  const handleRespond = () => {
    alert('Réponse envoyée à la réclamation');
  };

  return (
    <Box sx={{ p: '10px' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' fontWeight={500} color='primary'>
          Réclamations
        </Typography>
      </Box>
      {/* Table */}
      <TableContainer component={Paper} sx={{ maxWidth: '100%', minHeight: '480px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6' fontWeight={500} color='primary'>
            {claims.length} Réclamations
          </Typography>
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
                    <TableCell sx={{ py: 0 }} >{claim.nom}</TableCell>
                    <TableCell sx={{ py: 0 }} >{claim.email}</TableCell>
                    <TableCell sx={{ py: 0 }} >{claim.message}</TableCell>
                    <TableCell sx={{ p: 0 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Button variant="contained" color="primary" onClick={() => handleRespond()}>
                          Répondre
                        </Button>
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

export default Contact;
