import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ChatViewer from "../../components/chat/ChatViewer";
import Aquarium from "../../components/aquarium/Aquarium";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChange1 = (event) => {
    setName(event.target.value)
  }
  const handleChange2 = (event) => {
    setEmail(event.target.value)
  }

  return (

    <div className={classes.root}>
    <Box height={700} width={500}>
      <ChatViewer chatRoomId={13}/> 
    </Box>
    <Box height={700} width={500}>
      <ChatViewer chatRoomId={13}/> 
    </Box>
        
      {/* <Test/> */}
        {/* <Card>
          <Box>
            <Aquarium/>
          </Box>
        </Card> */}
    </div>
  );
}