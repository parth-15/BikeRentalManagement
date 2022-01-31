import {
  IconButton,
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
import {useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {deleteBike, updateBike} from '../../../dataAccess/bike';
import ConfirmModal from '../../common/ConfirmModal';
import EditBikeModal from './EditBikeModal';

export default function BikeTable({bikes, page, fetchBikes, setPage, count, handleOpenAlert}) {
  const [editTarget, setEditTarget] = useState({
    model: '',
    color: '',
    location: '',
    available: '',
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = bike => {
    setEditTarget(bike);
    setEditModalOpen(true);
  };

  const handleEditModal = bikeInput => {
    updateBike(editTarget.id, bikeInput).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'Bike updated successfully');
        setEditModalOpen(false);
        fetchBikes(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  const handleDeleteConfirm = () => {
    deleteBike(deleteTargetId).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'Bike deleted successfully');
        setDeleteModalOpen(false);
        fetchBikes(page);
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
    fetchBikes(page);
  };

  return (
    <>
      <EditBikeModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        bike={editTarget}
        onEdit={handleEditModal}
      />

      <ConfirmModal
        title="Delete Bike"
        text="Are you sure you want to delete this bike?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikes.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.available ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handleEdit(row);
                    }}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
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
