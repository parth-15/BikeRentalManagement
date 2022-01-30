import {Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField} from '@material-ui/core';
import {useFormik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  rating: yup.number('Input rating').moreThan(0).lessThan(6).integer(),
});

const useStyles = makeStyles({
  formField: {marginTop: 15, marginBottom: 15},
});

export default function CreateReviewModal({open, onClose, onSubmit}) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      rating: 5,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rate Bike</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            label="Rating"
            id="rating"
            type="number"
            variant="outlined"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            error={formik.touched.rating && formik.errors.rating}
            helperText={formik.errors.rating}
            fullWidth
            className={classes.formField}
          />

          <Button variant="contained" color="primary" type="submit" className={classes.formField}>
            Rate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
