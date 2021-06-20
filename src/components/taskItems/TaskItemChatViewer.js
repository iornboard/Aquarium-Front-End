import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatBox from 'react-chat-plugin';
import Grid from '@material-ui/core/Grid';
import { useDispatch , useSelector } from 'react-redux';
import { getChats , createChat } from '../../_actions/actionChat'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '40vh',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default  function Example() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const userInfo = useSelector( store => store.auth.userData , []);
  const {userId, userNickname, userImgUrl} = {...userInfo}

  const taskInfo = useSelector( store => store.task.usingTask , []);
  const {chatRoomId} = {...taskInfo}

  const [attr, setAttr] = useState({ showChatbox: true, messages: []} );

  useEffect(() => {
    dispatch(getChats(chatRoomId))
      .then(res => setAttr({ messages : res.payload }) )
  }, 1);

  const handleOnSendMessage = (message) => {

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

    dispatch(createChat(chat))
    setAttr({
      ...attr,
      messages: attr.messages.concat(chat),
    });
  };


  return (
          <div>
            {chatRoomId ? 
              <ChatBox
              onSendMessage={handleOnSendMessage}
              userId={userId}
              messages={attr.messages}
              width={'35vw'}
              height={'35vh'}
              showTypingIndicator={false}
            /> :
            <Grid container justify="center" className={classes.root}>
              "채팅을 사용할 수 없습니다."
            </Grid>
            }
            
          </div>
  );
}