import React, { useState } from "react"
import { useDispatch , useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Uploader from "../../components/common/Uploader";


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

export default function StickyFooter() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const userInfo = useSelector( store => store.auth.userData , []);  // 현재 유저 정보 받아오기
  const {userId, userNickname, userImgUrl} = {...userInfo} 
  
  

  return (

    <div className={classes.root}>
      <Box height={100}/>



          <Button variant="contained" color="primary" >
            프로젝트 생성
          </Button>
          <Button variant="contained" color="primary" >
            프로젝트 불러오기
          </Button>
          <Button variant="contained" color="primary"  >
            프로젝트 검색
          </Button>
          <TextField id="standard-basic" label="Standard" />
          
          <Uploader/>

    </div>

    


  );
}