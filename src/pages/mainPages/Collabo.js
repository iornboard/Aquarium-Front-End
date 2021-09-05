import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Task from '../../components/tasks/Task'
import TaskItemImageViewer from '../../components/taskItems/TaskItemImageViewer'

import { userInfo } from '../../_actions/actionUser';
import { useDispatch } from 'react-redux';

import OAuthGoogle from '../../components/oAuth/OAuthGoogle'
import OAuthFacebook from '../../components/oAuth/OAuthFacebook'
import OAuthNaver from '../../components/oAuth/OAuthNaver'

import TestVideo from '../../components/test/testVideo'

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
  const dispatch = useDispatch();

  const handleChangeIndex = (index) => {
    dispatch(userInfo(1))
    .then( res => console.log(res))
  };

  return (
    <div className={classes.root}>
        <CssBaseline />

        

        <Container component="main" className={classes.main} maxWidth="xl">
        <TestVideo/>

        {/* <OAuthGoogle/>
        <OAuthFacebook/>
        <OAuthNaver/>
        <Button  variant="contained" color="primary">
          <OAuthNaver/>
        </Button>
        <Button onClick={handleChangeIndex} variant="contained" color="primary">
        Primary
        </Button>
            <TaskItemImageViewer/>
            <Task/> */}

        </Container>
    </div>
  );
}