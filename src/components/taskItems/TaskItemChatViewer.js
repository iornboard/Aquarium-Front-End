import React  from 'react';
import ChatBox from 'react-chat-plugin';


export default  function Example() {
  const [attr, setAttr] = React.useState({
    showChatbox: true,
    messages: [
      {
        text: 'user2 has joined the conversation',
        timestamp: 1578366389250,
        type: 'notification',
      }
    ],
  });

  
  const handleOnSendMessage = (message) => {
    setAttr({
      ...attr,
      messages: attr.messages.concat({
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: message,
        type: 'text',
        timestamp: +new Date(),
      }),
    });
  };

  return (

          <ChatBox
            onSendMessage={handleOnSendMessage}
            userId={1}
            messages={attr.messages}
            width={'35vw'}
            height={'35vh'}
            showTypingIndicator={false}
            activeAuthor={{ username: 'user2', id: 2, avatarUrl: null }}
          />
    
  );
}