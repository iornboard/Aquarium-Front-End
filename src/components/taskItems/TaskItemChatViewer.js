import React  from 'react';
import ChatBox from 'react-chat-plugin';


export default  function Example() {
  const [attr, setAttr] = React.useState({
    showChatbox: true,
    messages: [
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'http://www.foodnmed.com/news/photo/201706/6987_1287_1511.jpg',
        },
        text: 'Hi',
        type: 'text',
        timestamp: 1578366393250,
      },
      {
        author: { username: 'user2', id: 2, avatarUrl: null },
        text: 'Show two buttons',
        type: 'text',
        timestamp: 1578366425250,
        buttons: [
          {
            type: 'URL',
            title: 'Yahoo',
            payload: 'http://www.yahoo.com',
          },
          {
            type: 'URL',
            title: 'Example',
            payload: 'http://www.example.com',
          },
        ],
      },
      
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