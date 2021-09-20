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


import './ChatBox.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default  function ChatViewer( {chatRoomId} ) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const stompClient = useRef({});

  const userInfo = useSelector( store => store.auth.userData , []);  // 현재 유저 정보 받아오기
  const {userId, userNickname, userImgUrl} = {...userInfo} 

  const [attr, setAttr] = useState([]);

  useEffect(()=>{
    dispatch(chatHistory(chatRoomId))
      .then( res => setAttr(res.payload) )

    let sockJS = new SockJS(server+"/api/websocket");
    stompClient.current = Stomp.over(sockJS);
    stompClient.current.debug= () => {};
    stompClient.current.reconnectDelay = 5000

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
          <div>
            {chatRoomId ? 
              <ChatBox
              onSendMessage={send}
              userId={userId}
              messages={attr}
              showTypingIndicator={false}
            /> :
            <Grid container justify="center" className={classes.root}>
              "채팅을 사용할 수 없습니다."
            </Grid>
            }
            <Online/>
          </div>
  );
}