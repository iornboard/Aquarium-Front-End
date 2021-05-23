import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Task from '../../components/tasks/Task'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export default function TestTask() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="xl">
        
            <Task/>

        </Container>
    </div>
  );
}