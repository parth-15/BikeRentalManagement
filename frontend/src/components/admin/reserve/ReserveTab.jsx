import {Box, TextField, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {getAllReserves} from '../../../dataAccess/reserve';
import CustomAlert from '../../common/Alert';
import ReserveTable from './ReserveTable';

export default function ReserveTab() {
  const [reserves, setReserves] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [bike, setBike] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const fetchReserves = (page, user, bike) => {
    getAllReserves(page, user, bike).then(({data, error}) => {
      if (data) {
        setReserves(data.rows);
        setCount(data.count);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  useEffect(() => {
    fetchReserves(page, user, bike);
  }, [page, user, bike]);

  const handleUserChange = e => {
    setPage(0);
    setUser(e.target.value);
  };

  const handleBikeChange = e => {
    setPage(0);
    setBike(e.target.value);
  };

  return (
    <div>
      <Box my={5} style={{display: 'flex'}}>
        <Typography variant="h5" style={{flexGrow: 1}}>
          View Reserves
        </Typography>
        <TextField
          label="UserId"
          style={{marginRight: 100}}
          variant="outlined"
          value={user}
          onChange={handleUserChange}
        />
        <TextField label="BikeId" variant="outlined" value={bike} onChange={handleBikeChange} />
      </Box>

      <ReserveTable
        reserves={reserves}
        page={page}
        fetchReserves={fetchReserves}
        setPage={setPage}
        count={count}
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
