import React, { useState } from "react"
import { useDispatch , useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Uploader from "../../components/common/Uploader";
import UserJoinList from "../../components/common/UserJoinList";


import { createProject, readProject, readAllProject } from '../../_actions/actionProject'
import { createTask, readTask, readAllUserTask, readAllProjectTask } from '../../_actions/actionTask'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
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
  loot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  
}));


function StickyFooter() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const userInfo = useSelector( store => store.auth.userData , []);  // 현재 유저 정보 받아오기
  const {userId, userNickname, userImgUrl} = {...userInfo} 

  const [value, setValue] = useState("")
  const [projects, setProjects] = useState([])
  
  const create_P = () => {

    const data = {
      projectName : "테스트 프로젝트",
      projectDescription : "ㅇㅇㅇㅇㅇ",
      userId : userId
    }

    dispatch(createProject(data))

  }

  const read_P = () => {

    dispatch(readProject(value))
      .then( res => setProjects( prev => [...prev, res.payload ]) )

  }

  const read_All_P = () => {

    dispatch(readAllProject(userId))
      .then( res => setProjects(res.payload) )

  }


  const simpleHandler = (e) => {
    setValue(e.target.value)
  }



  return (

    <div className={classes.root}>
      <Box height={100}/>


          <Button variant="contained" color="primary" onClick={create_P}>
            프로젝트 생성
          </Button>
          <Button variant="contained" color="primary" onClick={read_All_P}>
            프로젝트 불러오기
          </Button>
          <Button variant="contained" color="primary" onClick={read_P}>
            프로젝트 검색
          </Button>
          <TextField id="standard-basic" label="Standard" onChange={simpleHandler}/>
          
          <Uploader/>

          {projects ? projects.map( proj => <Task projectInfo={proj}/>  )  : ""}

    </div>

  
  );
}

const Task = ({projectInfo}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const userInfo = useSelector( store => store.auth.userData , []);  // 현재 유저 정보 받아오기
  const {userId, userNickname, userImgUrl} = {...userInfo} 

  const joinUsersInfos = useSelector( store => store.user.joinUsers , []);

  const [value, setValue] = useState("")
  const [tasks, setTasks] = useState([])

  const create_T = () => {

    const data = {
      taskName : "테스트 작업",
      taskDescription : "ㅇㅇㅇㅇㅇ",
      projectId : projectInfo.projectId,
      teamsId : joinUsersInfos.map(user => user.userId),
      masterId : userId
    }

    dispatch(createTask(data))
      .then(res => setTasks(prev => [...prev, res.payload]))

  }

  const read_T = () => {
    dispatch(readTask(value))
    .then(res => setTasks(prev => [...prev, res.payload]))

  }

  const read_All_T = () => {
    dispatch(readAllProjectTask(projectInfo.projectId))
    .then(res => setTasks(prev => [...prev, res.payload]))
  }


  const simpleHandler = (e) => {
    setValue(e.target.value)
  }


  return (
    <div>
          {projectInfo.projectName}
          {projectInfo.projectId}
          <UserJoinList/>
          <Button variant="contained" color="primary" onClick={create_T}>
            작업 생성
          </Button>
          <Button variant="contained" color="primary" onClick={read_All_T}>
            작업 불러오기
          </Button>
          <Button variant="contained" color="primary" onClick={read_T}>
            작업 검색
          </Button>
          <TextField id="standard-basic" label="Standard" onChange={simpleHandler}/>
    </div>
  )
}


export default StickyFooter