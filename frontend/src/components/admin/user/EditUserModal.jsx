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
  username: yup.string().min(3).required(''),
  password: yup.string().required('').min(6),
});

export default function EditUserModal({open, onClose, user, onEdit}) {
  const formik = useFormik({
    initialValues: {
      username: user.username,
      password: user.password,
      role: user.role,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: values => {
      onEdit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            label="Username"
            id="username"
            name="username"
            type="text"
            variant="outlined"
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && formik.errors.username}
            helperText={formik.errors.username}
            style={{marginTop: 15, marginBottom: 15}}
          />

          <TextField
            label="Password"
            variant="outlined"
            id="name"
            type="password"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.errors.password}
            required
            style={{marginTop: 15, marginBottom: 15}}
          />

          <Select
            label="Role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && formik.errors.role}
            fullWidth
            style={{marginTop: 15, marginBottom: 15}}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
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
