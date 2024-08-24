import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, MenuItem, Select, FormControl, InputLabel, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import Search from '../../../common/components/search';
import ViewTest from '../../../common/components/adminComponents.js/tests/viewTest';

// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

// API
import { deleteTests, getAllTests } from '../../../common/api/admin';

function Tests() {
  const navigate = useNavigate();

  // State variables
  const [tests, setTests] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const rowsPerPage = 8;

  // Fetch all tests on component mount
  useEffect(() => {
    const getTests = async () => {
      try {
        const TestsData = await getAllTests();
        setTests(TestsData);
      } catch (error) {
        console.error("Failed to fetch Tests:", error);
      }
    };

    getTests();
  }, []);

  // Open the modal to view a test
  const handleOpenViewModal = (test) => {
    setSelectedTest(test);
    setOpenViewModal(true);
  };

  // Close the view test modal
  const handleCloseViewModal = () => setOpenViewModal(false);

  // Navigate to the add test page
  const handleAdd = () => {
    navigate('Ajouter');
  };
  
  // Navigate to the modify test page
  const openModifyPage = (row) => navigate(`Modifier/id=${row.id.toString()}`);
  
  // Handle page change in pagination
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Handle delete action (currently logs selected rows)
  const handleDelete = async () => {
      try {
          await deleteTests(selectedTests);
          setSelectedTests([]);
          const TestsData = await getAllTests();
          setTests(TestsData);
      } catch (error) {
          console.error("Failed to delete Tests:", error);
      }
  };
  // Handle selecting or deselecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tests.map((row) => row.id);
      setSelectedTests(newSelecteds);
    } else {
      setSelectedTests([]);
    }
  };

  // Handle row selection
  const handleClick = (id) => {
    const selectedIndex = selectedTests.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTests, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTests.slice(1));
    } else if (selectedIndex === selectedTests.length - 1) {
      newSelected = newSelected.concat(selectedTests.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTests.slice(0, selectedIndex),
        selectedTests.slice(selectedIndex + 1),
      );
    }

    setSelectedTests(newSelected);
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
        {tests &&
        <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6' fontWeight={500} color='primary'>
            {tests.length} Tests
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {selectedTests.length > 0 && (
              <>
                <Typography fontWeight={500} color='primary'>
                  sélectionné : {selectedTests.length}
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
                  indeterminate={selectedTests.length > 0 && selectedTests.length < tests.length}
                  checked={tests.length > 0 && selectedTests.length === tests.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'Select all candidates'
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Nom Du Test</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Catégorie</TableCell>
              <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                Niveau
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
                  const isItemSelected = selectedTests.indexOf(test.id) !== -1;
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
                      <TableCell sx={{ py: 0 }} >{test.title}</TableCell>
                      <TableCell sx={{ py: 0 }} >{test.section.name}</TableCell>
                      <TableCell sx={{ textAlign: 'center', py: 0 }}>
                        {test.level.name}
                      </TableCell>
                      <TableCell sx={{ p: 0 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <IconButton
                            onClick={() => openModifyPage(test)}
                            aria-label="Modify"
                          >
                            <CreateRoundedIcon color='primary' />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenViewModal(test)}
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
        </>}
      </TableContainer>
      <ViewTest open={openViewModal} handleClose={handleCloseViewModal} selectedTest={selectedTest} />
    </Box>
  );
}

export default Tests;
