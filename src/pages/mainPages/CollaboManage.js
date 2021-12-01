import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DialogTitle from '@material-ui/core/DialogTitle';
import AssignmentIcon from '@material-ui/icons/Assignment';

import Uploader from "../../components/common/Uploader";
import UserJoinList from "../../components/common/UserJoinList";

import { ViewState} from '@devexpress/dx-react-scheduler';
import {
  MonthView,
  Scheduler,
  DateNavigator,
  TodayButton,
  Appointments,
  Toolbar,
  AppointmentTooltip,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

// import { createProject, readProject, readAllProject } from '../../_actions/actionProject'
import { createTerm, readTerm, readAllTerm, updateTerm } from '../../_actions/actionProject'
import { createTask, readTask, readAllUserTask, readAllProjectTask } from '../../_actions/actionTask'

import {statusInfo} from "../../conf/projectConfig"




const sampleProjectinfo = {projectId : 1}

var now = new Date();


// const sampleTaskInfo = [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-05T11:00', title: 'Meeting', taskStatus: "safe", teamsInfo:[1,2,3] },
//   { startDate: '2018-11-02T12:00', endDate: '2018-11-08T13:30', title: 'Go to a gym', taskStatus: "processing", teamsInfo:[1] },
//   { startDate: '2018-11-09T12:00', endDate: '2018-11-10T13:30', title: 'Go to a gym', taskStatus: "safe", teamsInfo:[1,2,3] },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-12T13:30', title: 'Go to a gym', taskStatus: "deadlock", teamsInfo:[1,2] },
// ];


const resource = [
        {
          fieldName: 'taskStatus',
          title: 'taskStatus',
          instances: [
            { id: statusInfo.defult.text,     text: statusInfo.defult.korean,     color: statusInfo.defult.color },
            { id: statusInfo.safe.text,       text: statusInfo.safe.korean,       color: statusInfo.safe.color },
            { id: statusInfo.processing.text, text: statusInfo.processing.korean, color: statusInfo.processing.color },
            { id: statusInfo.deadlock.text,   text: statusInfo.deadlock.korean,   color: statusInfo.deadlock.color },
            { id: statusInfo.warning.text,    text: statusInfo.warning.korean,    color: statusInfo.warning.color },
            { id: statusInfo.overterm.text,   text: statusInfo.overterm.korean,   color: statusInfo.overterm.color },
            { id: statusInfo.end.text,        text: statusInfo.end.korean,        color: statusInfo.end.color },
          ],
        }
      ]
    


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
  },
  content: {
    background: theme.palette.primary.light,
    flexGrow: 0.5,
    height: '85vh',
    borderRadius : 10,
    overflow: 'auto',
  },
  rootList:{
    paddingLeft : 15,
    paddingRight : 15, 
    borderRadius : 10,
    minWidth : "20vw"
  },
  listForm: {
    marginTop: 5,
    width: '100%',
  },
  taskList: {
    margin: "5% 0% 5%",
    width: '100%',
    overflow: 'auto',
    maxHeight: '60vh',
  },
  daybar: {
    height: 10,
    borderRadius: 5,
  },
  taskBar: {
    width: "95%",
    padding: "5px",
    background: "#EAE9E9",
    margin: "5px"
  },
  taskBarList: {
    width: "100%",
    marginLeft: '7px'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(6),
    right: theme.spacing(7),
  },

}));


function TaskManager({history, userInfo}) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const {userId, userNickname, userImgUrl} = {...userInfo} 

  const joinUsersInfos = useSelector( store => store.user.joinUsers );

  const [tasks, setTasks] = useState([])
  const [project, setProject] = useState(sampleProjectinfo)
  const [terms, setTerms] = useState([])

  const [open, setOpen] = React.useState(false);
  const [inOpen, setInOpen] = React.useState(false);
  const [values, setValues] = useState([]);

  const [termId, setTermId] = useState([]);


  useEffect(() => {
  
    setProject(sampleProjectinfo)

    if(userId){
      dispatch(readAllUserTask(userId))
        .then( res =>  setTasks(res.payload))
    }

  },[userId])

  

  const handleSubmit = () => {

    const taskUsersIds = joinUsersInfos.map( userinfo => userinfo.userId )

    const taskDefault = { title:"이름없는 작업", taskDescription:"내용 없음", teamsId:[userId , ...taskUsersIds], taskStatus:"defult", masterId:userId, projectId: project.projectId }
    const taskBody = { ...taskDefault , ...values, termId: termId }

    dispatch(createTask(taskBody))
      .then(res => setTasks(prev => [...prev, res.payload]))
      
    setValues(null);
    setOpen(false);
  };





  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLoadTerm = () => {
    setInOpen(true);

    dispatch(readAllTerm(userId))
      .then(res => setTerms(res.payload))
  };

  const handleCopyTerm = (termInfo) => {

    const {termTitle, termDescription, termText, termRequired} = {...termInfo}
    const newTermInfo = { termTitle: termTitle, termDescription: termDescription, termText: termText, termRequired: termRequired, termOwnerId: userId, agreesId:[userId]}

    dispatch(createTerm(newTermInfo))
      .then(res => setTermId(res.payload.termId) ) 

    setInOpen(false);
  };





  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]:  name=="endDate" || name=="startDate" ? new Date(value) : value })
  }




  return (

    <div className={classes.root}>

      <Box width={"100%"} height={"10vh"}/>

      <Grid container spacing={3} className={classes.content}>
        <Grid item xs={12} sm={3}>
          <Box display="flex" height="100%" bgcolor="white" className={classes.rootList}>
            <List className={classes.listForm}>
              <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="rounded" alt="수정" src={userImgUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="h5"
                          color="textPrimary"
                        >
                          {""}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={userNickname}
                    />
              </ListItem>
              <Divider/>  
              <List className={classes.taskList}>
                {tasks.map(ta=> ( <TaskBar taskInfo={ta} history={history}/> ))}
              </List>
              <Divider/>
            </List>
          </Box>
        </Grid>


        <Grid item xs={12} sm={9}>    
          <Box display="flex" height="100%" bgcolor="white" className={classes.rootList}>
            <ScheduleViewer data={tasks}/>
          </Box>
        </Grid>


        <Fab aria-label={'Add'} className={classes.fab} color={"primary"} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>

      </Grid>



      <Dialog
        open={open}
        onClose={e => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box>
          <DialogTitle id="alert-dialog-title"><h2>작업 내역 생성</h2></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
          <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField required name="title" id="title" label="사용자 작업 이름" fullWidth autoComplete="cc-name" onChange = {handleFormChange} />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                name="startDate"
                id="startDate"
                label="시작일자"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {handleFormChange}
              />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                name="endDate"
                id="endDate"
                label="종료일자"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {handleFormChange}
              />
              </Grid>
              <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom>
                참가 인원
              </Typography>
                <UserJoinList/>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField required name="taskDescription" id="taskDescription" label="작업 설명" multiline rows={4} rowsMax={8} fullWidth variant="outlined"  onChange = {handleFormChange}/>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleLoadTerm} color="primary" autoFocus >
                  약관 추가하기
                </Button>
              </Grid>
            </Grid>
          
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained"  onClick={handleSubmit} color="primary" autoFocus >
              생성
            </Button>
          </DialogActions>
        </Box>
      </Dialog>




      <Dialog
        open={inOpen}
        onClose={e => setInOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <Box>
            {terms ? terms.map( tr => 
            
              <Button className={classes.taskBar} onClick={ e => handleCopyTerm(tr)}>
               <List className={classes.termBarList}> 
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={tr.termTitle} secondary={<EllipsisText children={tr.termText}/>} />
                </ListItem> 
                </List>
              </Button>

            ) : <Box style={{margin:30}}>"생성된 약관이 없습니다. 추가해 주세요!"</Box>}
          </Box>
      </Dialog>

    </div>

  
  );
}



function TaskBar({ taskInfo, history }) {

  const classes = useStyles();

  const [dDay, setdDay] = React.useState(0);
  const [progress, setProgress] = React.useState(0);


  useEffect(() => {
    putLeftDay()
  },[]);


  const putLeftDay = () => {

    var start = new Date(taskInfo.startDate);
    var end = new Date(taskInfo.endDate);
    var now = new Date();

    var leftDay = Math.floor((end - now)/86400000)
    var allDay = Math.floor((end - start)/86400000)

    setdDay(leftDay)
    setProgress(((allDay-leftDay)/allDay)*100)

  }
  

  return (
        <Button className={classes.taskBar} onClick={ e=>{ history.push( "/collabo/" + taskInfo.taskId ) } }>
          <List className={classes.taskBarList}> 
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                      >
                      {<EllipsisText children={taskInfo.title}/>}
                    </Typography>
                  </React.Fragment>
                }
                secondary={ dDay >= 0 ? "D-"+dDay : "초과됨"}
              />
              <ListItemAvatar>
                <AvatarGroup max={4}>
                  { taskInfo.teamsInfo ? taskInfo.teamsInfo.map( us => <Avatar src={us.userImgUrl}/> ) : "로딩 중.."}
                </AvatarGroup> 
              </ListItemAvatar>
            </ListItem>

              <LinearProgressWithLabel value={progress} status={taskInfo.taskStatus} className={classes.daybar} />
            
          </List>
        </Button>
  );
}


const EllipsisText = (props) => {
  const { children } = props

  return (
    <div style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 150
      }}>
      {children}
    </div>
  )
}


const LinearProgressWithLabel = ({value, status = "defult" , className}) => {

    const {color="#673ab7", barColor="#4527a0"} = { ...statusInfo[status] }
 
    const thisStyles = makeStyles((theme) => ({
      colorPrimary: {
        backgroundColor: color 
      },
      barColorPrimary: {
        backgroundColor: barColor 
      }
    }));

  const classes = thisStyles();

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box  width="100%" mr={1}>
          <LinearProgress variant="determinate" className={className} value={value} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}  />
        </Box>
      </Box>
      <Box textAlign="right" m={1} color={color}>
        { statusInfo[status] ? status : "defult" }
      </Box>
    </div>
  );
}






const  ScheduleViewer = ({data}) => {

  return (
    <Box>
      <Scheduler
        data={data}
      >
        <ViewState
          defaultCurrentDate={now}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <MonthView />
        <Appointments/>
        <Resources
          data={resource}
          mainResourceName={data.taskStatus}
        />
      </Scheduler>
    </Box>
  );
};



export default withRouter(TaskManager)