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
import {deleteUser, updateUser} from '../../../dataAccess/user';
import ConfirmModal from '../../common/ConfirmModal';
import EditUserModal from './EditUserModal';

export default function UserTable({users, count, fetchUsers, page, setPage, handleOpenAlert}) {
  const [editTarget, setEditTarget] = useState({
    username: '',
    password: '',
    role: '',
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = user => {
    setEditTarget(user);
    setEditModalOpen(true);
  };

  const handleEditModal = userInput => {
    updateUser(editTarget.id, userInput).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'User updated successfully');
        setEditModalOpen(false);
        fetchUsers(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  const handleDeleteConfirm = () => {
    deleteUser(deleteTargetId).then(({success, error}) => {
      if (success !== false) {
        handleOpenAlert('success', 'User deleted successfully');
        setDeleteModalOpen(false);
        fetchUsers(page);
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
    fetchUsers(page);
  };

  return (
    <>
      <EditUserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={editTarget}
        onEdit={handleEditModal}
      />

      <ConfirmModal
        title="Delete User"
        text="Are you sure you want to delete this user?"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
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
