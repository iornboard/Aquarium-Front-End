import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TaskBarViewer  from '../../components/tasks/TaskBarViewer'
import TaskScheduleViewer  from '../../components/tasks/TaskScheduleViewer'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const userInfo = useSelector( store => store.auth.userData , []);
  const {userId, userNickname, userImgUrl} = {...userInfo}

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    const taskBody = { taskName : "이름없는 작업" , taskDescription : "내용 없음" ,  userIdList : [userId] }

    dispatch(createTask(taskBody))
      .then(res => console.log(res))
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };



  return (
    <div className={classes.root}>

      <CssBaseline />      
      <Container component="main" className={classes.main} maxWidth="lg">
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>

        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Management" {...a11yProps(0)} />
            <Tab label="schedule" {...a11yProps(1)} />
          </Tabs>
        </AppBar>


        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >

          <TabPanel value={value} index={0} dir={theme.direction}>
              <TaskBarViewer />  {/* 작업 모음 리스트 뷰어 */}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
              <TaskScheduleViewer/> {/* 작업 스케쥴 리스트 뷰어 */}
          </TabPanel>
          
        </SwipeableViews>
       
       </Container>

       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"작업 내역을 생성하시겠습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="h6" gutterBottom>
          사용자 작업 생성
          </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="taskName" label="사용자 작업 이름" fullWidth autoComplete="cc-name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="cardNumber" label="Card number" fullWidth autoComplete="cc-number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="taskType" label="작업 형식" fullWidth autoComplete="cc-name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="taskDescription" label="작업 설명" fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            비동의
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            동의
          </Button>
        </DialogActions>
      </Dialog>


    </div>
    
  );
  
}
  
  const currentDate = '2018-11-01';
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];

