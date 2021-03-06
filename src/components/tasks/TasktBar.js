import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { setTask } from '../../_actions/actionTask'

import Task from './Task'

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(1),
      width : '100%' 
    },
    layout: {
      marginTop: theme.spacing(1),
      background : '#2ECCFA',
      width : '100%' 
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 30,
    },
    pos: {
      marginBottom: 12,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    daybar: {
      height: 30,
      borderRadius: 5,
    },
    taskbar: {
        marginLeft: theme.spacing(1),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));


  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box  width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }


export default function TaskBarComp(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { taskName , projectType , taskStatus ,  taskType , taskStartDate , taskEndDate  , user } = {...props.task}

  const [progress, setProgress] = React.useState(0);
  const [dDay, setdDay] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(setTask(props.task))
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setTask())
    setOpen(false);
  };

  useEffect(() => {
      putLeftDay()
  });

  const putLeftDay = () => {

    var start = new Date(taskStartDate);
    var end = new Date(taskEndDate);
    var now = new Date();

    var leftDay = Math.floor((end - now)/86400000)
    var allDay = Math.floor((end - start)/86400000)

    setdDay(leftDay)
    setProgress(((allDay-leftDay)/allDay)*100)

  }
  
 

  return (
    <div className={classes.root}>

        <Button variant="contained" color="primary" onClick={handleClickOpen} disableElevation className={classes.layout} >
          <Grid container spacing={2}>

            <Grid item xs={4} className={classes.taskbar} >      
              <Box display="flex" alignItems="center" className={classes.taskbar}>
                <Typography gutterBottom className={classes.title}>
                  {taskName}
                </Typography>  
                <Chip label={taskType} size='small' />
              </Box>
              <Box display="flex" alignItems="center">
              <AvatarGroup max={4}>
                { user ? user.map( us => <Avatar src={us.userImgUrl} className={classes.large}/> ) : "로딩 중.."}
              </AvatarGroup>
              <Breadcrumbs aria-label="breadcrumb">
                { user ? user.map( us => <Typography gutterBottom className={classes.taskbar} > { us.userNickname } </Typography>  ): "로딩 중.."}
              </Breadcrumbs>
              </Box>
            </Grid>
            <Grid item xs={7} style={{padding:16}} >
              <Typography >
                  D-{dDay}
              </Typography> 
              <br />
              <LinearProgressWithLabel value={progress} className={classes.daybar}/>
              <Typography >
                  {taskStatus}
              </Typography> 
            </Grid>
            
          </Grid>
        </Button>


        <Dialog
          fullScreen
          maxWidth='xl'
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{taskName}</DialogTitle>
        <DialogContent>

          <Task/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            저장
          </Button>
        </DialogActions>

      </Dialog>


    </div>
  );
}



