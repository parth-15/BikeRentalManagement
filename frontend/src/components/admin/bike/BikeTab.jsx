import {Box, Button, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {useEffect, useState} from 'react';
import {createBike, getAllBikes} from '../../../dataAccess/bike';
import CustomAlert from '../../common/Alert';
import BikeTable from './BikeTable';
import CreateBikeModal from './CreateBikeModal';

export default function BikeTab() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchBikes = page => {
    getAllBikes(page).then(({data}) => {
      setBikes(data.rows);
      setCount(data.count);
    });
  };

  useEffect(() => {
    fetchBikes(page);
  }, [page]);

  const toggleCreateModalOpen = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCreateModal = bikeInput => {
    createBike(bikeInput).then(({success, error}) => {
      if (success) {
        handleOpenAlert('success', 'Bike created successfully');
        setCreateModalOpen(false);
        fetchBikes(page);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  return (
    <div>
      <Box my={5} style={{display: 'flex'}}>
        <Typography variant="h5" style={{flexGrow: 1}}>
          Manage Bikes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={toggleCreateModalOpen}
        >
          Add Bike
        </Button>
      </Box>

      <CreateBikeModal
        open={createModalOpen}
        onClose={toggleCreateModalOpen}
        onCreate={handleCreateModal}
      />

      <BikeTable
        bikes={bikes}
        page={page}
        fetchBikes={fetchBikes}
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
