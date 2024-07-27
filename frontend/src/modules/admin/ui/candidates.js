import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

// Données de démonstration pour les candidats
const rows = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 28 },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 35 },
  { id: 4, name: 'bob sponge', email: 'bob.sponge@example.com', age: 19 },
  {id:5, name:'hello world ', email:'hello.world@example.com', age:20},
  { id: 6, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
  { id: 7, name: 'Jane Smith', email: 'jane.smith@example.com', age: 28 },
  { id: 8, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 35 },
  { id: 9, name: 'bob sponge', email: 'bob.sponge@example.com', age: 19 },
  {id:10, name:'hello world ', email:'hello.world@example.com', age:20},
  { id: 11, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
  { id: 12, name: 'Jane Smith', email: 'jane.smith@example.com', age: 28 },
  { id: 13, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 35 },
  { id: 14, name: 'bob sponge', email: 'bob.sponge@example.com', age: 19 },
  {id:15, name:'hello world ', email:'hello.world@example.com', age:20},
  { id: 16, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
  { id: 17, name: 'Jane Smith', email: 'jane.smith@example.com', age: 28 },
  { id: 18, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 35 },
  { id: 19, name: 'bob sponge', email: 'bob.sponge@example.com', age: 19 },
  {id:20, name:'hello world ', email:'hello.world@example.com', age:20},
  {id:21, name:'hello world ', email:'hello.world@example.com', age:20},

];

function Candidates() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

 //handle page cghange
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //handle row changes
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <TableContainer
        component= 'Paper'
        sx={{
          marginTop: '20px',
        }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Âge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default Candidates;

