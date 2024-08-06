import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, MenuItem, Select, FormControl, InputLabel, Typography, Button } from '@mui/material';

// Components
import Search from '../../../common/components/search';

// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { useNavigate } from 'react-router-dom';

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

function Tests() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const rowsPerPage = 8;

    const handleAdd = () => {
        navigate('Ajouter');
  };

    const openViewPage = (row) => navigate(`Voir/id=${row.id.toString()}`);
  
    const openModifyPage = (row) => navigate(`Modifier/id=${row.id.toString()}`);
  
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleDelete = () => console.log(selectedRows);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tests.map((row) => row.id);
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
          Tests
        </Typography>
        <Button variant="contained" onClick={handleAdd}>+ Ajouter</Button>
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
        </Box>
        <Button variant="outlined">Filtrer</Button>
      </Box>
      {/* Table */}
      <TableContainer sx={{ maxWidth: '100%', minHeight: '480px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6' fontWeight={500} color='primary'>
            {tests.length} Tests
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
              count={tests.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[rowsPerPage]}
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count !== -1 ? count : `plus de ${to}`}`}
            />
          </Box>
        </Box>
        <Table
          sx={{
            border: '1px solid',
            borderColor: 'grey.light',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: 1,
          }}
        >
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
                  indeterminate={selectedRows.length > 0 && selectedRows.length < tests.length}
                  checked={tests.length > 0 && selectedRows.length === tests.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'Select all candidates'
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Test Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                Level
              </TableCell>
              <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((test) => {
                const isItemSelected = selectedRows.indexOf(test.id) !== -1;
                return (
                  <TableRow
                    key={test.id}
                    selected={isItemSelected}
                  >
                    <TableCell sx={{ p: 0, pl: 2 }}>
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleClick(test.id)}
                        inputProps={{
                          'aria-label': `select row ${test.id}`
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0  }} >{test.name}</TableCell>
                    <TableCell sx={{ py: 0  }} >{test.category}</TableCell>
                    <TableCell sx={{ textAlign: 'center', py: 0 }}>
                      {test.level}
                    </TableCell>
                    <TableCell sx={{ p: 0 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <IconButton
                          onClick={()=> openModifyPage(test)}
                          aria-label="Modify"
                        >
                          <CreateRoundedIcon color='primary' />
                        </IconButton>
                        <IconButton
                          onClick={()=> openViewPage(test)}
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
    </Box>
  );
}

export default Tests;
