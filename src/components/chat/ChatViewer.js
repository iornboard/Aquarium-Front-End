// 채팅이 가능한 컴포넌트 
// 사용 컴포넌트에서 roomId를 전달해 주면 사용할 수 있음


//이슈
// 이슈 1. 초반에는 모든 소켓 연결을 오두 ok함 문제는 disconnet가 없고, 언제 소켓에 연결할지 정하지 않음 -> 설계부터 필요할 듯 (디버그에서 상태를 받아 하는 것도 좋을 듯)
  // heartbeat을 추가하고, 얼마 정도 send가 없으면 로직을 짜는 것으로 한다. 
// 이슈 2. 채팅이 왔을 때, 알람이 어떻게 주어지도 설계해야 한다. 


import { server } from '../../conf/Config'
import React, { useState, useEffect, useRef } from 'react';
import { chatHistory } from '../../_actions/actionChat'
import { useDispatch , useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ChatBox from 'react-chat-plugin';
import Grid from '@material-ui/core/Grid';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Online from '../common/Online'
import Box from '@material-ui/core/Box';


import './ChatBox.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    alignItems: "center"
  },
  onlineForm : {
    position: 'relative',
    top: -50,
    left: 10,
    zIndex: 1,
  }
}));

export default function ChatViewer( {chatRoomId, height} ) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const stompClient = useRef({});

  const userInfo = useSelector( store => store.auth.userData , []);  // 현재 유저 정보 받아오기
  const {userId, userNickname, userImgUrl} = {...userInfo} 

  const [attr, setAttr] = useState([]);
  const [isOnlined, setIsOnlined] = useState(false);

  useEffect(()=>{
    dispatch(chatHistory(chatRoomId))
      .then( res => setAttr(res.payload) )

    let sockJS = new SockJS(server+"/api/websocket");
    stompClient.current = Stomp.over(sockJS);
    stompClient.current.debug= () => {};
    stompClient.current.reconnectDelay = 5000

    setIsOnlined(true)
    connect()
  },[]);


  const connect = () => {
      stompClient.current.connect({},subscribe);
  }

  const subscribe = () => {
    stompClient.current.subscribe('/back/chat',(data)=>{
      const newMessage = JSON.parse(data.body);
      setAttr(prev=>[...prev, newMessage]);
    });
  }

  const disconnect = () => { 
    stompClient.current.disconnect()
  }


  const send = (message) => {

    var chat = {
      roomId : chatRoomId,
      text: message,
      type: 'text',
      timestamp: + new Date(),
      author: {
        username: userNickname,
        id: userId,
        avatarUrl: userImgUrl,
      }
  }

    stompClient.current.send("/go/chat",{},JSON.stringify(chat));
  };


  return (
          <Box display="flex">
            {chatRoomId ? 
            <Box className={classes.root}>
              <ChatBox
              height={height}
              onSendMessage={send}
              userId={userId}
              messages={attr}
              showTypingIndicator={false}
              /> 
              <Online status={true} className={classes.onlineForm} />
            </Box>
            :
            <Grid container justify="center" className={classes.root}>
              "채팅을 사용할 수 없습니다."
            </Grid>
            }
          </Box>
  );
}

