import React, { useState } from "react"
import { useDispatch , useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { createAquarium, readAquarium, readAllAquarium } from '../../_actions/actionAquarium'

import Box from '@material-ui/core/Box';
import ChatViewer from "../../components/chat/ChatViewer";
import Card from '@material-ui/core/Card';
import Aquarium from "../../components/aquarium/Aquarium";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
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
  
  const [ aqrmInfo, setAqrmInfo ] = useState()
  const [ text, setText ] = useState()



  const readAllAqrmByUser = () => {

    dispatch(readAllAquarium( userId ))

  }

  const makeAqrm = () => {

    const sampleNewAqrm = {
      aqrmTitle : "샘플",
      aqrmContentType : "video",
      aqrmVideoUrl : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      userId : userId
    }

    dispatch(createAquarium(sampleNewAqrm))
  }

  const readAqrmById = () => {

    dispatch(readAquarium( text ))
      .then(res => setAqrmInfo(res.payload))
  }


  const handler = (e) => {
    setText(e.currentTarget.value)
  }

  return (

    <div className={classes.root}>
      <Box height={100}/>

          <Card>
            <Box height={720} width={1280}>
              {aqrmInfo ? <Aquarium/> : "어항 정보를 불러와주세요" }
            </Box>
          </Card>

          <Button variant="contained" color="primary" onClick={makeAqrm}>
            아쿠아리움 생성
          </Button>
          <Button variant="contained" color="primary" onClick={readAllAqrmByUser}>
            아쿠아리움 불러오기
          </Button>
          <Button variant="contained" color="primary"  onClick={readAqrmById}>
            아쿠아리움 검색
          </Button>
          <TextField id="standard-basic" label="Standard" onChange={handler}/>
          
          <Uploader/>

    </div>

    


  );
}