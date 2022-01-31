import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';

export default function ReserveTable({reserves, page, fetchReserves, setPage, count}) {
  const handlePagination = (event, page) => {
    setPage(page);
    fetchReserves(page);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>UserId</TableCell>
            <TableCell>BikeId</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserves.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.user && row.user.id}</TableCell>
              <TableCell>{row.bike && row.bike.id}</TableCell>
              <TableCell>{row.user && row.user.username}</TableCell>
              <TableCell>{row.bike && row.bike.model}</TableCell>
              <TableCell>{row.from}</TableCell>
              <TableCell>{row.to}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            count={count}
            page={page}
            onChangePage={handlePagination}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
