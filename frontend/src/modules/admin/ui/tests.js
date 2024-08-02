import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography, TextField } from '@mui/material';

// Components
import ViewModal from '../../../common/components/adminComponents.js/viewModal';
import ModifyModal from '../../../common/components/adminComponents.js/modifyModal';

// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

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
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchLevel, setSearchLevel] = useState('');
  const rowsPerPage = 8;

  const handleOpenViewModal = (row) => {
    setSelectedRowData(row);
    setOpenViewModal(true);
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

  const handleSave = () => console.log('updated successfully');

  const filteredTests = tests.filter((test) => {
    return (
      (test.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       test.category.toLowerCase().includes(searchCategory.toLowerCase()) || 
       test.level.toLowerCase().includes(searchLevel.toLowerCase()))
    );
  });

  return (
    <Box sx={{ p: '10px' }}>
      <Box sx={{
        p: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TextField
              label="Search by Category"
              variant="outlined"
              size="small"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
            <TextField
              label="Search by Level"
              variant="outlined"
              size="small"
              value={searchLevel}
              onChange={(e) => setSearchLevel(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography fontWeight={500} color='primary'>
              sélectionné : {selectedRows.length}
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <IconButton
                sx={{ width: '45px', height: '45px' }}
                onClick={handleDelete}
                aria-label="Delete"
              >
                <DeleteRoundedIcon color='red' />
              </IconButton>
              <IconButton
                sx={{ width: '45px', height: '45px' }}
                onClick={() => handleOpenModifyModal(null)} // Open Add Modal with no data
                aria-label="Add"
              >
                <AddRoundedIcon color='green' />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <TableContainer sx={{ p: '0 20px 0 20px', maxWidth: '100%' }}>
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
                    indeterminate={selectedRows.length > 0 && selectedRows.length < filteredTests.length}
                    checked={filteredTests.length > 0 && selectedRows.length === filteredTests.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'Select all tests'
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
              {filteredTests
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
                      <TableCell>{test.name}</TableCell>
                      <TableCell>{test.category}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {test.level}
                      </TableCell>
                      <TableCell sx={{ p: 0 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <IconButton
                            onClick={() => handleOpenModifyModal(test)}
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
          <TablePagination
              component="div"
              count={filteredTests.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[rowsPerPage]}
            />
          </TableContainer>
        </Box>
        <ViewModal open={openViewModal} handleClose={handleCloseViewModal} selectedRowData={selectedRowData} />
        <ModifyModal open={openModifyModal} handleClose={handleCloseModifyModal} selectedRowData={selectedRowData} handleSave={handleSave} />
      </Box>
    );
  }

export default Tests;
