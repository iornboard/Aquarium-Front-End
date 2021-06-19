import React, { useState } from "react"
import { useDispatch } from 'react-redux';
import { login } from '../../_actions/actionUser';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import OAuthGoogle from '../../components/oAuth/OAuthGoogle'
import OAuthFacebook from '../../components/oAuth/OAuthFacebook'
import OAuthNaver from '../../components/oAuth/OAuthNaver'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  google: { 
     background: 'linear-gradient(45deg, #ffffff 90%, #ff1744 90%)',
     color: 'black',
     margin: theme.spacing(1, 0, 1) 
  },
  facebook: { 
     background: 'linear-gradient(45deg, #ffffff 90%, #3f51b5 90%)', 
     color: 'black' ,
     margin: theme.spacing(1, 0, 1)
  },
  naver: { 
     background: 'linear-gradient(45deg, #ffffff 90%, #8bc34a 90%)', 
     color: 'black',
     margin: theme.spacing(1, 0, 1)
  },
  oauths: { 
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
 },
}));

function SignInSide(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({  password: ""  , username: "" });

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    dispatch(login(values))
     .then(res => {
      if(res){
        localStorage.setItem('jwt', res.payload); //jwt형태로 만들어서  localStorage저장
        props.history.push('/')//화면이동
      } else {
        alert("this is enable account!")
      }
     })
    
    setValues({});

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="username"
              autoFocus
              onChange = {handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {onSubmitHandler}
            >
              Sign In
            </Button>
            <Button fullWidth  variant="contained" color="primary"  className={classes.submit} onClick={handleClickOpen}>
              계정을 연동할 수 있나요?
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호를 잊으셨나요?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"did you have any account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            사용 가능한 계정을 선택해 보세요
          </DialogContentText>
          
          {/* 구버전 */}
          {/* href="http://localhost:8080/oauth2/authorization/google" href="http://localhost:8080/oauth2/authorization/facebook" href="http://localhost:8080/oauth2/authorization/naver" */}
          
          <Button fullWidth  variant="contained" color="primary" className={classes.google}>
            <OAuthGoogle />
          </Button>
          <Button fullWidth  variant="contained" color="primary" className={classes.facebook}>
            <OAuthFacebook />
          </Button>
          <Button fullWidth  variant="contained" color="primary" className={classes.naver}>
            <OAuthNaver />
          </Button>
        </DialogContent>
        </Dialog>
      </Grid>
    </Grid>


  );
}  

export default withRouter(SignInSide)