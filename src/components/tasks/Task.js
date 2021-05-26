import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TaskItemPointViewr from '../taskItems/TaskItemPointViewr'
import TaskItemStatusViewer from '../taskItems/TaskItemStatusViewer'
import TaskItemChatViewer from '../taskItems/TaskItemChatViewer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  testSection1: {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '60vh',
    maxHeight: '60vh',

  },
  testSection2 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '20vh',
    maxHeight: '20vh',
  },
  testSection3 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '10vh',
    maxHeight: '10vh',
  },
  testSection4 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '40vh',
    maxHeight: '40vh',
  },
  testSection5 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '29vh',
    maxHeight: '29vh',
  },
}));

export default function Task() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CssBaseline />

        <Grid container spacing={1}>

            <Grid item xs={7}>
                
                <Card className={classes.testSection1}/>
                <Card className={classes.testSection2}>
                  <TaskItemPointViewr/>
                </Card>
                
            </Grid>  

            <Grid item xs={5}>

                <Card className={classes.testSection3}/>
                <Card className={classes.testSection4}>
                  <TaskItemChatViewer/>
                </Card>
                <Card className={classes.testSection5}>
                  <TaskItemStatusViewer/>
                </Card>
            </Grid>  
      
        </Grid>  
        
    </div>
  );
}