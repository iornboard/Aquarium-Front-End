import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MobileStepper from '@material-ui/core/MobileStepper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BallotIcon from '@material-ui/icons/Ballot';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import StarIcon from '@material-ui/icons/Star';
import FaceIcon from '@material-ui/icons/Face';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import youtubeParser  from 'youtube-metadata-from-url';

import { readTask, updateTask, updateTaskInfo, updateTaskStore } from '../../_actions/actionTask'
import { createTerm, readTerm, readAllTerm, updateTerm } from '../../_actions/actionProject'
import { createAquarium} from '../../_actions/actionAquarium'
import { createRoom } from '../../_actions/actionChat'


import Aquarium from '../../components/aquarium/Aquarium';
import AquariumYT from '../../components/aquarium/AquariumYoutube';
import ChatViewer from '../../components/chat/ChatViewer';
import UserJoinList from "../../components/common/UserJoinList";
import SimpleProgress from '../../components/common/SimpleProgress'

import {statusInfo} from "../../conf/projectConfig"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
  },
  content: {
    background: theme.palette.primary.light,
    flexGrow: 0.5,
    height: '90vh',
    borderRadius : 10,
    overflow: 'auto',
    padding: theme.spacing(3),
    paddingBottom: 0,
  },
  contentOption: {
    background: theme.palette.primary.light,
    outline: "solid",
    outlineWidth: "10px",
    outlineColor: theme.palette.primary.light,
    position:"relative",
    zIndex:2,
    minWidth: 1290,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  background:{
    position: 'absolute',
    zIndex: '-4',
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    width: '100%',
  },
  projectOption: {
    borderRadius : 15,
    minWidth: "20vw",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingLeft : 15,
    paddingRight : 15, 
  },
  rootAquarium: {
    position: "relative",  
  },
  listForm: {
    marginTop: 5,
    width: '100%',
  },
  chatForm:{
    height: '35vh',
  },
  tapRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: "100%"
  },
  tabs: {
    borderRight: `0px solid ${theme.palette.divider}`,
  },
  propsViews: {
    padding:10,
    backgroundColor : theme.palette.divider,
    width:"100%", 
    margin:10,
    marginRight:0,
    borderRadius : 10 ,
  },
  teamInfoFrom: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  expandedPanel: {
    padding : "5% 5% 3%;",
    borderRadius : 5,
    backgroundColor: theme.palette.primary.main,
    display :"flex",
    flexWrap :"wrap", 
    justifyContent : "flex-end"
  },
  commentField: {
    backgroundColor: "white",
    borderRadius: "5px",
    marginBottom: "10px"
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  
}));


var now = new Date();

function Task({match, userInfo}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {userId, userNickname, userImgUrl} = {...userInfo} 
  
  const task = useSelector( store => store.task.usingTask );
  const {aqrmId, chatRoomId} = {...task}
 
  useEffect(() => {
    dispatch(updateTaskStore(null))
    dispatch(readTask(match.params.task));
  },1 );


  return (
    <div className={classes.root}>
        <CssBaseline />

        <Box className={classes.background}/>
        <Box width={"100%"} height={"8vh"}/>

        <Grid container className={classes.content}>
          <Grid item xs={12} sm={9} justify = "center" >
            <Box display="flex" height="100%" bgcolor="white" className={classes.contentOption}>
              
            {
               task ? 
                <dic>
                  { aqrmId ? 
                    // <Aquarium className={classes.rootAquarium} aqrmId={aqrmId}/> 
                    <AquariumYT  className={classes.rootAquarium}  aqrmId={aqrmId}/> 
                  :
                    <AquariumPublisher taskInfo={task} userId={userId} />                
                  }  
                </dic>
                :
                <SimpleProgress/>
            }

            </Box>
          </Grid>


          <Grid item xs={12} sm={3} justify = "center">    
            <Box display="flex" height="100%" bgcolor="white" className={classes.projectOption}>
          
                <List className={classes.listForm}>
                  <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt="수정" src={userImgUrl} className={classes.large} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="h5"
                              color="textPrimary"
                            >
                              {task ? task.title : ""}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={userNickname}
                        />
                  </ListItem>
                  <Divider/> 

                  { task ? 
                    <div>
                      { chatRoomId ?
                        <ChatViewer chatRoomId={chatRoomId} height={'35vh'} className={classes.chatForm}/>
                      :
                        <ChatRoomPublisher taskInfo={task}/>
                      }
                    </div>
                    :
                    <SimpleProgress/>
                  }

                    
                  <Divider/>

                  <Box height='35vh' >
                    {task ?  <TaskProps task={task} userId={userId}/> : <SimpleProgress/> } 
                  </Box>
                  
                  <Divider/>

                </List>

              </Box>
          </Grid>
        </Grid>

          
    </div>
  );
}



const TaskProps = ({task,userId}) => {

  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { teamsInfo, masterId } = {...task}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.tapRoot}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        style={{
          background: theme.palette.primary.main,
          color: "black",
          width:"25%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius : 10 ,
          marginTop : 10,
          marginBottom : 10
        }}
        TabIndicatorProps={{style: {width:"100%",  opacity: 0.3}}}
      >
        <Tab icon={<AssessmentIcon/> } label="정보" aria-label="정보" />
        <Tab icon={<AssignmentIndIcon />} label="인원" aria-label="인원" />
        <Tab icon={<BallotIcon />} label="상태" aria-label="상태" />
        <Tab icon={<AssignmentIcon />} label="메모" aria-label="메모" />
        <Tab icon={<AssignmentLateIcon />} label="관리" aria-label="관리" disabled={ userId != masterId }/>
      </Tabs>
      <Box className={classes.propsViews} > 
        <TabPanel value={value} index={0}>
          <TaskPropsInfo taskInfo={task} userId={userId}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeamInfoList taskInfo={task}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TaskStatusInfo taskInfo={task}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TaskMemo taskInfo={task}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TaskMaster taskInfo={task}/>
        </TabPanel>
      </Box>

    </div>
  );
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
     
      <Box> 
        {children}
      </Box>
      
    </div>
  );
}

const TaskPropsInfo = ({taskInfo,userId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [dDay, setdDay] = useState(0);
  const [progress, setProgress] = useState(0);

  const [inOpen, setInOpen] = React.useState(false);
  const [termInfo, setTermInfo] = React.useState();
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if(taskInfo) putLeftDay() 

    dispatch(readTerm(taskInfo.termId))
      .then(res => setTermInfo(res.payload))
  },[]);


  const putLeftDay = () => {

    var leftDay = Math.floor((new Date(taskInfo.endDate) - now)/86400000)
    var allDay = Math.floor((new Date(taskInfo.endDate) - new Date(taskInfo.startDate))/86400000)

    setdDay(leftDay)
    setProgress(((allDay-leftDay)/allDay)*100)
  }

  const handleLoadTerm = () => {
    setInOpen(true);
  };

  const checkChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleAgree = (event) => {

    const newTermInfo = {...termInfo, agreesId:[...termInfo.agreesId, userId]  }

    setInOpen(false);
    dispatch(updateTerm(newTermInfo))
      .then(res => setTermInfo(res.payload))
    
  };

  return (
    <Box display="flex"> 
      <List  className={classes.teamInfoFrom} subheader={<li />}>

        <div style={{ margin:"5px 0px 5px 0px",  }}>
          <div >
            <Grid container alignItems="flex-end">
              <Grid item xs>
                <Typography variant="h6">
                  <EllipsisText>
                    { taskInfo.title }
                  </EllipsisText>
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={taskInfo.taskStatus}  style={{ backgroundColor: statusInfo[taskInfo.taskStatus].color, color:"white" ,margin:"-20px 0px 0px 0px" }} />
              </Grid>
            </Grid>
            <Typography color="textSecondary" component="span" variant="body2" style={{ margin:"0px 0px 5px 0px" }}>
              {taskInfo.taskDescription}
            </Typography>
          </div>
        </div>
        
        <Divider style={{ margin:"10px 0px 5px 0px" }}/>
        <div>
          <div>
            <Box margin="20px 0px 10px 0px">
              <Chip size="small" label={new Date(taskInfo.startDate).toLocaleDateString('ko-KR', { year: 'numeric',month: 'long', day: 'numeric',})} style={{ float:"left" }} />
              <Chip size="small" label={new Date(taskInfo.endDate).toLocaleDateString('ko-KR', { year: 'numeric',month: 'long', day: 'numeric',})} style={{ float:"right" }} />
              <br/>
            </Box>
            <LinearProgress variant="determinate" value={progress} style={{ width : "100%"}}/>
            <Box textAlign="right"  margin="10px 0px 10px 0px">
              { dDay > 0 ? dDay + "일 : 남은시간" : "만료됨" }
            </Box>
          </div>
        </div>

        <Divider style={{ margin:"10px 0px 5px 0px" }}/>
        <div  style={{ margin:"10px 0px 5px 0px" }}>
          <Box textAlign="right">
            { new Date( taskInfo.createdAt ).toLocaleDateString('ko-KR', { year: 'numeric',month: 'long', day: 'numeric',}) + " 에 생성됨"}
            <br/>
             {new Date( taskInfo.updatedAt ).toLocaleDateString('ko-KR', { year: 'numeric',month: 'long', day: 'numeric',}) + " 에 마지막으로 수정 됨"}
             <br/>
             <br/>
             { termInfo ? 
                termInfo.agreesId.includes(userId) ?
                  <Button color="primary" autoFocus >
                    동의됨
                  </Button>
                  :
                  <Button onClick={handleLoadTerm} color="primary" autoFocus >
                    약관확인 및 동의 
                  </Button>
                :
                ""
            }
            <br/>
          </Box>
        </div>

      </List>

      <Dialog
        open={inOpen}
        onClose={e => setInOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <Box style={{width: "50vh" , height:"80vh"}}>
          { termInfo ? 
          <List className={classes.rootList} style={{borderRadius: '0 0 10px 10px', padding: 20, height:'95%'}}>
            <li>
                <br/>
                <Typography variant="h5" component="h2">
                  <strong> {termInfo.termTitle} </strong>
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {termInfo.termDescription}
                  </Typography>      
                  <br/><br/>
                  <Box style={{minHeight:'35vh', padding: 20, background: theme.palette.primary.light , borderRadius: '10px'}}>
                    <Typography color="textSecondary">
                      {termInfo.termText}
                    </Typography>  
                  </Box>
                  <br/>
                  <FormControlLabel
                      control={<Checkbox color="secondary" name="saveCard" value="yes" onChange={checkChange} />}
                      label="위 약관을 확인하였으며, 이에 동의합니다."
                  />
                <br/>
            </li>
            <Divider/>
            <li>
                <br/>
                <br/><br/>
                <Box textAlign="right">
                  <Button variant="contained" onClick={handleAgree} disabled={!checked} color="primary" href="#contained-buttons">
                    동의
                  </Button>
                </Box>
                <br/>
            </li>
          </List>
          : <Box style={{margin:30}}> 약관이 설정되어 있지 않습니다. </Box>}
          </Box>
      </Dialog>
    </Box>
  );
}


const TeamInfoList = ({taskInfo}) => {
  const classes = useStyles();
  
  const { teamsInfo, masterId } = {...taskInfo}

  return (
    <Box display="flex"> 
      <List  className={classes.teamInfoFrom} subheader={<li />}>
        <Box margin="5px 0px 0px 0px">  
          <span><Typography  variant="h5"component="span" > <strong> 팀 </strong> </Typography> </span>
        </Box>

        {teamsInfo ?  teamsInfo.map( us =>

          <ListItem alignItems="flex-start">
              { us.userId == masterId ? 
                <StarIcon color="secondary" fontSize="small"/> :
                <FaceIcon color="secondary" fontSize="small" visibility="hidden"/> 
              }
            <ListItemAvatar>
              <Avatar alt="userImg" src={us.userImgUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={us.userNickname}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="caption"
                    color="textSecondary"
                  >
                    {"사용자 페이지로"}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        
        )  : ""}
      </List>
    </Box>
  );
}



const TaskStatusInfo = ({taskInfo}) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = Object.keys(statusInfo).length;

  useEffect(() => {
    setActiveStep(statusInfo[taskInfo.taskStatus].idx)
  },[taskInfo]);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateStatus = () => {
    const newTask = { ...taskInfo, taskStatus : statusInfo[Object.keys(statusInfo)[activeStep]].text }
    dispatch(updateTaskInfo(newTask))
  }

  return (
    <Box  display="flex"> 
      <List  className={classes.teamInfoFrom} subheader={<li/>}>
        <Box margin="5px 0px 0px 0px">  
          <span><Typography  variant="h5"component="span" > <strong> 프로젝트 상태 </strong> </Typography> </span>
          <Chip size="small" label={ statusInfo[taskInfo.taskStatus].text } variant="outlined"  style={{ backgroundColor: statusInfo[taskInfo.taskStatus].color, color:"white" , margin:"-7px 0px 0px 5px" }}/>
        </Box>
        
        <Typography color='secondary' style={{ margin:"15px 0px 5px 0px" }} > <strong> 프로젝트의 상태를 설정합니다. </strong> </Typography>

        <Box width="100%" borderRadius={10}> 
        <Button fullWidth disabled style={{ margin:"2px 0px 5px 0px", backgroundColor: statusInfo[Object.keys(statusInfo)[activeStep]].color , borderRadius:10 }} >
          <Box height="8vh" marginBottom={1} color="white">
            <Typography variant="h6" component="span" > <strong> {statusInfo[Object.keys(statusInfo)[activeStep]].korean} </strong> </Typography>
            <Typography variant="caption"  > <strong> {statusInfo[Object.keys(statusInfo)[activeStep]].text} </strong> </Typography>
            <div/>
            <Typography variant="caption"  > {statusInfo[Object.keys(statusInfo)[activeStep]].description} </Typography>
          </Box>     
        </Button>
          <MobileStepper
          style={{ borderRadius: 10 }}
                steps={maxSteps}
                position="static"
                variant="text"

                activeStep={activeStep}
                nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />        
        </Box>

        <Button fullWidth variant="contained" color="secondary" onClick={updateStatus} style={{ margin:"7px 0px 5px 0px", backgroundColor: statusInfo[Object.keys(statusInfo)[activeStep]].color }}>
          수정
        </Button>

      </List>
    </Box>
  );
}


const TaskMemo = ({taskInfo}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ taskMemo , setTaskMemo ] = useState(taskInfo.taskMemo)

  const updateMemo = () => {
    const newTask = { ...taskInfo, taskMemo : taskMemo }
    dispatch(updateTaskInfo(newTask))
  }

  return (
    <Box display="flex"> 
      <List  className={classes.teamInfoFrom} subheader={<li />}>
        <Box margin="5px 0px 0px 0px">  
          <span><Typography  variant="h5"component="span" > <strong> 프로젝트 메모 </strong> </Typography> </span>
        </Box>

        <Typography color='secondary' style={{ margin:"15px 0px 5px 0px" }} > <strong> 프로젝트의 메모를 입력하세요 </strong> </Typography>

        <Box className={classes.expandedPanel}>
          <TextField
            className={classes.commentField}
            fullWidth
            id="filled-multi=ine-flexible"
            multiline
            rows={4}
            maxRows={4}
            onChange={e => setTaskMemo(e.target.value)}
            variant="outlined" 
            value={taskMemo}
          />
          <Button variant="contained" color="secondary" onClick={updateMemo}>
            저장
          </Button>
        </Box>
      </List>
    </Box>
  );
}



const TaskMaster = ({taskInfo}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const joinUsersInfos = useSelector( store => store.user.joinUsers );

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState(taskInfo);


  useEffect(() => {
    setValues(taskInfo)
  },[taskInfo])


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]:  name=="endDate" || name=="startDate" ? new Date(value) : value })
  }

  const handleSubmit = () => {

    const taskUsersIds = joinUsersInfos.map( userinfo => userinfo.userId )

    const taskBody = { ...taskInfo , ...values, teamsId:[ taskInfo.masterId , ...taskUsersIds ] }

    dispatch(updateTask(taskBody))
      
    setOpen(false);
  };



  return (
    <div>
    <Box display="flex"> 
      <List  className={classes.teamInfoFrom} subheader={<li />}>
        <Box margin="5px 0px 0px 0px">  
          <span><Typography  variant="h5"component="span" > <strong> 프로젝트 관리 </strong> </Typography> </span>
        </Box>

        <Typography color='secondary' style={{ margin:"15px 0px 5px 0px" }} > <strong> 프로젝트 기본정보 </strong> </Typography>

        <Button fullWidth variant="contained" color="secondary" onClick={handleClickOpen}>
          수정
        </Button>


      </List>
    </Box>

    <Dialog
    open={open}
    onClose={e => setOpen(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <Box>
      <DialogTitle id="alert-dialog-title"><h2>작업 정보 수정</h2></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
      <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField required name="title" id="title" label="사용자 작업 이름" fullWidth autoComplete="cc-name" onChange = {handleFormChange} value={values.title}/>
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
            value={new Date(values.startDate).toISOString().slice(0, 10)}
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
            defaultValue={new Date(values.endDate).toISOString().slice(0, 10)}
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
            <UserJoinList teamList={taskInfo.teamsInfo}/>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField required name="taskDescription" id="taskDescription" label="작업 설명" multiline rows={4} rowsMax={8} fullWidth variant="outlined"  onChange = {handleFormChange} value={values.taskDescription}/>
          </Grid>
        </Grid>
      
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained"  onClick={handleSubmit} color="primary" autoFocus >
            수정
        </Button>
      </DialogActions>
    </Box>
    </Dialog>

  </div>
  );
}

const AquariumPublisher = ({userId, taskInfo}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({aqrmVideoUrl:""});

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const putAqrm = () => {
  
    youtubeParser.metadata(values.aqrmVideoUrl)
    .then( info => {
        const data = {...values, aqrmThumbnail: info.thumbnail_url, userId: userId }
        dispatch( createAquarium(data) )
        .then( res => dispatch( updateTaskInfo({ ...taskInfo , aqrmId : res.payload.aqrmId } )) )
    }).catch( err => {

    });
  }


  return (
    <Box  className={classes.root} display="flex" bgcolor="white" width="50vh" padding="10px" borderRadius={10}>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Fab size="medium" color="secondary" aria-label="add" onClick={putAqrm}>
            <AddIcon />
          </Fab>  
        </Grid>
        <Grid item xs={12} md={9}>
          <Box margin="-15px 0px 0px 0px" ><h1> <strong> 새 아쿠아리움 생성 </strong> </h1> </Box>
        </Grid>
      </Grid>

      <TextField
        fullWidth
        id="aqrmTitle"
        name="aqrmTitle"
        label="제목을 입력해주세요"
        onChange={handleFormChange}
      />
       <TextField
        fullWidth
        id="aqrmVideoUrl"
        name="aqrmVideoUrl"
        label="유튜브 URL을 입력해 주세요"
        onChange={handleFormChange}
      />

    </Box>
  )
}


const ChatRoomPublisher = ({taskInfo}) => {

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(createRoom(taskInfo.teamsInfo.map(it => it.userId)))
      .then(res =>  dispatch(updateTaskInfo({ ...taskInfo , chatRoomId : res.payload.roomId })))
  },[])


  return (
    <Box  height={'35vh'}>
    </Box>
  )
}


const EllipsisText = (props) => {
  const { children } = props

  return (
    <div style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 200
      }}>
      {children}
    </div>
  )
}



export default withRouter(Task)