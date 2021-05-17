import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import AvatarComp from './AvatarComp'
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
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
    }
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


export default function FloatingActionButtons(props) {
  const classes = useStyles();

  const { taskName , projectType , taskStatus ,  taskType , taskStartDate , taskEndDate  , userName } = {...props.task}

  
  const [progress, setProgress] = React.useState(0);
  const [dDay, setdDay] = React.useState(0);


  useEffect(() => {
    return () => {
      putLeftDay()
    };
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

        <Card className={classes.root}>

          <Grid container className={classes.root} spacing={2}>

            <Grid item xs={4} className={classes.taskbar} >      
              <Box display="flex" alignItems="center" className={classes.taskbar}>
                <Typography gutterBottom className={classes.title}>
                  {taskName}
                </Typography>  
                <Chip label={taskType} size='small' />
              </Box>
              <Box display="flex" alignItems="center">
                <AvatarComp/>
                <Typography gutterBottom >
                  {userName}
                </Typography> 
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

        </Card>

    </div>
  );
}



