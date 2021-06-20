import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TaskItemPointViewr from '../taskItems/TaskItemPointViewr';
import TaskItemStatusViewer from '../taskItems/TaskItemStatusViewer';
import TaskItemChatViewer from '../taskItems/TaskItemChatViewer';
import TaskItemToolBar from '../taskItems/TaskItemToolBar';
import TaskItemMovieViewer from '../taskItems/TaskItemMovieViewer' ;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  Section: {
    marginTop: theme.spacing(1),
  },
}));

export default function Task() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CssBaseline />

        <Grid container spacing={1}>

          
            <Grid item xs={1}>
                
                
            </Grid>  

            <Grid item xs={7}>
                
                <Card className={classes.Section}>
                  <TaskItemMovieViewer/>
                </Card>
                <Card className={classes.Section}>
                  <TaskItemPointViewr/>
                </Card>
                
            </Grid>  

            <Grid item xs={3}>

                <Card className={classes.Section}>
                  <TaskItemToolBar/>
                </Card>
                <Card className={classes.Section}>
                  <TaskItemChatViewer/>
                </Card>
                <Card className={classes.Section}>
                  <TaskItemStatusViewer/>
                </Card>
            </Grid>  
            
        </Grid>  
        
    </div>
  );
}