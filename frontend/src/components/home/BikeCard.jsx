import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import LocationIcon from '@material-ui/icons/LocationOn';
import {DirectionsBikeOutlined, CancelOutlined} from '@material-ui/icons';
import {useState} from 'react';
import CreateReserveModal from '../reserve/CreateReserveModal';
import CustomAlert from '../common/Alert';
import {createReserve} from '../../dataAccess/reserve';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  model: {
    fontSize: 14,
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 15,
  },
  rating: {display: 'flex', alignItems: 'center', marginTop: 5},
});

export default function BikeCard({id, model, color, location, rating, available}) {
  const classes = useStyles();

  const [createReserveModalOpen, setCreateReserveModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const toggleCreateModalOpen = () => {
    setCreateReserveModalOpen(!createReserveModalOpen);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCreateReserveModal = reserveInput => {
    createReserve(reserveInput).then(({success, error}) => {
      if (success) {
        handleOpenAlert('success', 'Reserve created successfully');
        setCreateReserveModalOpen(false);
      } else {
        handleOpenAlert('error', `Error: ${error}`);
      }
    });
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="h2">
              {model}
            </Typography>

            <Box className={classes.location}>
              <LocationIcon color="action" />
              <Typography color="textSecondary">&nbsp;&nbsp;{location}</Typography>
            </Box>

            <Typography color="textPrimary">Color: {color}</Typography>

            <Box className={classes.rating}>
              <Rating value={rating} precision={0.1} readOnly />
              <Box ml={2}>
                <Typography>Rating: {rating ? rating.toFixed(2) : 'Unrated'}</Typography>
              </Box>
            </Box>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={available} color="success" />}
                label="Available"
              />
            </FormGroup>
            {available && (
              <Button color="primary" variant="contained" onClick={toggleCreateModalOpen}>
                Reserve
              </Button>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        <CreateReserveModal
          open={createReserveModalOpen}
          onClose={toggleCreateModalOpen}
          onCreate={handleCreateReserveModal}
          bike={id}
        />
        <CustomAlert
          open={openAlert}
          severity={alertSeverity}
          handleClose={() => setOpenAlert(false)}
          message={alertMessage}
        />
      </div>
    </div>
  );
}
