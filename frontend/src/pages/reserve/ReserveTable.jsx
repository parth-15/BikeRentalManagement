import {useState} from 'react';
import {
  IconButton,
  Paper,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteReserve} from '../../dataAccess/reserve';
import ConfirmModal from '../../components/common/ConfirmModal';
import CreateReviewModal from '../../components/review/CreateReviewModal';
import {createReview} from '../../dataAccess/review';
import {useAuthenticatedUser} from '../../providers/AuthProvider';

export default function ReserveTable({
  reserves,
  page,
  fetchReserves,
  setPage,
  count,
  handleOpenAlert,
}) {
  const [reviewTarget, setReviewTarget] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleReview = review => {
    setReviewTarget(review);
    setReviewModalOpen(true);
  };

  const handleReviewModal = reviewInput => {
    createReview({...reviewInput, user: reviewTarget.user, bike: reviewTarget.bike.id}).then(
      ({success, error}) => {
        if (success) {
          handleOpenAlert('success', 'Review created successfully');
          setReviewModalOpen(false);
        } else {
          handleOpenAlert('error', `Error: ${error}`);
        }
      }
    );
  };

  const handleDeleteConfirm = () => {
    deleteReserve(deleteTargetId).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'Reserve deleted successfully');
        setDeleteModalOpen(false);
        fetchReserves(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  const handleDelete = id => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const handlePagination = (event, page) => {
    setPage(page);
    fetchReserves(page);
  };
  return (
    <>
      <CreateReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewModal}
      />

      <ConfirmModal
        title="Delete Reserve"
        text="Are you sure you want to delete this reserve?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>BikeId</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reserves.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.bike && row.bike.id}</TableCell>
                <TableCell>{row.bike && row.bike.model}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleReview(row);
                    }}
                  >
                    Rate
                  </Button>
                  <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
    </>
  );
}
