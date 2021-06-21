import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import UserJoinList from '../../components/UserJoinList'
import { getTasks , createTask } from '../../_actions/actionTask'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  tab: {
    flexGrow: 1,
  },
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const taskOne = {
  taskName : "기말고사",
  taskStatus : "진행중",
  taskImgUrl : "",
  taskVideoUrl : "",
  taskMemo : "",
  taskType : "기말고사",
  taskStartDate : '2021-05-15T09:45',
  taskEndDate: '2021-06-15T11:00',
  taskProperties : "" ,
  taskIsWorking : false,
  taskIsEnd : false,
  taskIsAccept : false,
  userName : "남현수",
}

// 수정






export default function FullWidthTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const userInfo = useSelector( store => store.auth.userData , []);
  const {userId, userNickname, userImgUrl} = {...userInfo}

  const joinUsersInfos = useSelector( store => store.user.joinUsers , []);


  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [today, setToday] = React.useState();
  const [values, setValues] = useState([]);

  // useEffect(() => {
  //   var now = new Date();
  //   setToday(now)
  // }, 1);

  const handleClickOpen = () => {
    setOpen(true);
  };



  const handleCloseCancel = () => {
    
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleDateFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]:  new Date(value) })
  }

  return (
    <div className={classes.root}>

      <CssBaseline />      
      <Container component="main" className={classes.main} maxWidth="lg">
        
       </Container>

          <Typography variant="h6" gutterBottom>
            사용자 작업 생성
          </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField required name="taskName" id="taskName" label="사용자 작업 이름" fullWidth autoComplete="cc-name" onChange = {handleFormChange} />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="taskStartDate"
              id="taskStartDate"
              label="시작일자"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {handleDateFormChange}
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="taskEndDate"
              id="taskEndDate"
              label="종료일자"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {handleDateFormChange}
            />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField required name="taskType" id="taskType" label="작업 형식" fullWidth autoComplete="cc-name"  onChange = {handleFormChange} />
              
            </Grid>
            <Grid item xs={12} md={12}>
            <Typography variant="h6" gutterBottom>
              참가 인원
            </Typography>
              {/* <UserJoinList/> */}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField required name="taskDescription" id="taskDescription" label="작업 설명" multiline rows={4} rowsMax={8} fullWidth variant="outlined"  onChange = {handleFormChange}/>
            </Grid>
            <Grid item xs={12}>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                label="위 내용을 이해하였고, 약관의 대해 동의 합니다."
              />
            </Grid>
          </Grid>
        
          <Button href="/collabomain"  color="primary" autoFocus>
            동의
          </Button>



    </div>
    
  );
  
}


