import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch , useSelector } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '25vh',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
  middleAvatar: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(0, 2),
  },
  section2: {
    margin: theme.spacing(0,2),
  },
}));

export default function MiddleDividers() {
  const classes = useStyles();

  const taskInfo = useSelector( store => store.task.usingTask , []);
  const {taskName, taskDescription, taskType, taskStartDate, taskEndDate, user} = {...taskInfo}

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
  
  }

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center" > 
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {taskName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {dDay == 0 ? "D-day" : "D-"+dDay }
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <div>
          <AvatarGroup max={4}>
            { user ? user.map( us => <Avatar src={us.userImgUrl} className={classes.middleAvatar}/> ) : "로딩 중.."}
          </AvatarGroup>
        </div>
        <div>
          <Chip className={classes.chip} label={taskType} />
        </div>
      </div>
    </div>
  );
}