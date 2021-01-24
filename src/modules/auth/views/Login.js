import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  setLoggedIn,
  setUserDetails,
  setAccountType
} from '../../../redux/action';
import Axios from 'axios';
import { ADMIN, USER } from 'src/redux/constants';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Grassroots
      </Link>{' '}
      {2021}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme();

theme.typography.h6 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/static/images/merittrack.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  imageWrapper: {
    background:
      'linear-gradient(45eg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.15))',
    height: '100%',
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

function Login({ setLoggedInMain, setAccountTypeMain, setUserDetailsMain }) {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);
  async function authenticate(values) {
    setError('');
    try {
      const url = 'http://localhost:4000/auth/apiM/login'
      // const url='http://192.168.3.45:42009/user/login'
      console.log("values", values)

      const res = await Axios.post(url, values);
      console.log("login api", res.data)
      const obj = res.data.userDetails;
      const { accessToken } = res.data;
  
      localStorage.setItem("jwtToken", accessToken);
     
      localStorage.setItem('AgentSIPID', res.data.userDetails.External_num);
      localStorage.setItem('role',res.data.userDetails.role);
      setUserDetailsMain(obj);
      setAccountTypeMain(obj.role === 'Agent' ? ADMIN : USER);
      setLoggedInMain(true);
      setError(false);
      
    } catch (err) {
      setLoggedInMain(false);
      setError(true);
    }
  }

  async function getOtp(e) {

    console.log("values", username)

    console.log("password", password)
    var userData = {
      userName: username,
      password: e.target.value,
    }
    const url = 'http://localhost:4000/auth/apiM/sendOTP'


    const res = await Axios.post(url, userData);
    console.log("login api", res.data)
    if (res.data.statusCode === 200) {
      setEnable(false)
    }



  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image}>
        <div className={classes.imageWrapper} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        style={{ display: 'flex' }}
      >
        <div className={`${classes.paper}`}>
          <div>
            <div className={classes.avatarWrapper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
                role: '',
                AgentType: 'Inbound',
                AgentSIPID: '', 
                OTP:''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required'),
                OTP: Yup.string()
                  .max(255)
                  .required('OTP is required')
              })}
              onSubmit={values => {

                // console.log('values', values);
                localStorage.setItem('AgentType', values.AgentType);
                localStorage.setItem('role', values.role);
               

                // navigate('/app/dashboard', { replace: true });
                authenticate(values);
              }}
              onBlur={e => {
                console.log("onblur")
                if (e.target.name === "password") {
                  setPassword(e.target.value)
                }
                if (e.target.name === "email") {
                  setUsername(e.target.value)
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={e => {
                      setUsername(e.target.value)
                      // getOtp()
                    }}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={e => {
                      setPassword(e.target.value)
                      getOtp(e)
                    }}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  {/* <TextField
                    error={Boolean(touched.role && errors.role)}
                    fullWidth
                    helperText={touched.role && errors.role}008618
                    label="role"
                    margin="normal"
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.role}
                    variant="outlined"
                  /> */}
                  {/* <TextField
                    error={Boolean(touched.AgentType && errors.AgentType)}
                    fullWidth
                    helperText={touched.AgentType && errors.AgentType}
                    label="Agent Type"
                    margin="normal"
                    name="AgentType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.AgentType}
                    variant="outlined"
                  /> */}
                  {/* <TextField
                    error={Boolean(touched.AgentSIPID && errors.AgentSIPID)}
                    fullWidth
                    helperText={touched.AgentSIPID && errors.AgentSIPID}
                    label="Agent SIPID"
                    margin="normal"
                    name="AgentSIPID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.AgentSIPID}
                    variant="outlined"
                  /> */}
                  {enable === false ? <ThemeProvider theme={theme}>
                    <Typography variant="h6">OTP Sent Sucessfully</Typography>
                  </ThemeProvider> : <></>}
                  <TextField
                    error={Boolean(touched.OTP && errors.OTP)}
                    fullWidth
                    helperText={touched.OTP && errors.OTP}
                    label="OTP"
                    margin="normal"
                    name="OTP"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.OTP}
                    variant="outlined"
                    disabled={enable}
                  />
                  {!!error && (
                    <Box my={1}>
                      <Typography color="secondary">
                        Invalid Username/Password
                      </Typography>
                    </Box>
                  )}
                  <Box my={2} mt={5}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: type => dispatch(setAccountType(type)),
  setLoggedInMain: val => dispatch(setLoggedIn(val))
});

export default connect(null, mapDispatchToProps)(Login);
