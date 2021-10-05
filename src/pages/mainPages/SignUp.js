import React, { useState } from "react"
import { useDispatch } from 'react-redux';

import { join } from '../../_actions/actionUser';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';

import Wave from 'react-wavify'


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
  background:{
    position: 'absolute',
    zIndex: '-4',
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    width: '100%',
  },
  waveform: {
    display: 'flex',
    position: 'absolute',
    zIndex: '-2',
    width: '100%',
    height: '100%',
    bottom: 0,
  },
  boxer:{
    display: 'flex',
    justifyContent: 'center',
    
    height: '100%',
  },
  paper: {
    height: '80%',
    width: '40%',
    margin: theme.spacing(8, 4),
    padding: '60px 50px 60px 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 20,
    borderColor: theme.palette.primary.main,
    minWidth: '50vh',
    maxWidth: '50vh',
    backgroundColor: 'white',
    
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formsub: {
  marginTop: "10px"
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

function SignUp({history}) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({  password: ""  , userEmail: "", userFullname: "" , userNickname: "" });

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }


  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    dispatch(join(values)) 
    setValues({  password: ""  , userEmail: "", userFullname: "" , userNickname: ""  })
    history.push("/")
  }

  
  return (
    <Box className={classes.root}>
      <Box className={classes.background}/>
      <Box className={classes.waveform}>
      <WaveHome/>
      </Box>

      <CssBaseline />
        <Box className={classes.boxer}>
        <div className={classes.paper}>
          <Avatar variant="rounded" className={classes.avatar} src={"./logo512.png"} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form className={classes.form} noValidate>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userEmail"
                label="이메일 주소"
                name="userEmail"
                value={values.userEmail}
                onChange={handleChange}
                autoComplete="userEmail"
              />
            </Grid>
            <Grid item xs={12}className={classes.formsub}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={values.password}
                onChange={handleChange}
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                
              />
            </Grid>
            <Grid item xs={12}className={classes.formsub}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userFullname"
                label="사용자 이름"
                name="userFullname"
                value={values.userFullname}
                onChange={handleChange}
                autoComplete="userFullname"
              />
            </Grid>
            <Grid item xs={12}className={classes.formsub}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userNickname"
                label="닉네임"
                name="userNickname"
                value={values.userNickname}
                onChange={handleChange}
                autoComplete="userNickname"
              />
            </Grid>
            <Grid item xs={12}className={classes.formsub}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="이메일을 통해 다양한 소식 받기"
              />
            </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {onSubmitHandler}
          >
            계정 생성
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                {/* signin */}
                이미 계정이 있으신가요
              </Link>
            </Grid>
          </Grid>
          
          </form>
          <Box mt={5}>
            <Copyright />
          </Box>
          </div>
          
      </Box>
    </Box>
  );
}

export default withRouter(SignUp)

const WaveHome = () => (
  <Wave fill='#ff8346'
        paused={false}
        options={{
          height: 600,
          amplitude: 20,
          speed: 0.20,
          points: 3
        }}
  />
)