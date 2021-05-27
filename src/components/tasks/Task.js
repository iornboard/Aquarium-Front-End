import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TaskItemPointViewr from '../taskItems/TaskItemPointViewr'
import TaskItemStatusViewer from '../taskItems/TaskItemStatusViewer'
import TaskItemChatViewer from '../taskItems/TaskItemChatViewer'
import TaskItemToolBar from '../taskItems/TaskItemToolBar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  Section1: {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '60vh',
    maxHeight: '60vh',

  },
  Section2 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    
    maxHeight: '20vh',
  },
  Section3 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '15vh',
    maxHeight: '15vh',
  },
  Section4 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '35vh',
    maxHeight: '35vh',
  },
  Section5 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '29vh',
    maxHeight: '29vh',
  },
  Section6: {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '80.5vh',
    maxHeight: '80.5vh',

  },
}));

export default function Task() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CssBaseline />

        <Grid container spacing={1}>

          
            <Grid item xs={1}>
                
                <Card className={classes.Section6}/>
                
            </Grid>  

            <Grid item xs={7}>
                
                <Card className={classes.Section1}/>
                <Card className={classes.Section2}>
                  <TaskItemPointViewr/>
                </Card>
                
            </Grid>  

            <Grid item xs={4}>

                <Card className={classes.Section3}>
                  <TaskItemToolBar/>
                </Card>
                <Card className={classes.Section4}>
                  <TaskItemChatViewer/>
                </Card>
                <Card className={classes.Section5}>
                  <TaskItemStatusViewer/>
                </Card>
            </Grid>  
      
        </Grid>  
        
    </div>
  );
}