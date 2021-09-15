import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TaskItemPointViewr from '../taskItems/TaskItemPointViewr';
import TaskItemStatusViewer from '../taskItems/TaskItemStatusViewer';
import TaskItemChatViewer from '../taskItems/TaskItemChatViewer';
import TaskItemToolBar from '../taskItems/TaskItemToolBar';
import TaskItemMovieViewer from '../taskItems/TaskItemMovieViewer' ;
import TaskItemImageViewer from '../taskItems/TaskItemImageViewer'
import Uploader from '../common/Uploader'
import { updateTasKImg , setTask } from '../../_actions/actionTask'
import Button from '@material-ui/core/Button';

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
  const dispatch = useDispatch();

  // !! hardcoding !! //
  const taskInfo = useSelector( store => store.task.usingTask , []);
  const {taskImgUrl, taskId} = {...taskInfo}

  const fileInfo = useSelector( store => store.file.ImgFileInfo , []);
  const {fileDownloadUri} = {...fileInfo}

  const [taskImg, setTaskImg] = useState(); 


  useEffect(() => {
    setTaskImg(taskImgUrl)
  }, 1);

  const handleUploagImg = () => {

    const task = {
      taskId : taskId,
      taskImgUrl : fileDownloadUri
    }

    dispatch(updateTasKImg(task))
      .then( res => setTaskImg(res.payload.taskImgUrl) )
  };


  // !! hardcoding !! //

  return (
    <div className={classes.root}>
        <CssBaseline />

        <Grid container spacing={1}>

          
            <Grid item xs={1}>
                
                
            </Grid>  

            <Grid item xs={7}>
                
                <Card className={classes.Section}>
                  {taskImg ? <TaskItemImageViewer taskImgUrl={taskImg}/> : <Uploader/> }
                  {taskImg ? "" : <Button fullWidth variant="contained" onClick={handleUploagImg}>제출</Button> }
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