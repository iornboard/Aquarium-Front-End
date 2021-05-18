import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import TasktBar from './TasktBar'


const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

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

export default function TaskScheduleViewer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Container component="main" className={classes.main} maxWidth="md">
      <Paper>
        <Scheduler data={schedulerData} >
        <ViewState currentDate={currentDate}/>
        <DayView startDayHour={9} endDayHour={14} />
        <Appointments />
        </Scheduler>
      </Paper>
      </Container>
    
    </div>
  );
}