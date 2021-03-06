import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import {IconButton, InputAdornment} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {me, signup} from '../../dataAccess/auth';
import {useUpdateAuthenticatedUser} from '../../providers/AuthProvider';
import {AUTHTOKEN} from '../../utils/constant';
import Alert from '../../components/common/Alert';

const validationSchema = yup.object({
  username: yup.string().required('Please enter your username').min(3),
  password: yup.string().required('This field cannot be empty').min(6),
});

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const updateAuthenticatedUser = useUpdateAuthenticatedUser();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      signup(values).then(({success, token, error}) => {
        if (success) {
          localStorage.setItem(AUTHTOKEN, token);

          me().then(({success, user}) => {
            if (success) {
              handleOpenAlert('success', 'Signup successful');
              updateAuthenticatedUser(user);
            } else {
              handleOpenAlert('error', 'Authentication failed');
            }
          });
        } else {
          handleOpenAlert('error', error);
        }
      });
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && formik.errors.username}
                helperText={formik.errors.username}
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.errors.password}
                label="Password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <Alert
        open={openAlert}
        severity={alertSeverity}
        handleClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </Container>
  );
}
