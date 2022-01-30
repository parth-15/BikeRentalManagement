import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  makeStyles,
  TextField,
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useAuthenticatedUser} from '../../providers/AuthProvider';

const useStyles = makeStyles({
  formField: {marginTop: 15, marginBottom: 15},
  dialog: {marginTop: 25},
});

const validationSchema = yup.object({
  from: yup.date().required(),
  to: yup.date().required(),
});

export default function CreateReserveModal({open, onClose, onCreate, bike}) {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  const formik = useFormik({
    initialValues: {
      from: new Date().toISOString().slice(0, 10),
      to: new Date().toISOString().slice(0, 10),
    },
    validationSchema,
    onSubmit: (values, {resetForm}) => {
      onCreate({...values, user: user.id, bike});
      resetForm();
    },
  });

  return (
    <Dialog className={classes.dialog} open={open} onClose={onClose}>
      <DialogTitle>Reserve Bike</DialogTitle>
      <DialogContent className={classes.formField}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="From"
              variant="outlined"
              type="date"
              value={formik.values.from}
              onChange={e => {
                formik.setFieldValue('from', e.target.value);
              }}
              required
              InputProps={{inputProps: {min: new Date().toISOString().slice(0, 10)}}}
            />
            <TextField
              id="outlined-basic"
              label="To"
              variant="outlined"
              type="date"
              value={formik.values.to}
              onChange={e => {
                formik.setFieldValue('to', e.target.value);
              }}
              required
              InputProps={{inputProps: {min: new Date().toISOString().slice(0, 10)}}}
            />
          </FormControl>

          <Button variant="contained" color="primary" type="submit" className={classes.formField}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
