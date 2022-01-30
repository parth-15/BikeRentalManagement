import {
  Box,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {useEffect, useState} from 'react';
import {getAllBikes} from '../../dataAccess/bike';
import BikeCard from '../../components/home/BikeCard';

const useStyles = makeStyles(theme => ({
  paginationContainer: {display: 'flex', justifyContent: 'center'},
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  filter: {
    minWidth: 150,
    'border-radius': 3,
    marginRight: 15,
  },
  ratingFilter: {
    minWidth: 150,
    border: '1px solid black',
    'border-radius': 3,
  },
  cssLabel: {
    color: 'black',
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'black !important',
  },
}));

export default function Home() {
  const classes = useStyles();

  const [bikes, setBikes] = useState([]);
  const [model, setModel] = useState(null);
  const [color, setColor] = useState(null);
  const [location, setLocation] = useState(null);
  const [rating, setRating] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const filterObj = {
    ...(model && {
      model,
    }),
    ...(color && {
      color,
    }),
    ...(location && {
      location,
    }),
    rating,
    startdate: startDate,
    enddate: endDate,
  };
  useEffect(() => {
    // Pagination starts from zero in backend
    getAllBikes(currentPage - 1, filterObj).then(({data}) => {
      setBikes(data.rows);
      setTotalPages(Math.ceil(data.count / data.perPage));
    });
  }, [currentPage, model, color, location, rating, startDate, endDate]);

  const handleModelChange = e => {
    setCurrentPage(1);
    setModel(e.target.value);
  };

  const handleColorChange = e => {
    setCurrentPage(1);
    setColor(e.target.value);
  };

  const handleLocationChange = e => {
    setCurrentPage(1);
    setLocation(e.target.value);
  };

  const handleRatingChange = e => {
    setCurrentPage(1);
    setRating(e.target.value ? e.target.value : 0);
  };

  const handleStartDateChange = e => {
    setCurrentPage(1);
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setCurrentPage(1);
    setEndDate(e.target.value);
  };

  const handlePagination = (event, count) => {
    setCurrentPage(count);
  };

  return (
    <div>
      <Container>
        <Box my={5} className={classes.title}>
          <Typography component="h2" variant="h4" style={{flexGrow: 1}}>
            Bikes
          </Typography>
          <FormControl className={classes.filter}>
            <InputLabel>Minimum Rating</InputLabel>
            <Select value={rating} onChange={handleRatingChange}>
              {['0', '1', '2', '3', '4', '5'].map(rating => (
                <MenuItem key={rating} value={rating}>
                  {rating} +
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FormControl className={classes.filter}>
            <TextField
              id="outlined-basic"
              label="Model"
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              value={model}
              onChange={handleModelChange}
            />
          </FormControl>
          <FormControl className={classes.filter}>
            <TextField
              id="outlined-basic"
              label="Color"
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              value={color}
              onChange={handleColorChange}
            />
          </FormControl>
          <FormControl className={classes.filter}>
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              value={location}
              onChange={handleLocationChange}
            />
          </FormControl>
          <FormControl className={classes.filter}>
            <TextField
              id="outlined-basic"
              label="From"
              variant="outlined"
              type="date"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
                required: true,
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              value={startDate}
              onChange={handleStartDateChange}
            />
          </FormControl>
          <FormControl className={classes.filter}>
            <TextField
              id="outlined-basic"
              label="To"
              variant="outlined"
              type="date"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
                required: true,
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </FormControl>
        </Box>

        {bikes.map(bike => (
          <Box my={2} key={bike.id}>
            <BikeCard {...bike} />
          </Box>
        ))}

        {!bikes.length && (
          <Box my={30}>
            <Typography align="center" color="textSecondary" variant="h6">
              No Bike Available
            </Typography>
          </Box>
        )}
      </Container>

      <Box className={classes.paginationContainer} my={5}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handlePagination}
          page={currentPage}
        />
      </Box>
    </div>
  );
}
