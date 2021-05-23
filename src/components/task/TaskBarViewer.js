import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import TasktBar from './TasktBar'


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


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  list: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  gridList: {
    height: 450,
    width: '100%'
  },
  tab: {
    flexGrow: 1,
  },
}));

export default function StickyFooter(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>

      <Container component="main" className={classes.main} maxWidth="md">
        <GridList  cellHeight={160} className={classes.gridList} cols={0}>

          <TasktBar task={taskOne} className={classes.list}/>
          <TasktBar task={taskOne} className={classes.list}/>
          <TasktBar task={taskOne} className={classes.list}/>

        </GridList>
      </Container>

    </div>
  );
}