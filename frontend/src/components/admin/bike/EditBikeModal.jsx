import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  model: yup.string().required(''),
  color: yup.string().required(''),
  location: yup.string().required(''),
  available: yup.boolean().required(),
});

export default function EditBikeModal({open, onClose, bike, onEdit}) {
  const formik = useFormik({
    initialValues: {
      model: bike.model,
      color: bike.color,
      location: bike.location,
      available: bike.available,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: values => {
      onEdit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Bike</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            label="Model"
            id="model"
            name="model"
            type="text"
            variant="outlined"
            fullWidth
            value={formik.values.model}
            onChange={formik.handleChange}
            error={formik.touched.model && formik.errors.model}
            helperText={formik.errors.model}
            style={{marginTop: 15, marginBottom: 15}}
          />

          <TextField
            autoFocus
            label="Color"
            id="color"
            name="color"
            type="text"
            variant="outlined"
            fullWidth
            value={formik.values.color}
            onChange={formik.handleChange}
            error={formik.touched.color && formik.errors.color}
            helperText={formik.errors.color}
            style={{marginTop: 15, marginBottom: 15}}
          />

          <TextField
            autoFocus
            label="Location"
            id="location"
            name="location"
            type="text"
            variant="outlined"
            fullWidth
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && formik.errors.location}
            helperText={formik.errors.location}
            style={{marginTop: 15, marginBottom: 15}}
          />

          <Select
            label="Available"
            name="available"
            value={formik.values.available}
            onChange={formik.handleChange}
            error={formik.touched.available && formik.errors.available}
            fullWidth
            style={{marginTop: 15, marginBottom: 15}}
          >
            <MenuItem value>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{marginTop: 15, marginBottom: 15}}
          >
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
