import {Box, Button, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';

import {createUser, getAllUsers} from '../../../dataAccess/user';
import CreateUserModal from './CreateUserModal';
import CustomAlert from '../../common/Alert';
import UserTable from './UserTable';

export default function UserTab() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchUsers = page => {
    getAllUsers(page).then(({data}) => {
      setUsers(data.rows);
      setCount(data.count);
    });
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const toggleCreateModalOpen = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCreateModal = userInput => {
    createUser(userInput).then(({success, error}) => {
      if (success) {
        handleOpenAlert('success', 'User created successfully');
        setCreateModalOpen(false);
        fetchUsers(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  return (
    <div>
      <Box my={5} style={{display: 'flex'}}>
        <Typography variant="h5" style={{flexGrow: 1}}>
          Manage Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={toggleCreateModalOpen}
        >
          Add User
        </Button>
      </Box>

      <CreateUserModal
        open={createModalOpen}
        onClose={toggleCreateModalOpen}
        onCreate={handleCreateModal}
      />

      <UserTable
        users={users}
        page={page}
        fetchUsers={fetchUsers}
        setPage={setPage}
        count={count}
        handleOpenAlert={handleOpenAlert}
      />

      <CustomAlert
        open={openAlert}
        severity={alertSeverity}
        handleClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </div>
  );
}
