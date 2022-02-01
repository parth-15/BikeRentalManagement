import {Box, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import CustomAlert from '../../components/common/Alert';
import {getAllReserves} from '../../dataAccess/reserve';
import {useAuthenticatedUser} from '../../providers/AuthProvider';
import ReserveTable from './ReserveTable';

export default function ReserveTab() {
  const user = useAuthenticatedUser();

  const [reserves, setReserves] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchReserves = page => {
    getAllReserves(page, user.id).then(({data}) => {
      setReserves(data.rows);
      setCount(data.count);
    });
  };

  useEffect(() => {
    fetchReserves(page);
  }, [page]);

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };
  return (
    <div>
      <Box my={5} style={{display: 'flex'}}>
        <Typography variant="h5" style={{flexGrow: 1}}>
          Manage Reserves
        </Typography>
      </Box>

      <ReserveTable
        reserves={reserves}
        page={page}
        fetchReserves={fetchReserves}
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
