import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, IconButton, Checkbox, Typography } from '@mui/material';

//components
import Search from '../../../common/components/search';
import ViewModal from '../../../common/components/adminComponents.js/viewModal';
import ModifyModal from '../../../common/components/adminComponents.js/modifyModal';

//icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

const rows = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 4, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 5, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 6, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
  { id: 7, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
  { id: 8, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 9, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 10, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 11, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
  { id: 12, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
  { id: 13, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 14, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 15, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 16, name: 'John Doe', email: 'john.doe@example.com', phone: '0645653214', age: 30 },
  { id: 17, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0645653214', age: 28 },
  { id: 18, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '0645653214', age: 35 },
  { id: 19, name: 'Bob Sponge', email: 'bob.sponge@example.com', phone: '0645653214', age: 19 },
  { id: 20, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
  { id: 21, name: 'Hello World', email: 'hello.world@example.com', phone: '0645653214', age: 20 },
];

function Candidates() {
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
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
      <Box sx={{
        p: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Search />
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
          <IconButton
            sx={{ width: '45px', height: '45px' }}
            onClick={handleDelete}
            aria-label="Ajouter"
          >
            <DeleteRoundedIcon color='red' />
          </IconButton>
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
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={rows.length > 0 && selectedRows.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'Select all candidates'
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {row.phone}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {row.age}
                    </TableCell>
                    <TableCell sx={{ p: 0 }}>
                      <Box sx={{ textAlign: 'center' }}>
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
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>
      <ViewModal open={openViewModal} handleClose={handleCloseViewModal} selectedRowData={selectedRowData} />
      <ModifyModal open={openModifyModal} handleClose={handleCloseModifyModal} selectedRowData={selectedRowData} handleSave={handleSave} />
    </Box>
  );
}

export default Candidates;
