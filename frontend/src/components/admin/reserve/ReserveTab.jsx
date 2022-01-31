import {Box, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {getAllReserves} from '../../../dataAccess/reserve';
import ReserveTable from './ReserveTable';

export default function ReserveTab() {
  const [reserves, setReserves] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const fetchReserves = page => {
    getAllReserves(page).then(({data}) => {
      setReserves(data.rows);
      setCount(data.count);
    });
  };

  useEffect(() => {
    fetchReserves(page);
  }, [page]);

  return (
    <div>
      <Box my={5} style={{display: 'flex'}}>
        <Typography variant="h5" style={{flexGrow: 1}}>
          View Reserves
        </Typography>
      </Box>

      <ReserveTable
        reserves={reserves}
        page={page}
        fetchReserves={fetchReserves}
        setPage={setPage}
        count={count}
      />
    </div>
  );
}
