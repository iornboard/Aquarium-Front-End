import React, { useState, useEffect } from 'react';
import ChatBox from 'react-chat-plugin';
import { useDispatch , useSelector } from 'react-redux';
import { getChats , createChat } from '../../_actions/actionChat'


export default  function Example() {

  const dispatch = useDispatch();

  const userInfo = useSelector( store => store.auth.userData , []);
  const {userId, userNickname, userImgUrl} = {...userInfo}

  const [chatRoomId, setchatRoomId ] = useState(1)
  const [attr, setAttr] = useState({ showChatbox: true, messages: []} );


  useEffect(() => {
    dispatch(getChats(1))
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
          <ChatBox
            onSendMessage={handleOnSendMessage}
            userId={userId}
            messages={attr.messages}
            width={'35vw'}
            height={'35vh'}
            showTypingIndicator={false}
          />
  );
}