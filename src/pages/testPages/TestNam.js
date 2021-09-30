import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BallotIcon from '@material-ui/icons/Ballot';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';

import Aquarium from '../../components/aquarium/Aquarium';
import ChatViewer from '../../components/chat/ChatViewer';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
  },
  content: {
    background: theme.palette.primary.light,
    flexGrow: 0.5,
    height: '90vh',
    borderRadius : 10,
    overflow: 'auto',
    padding: theme.spacing(3),
    paddingBottom: 0,
  },
  contentOption: {
    background: theme.palette.primary.light,
    outline: "solid",
    outlineWidth: "10px",
    outlineColor: theme.palette.primary.light,
    position:"relative",
    zIndex:2,
    minWidth: 1290,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  background:{
    position: 'absolute',
    zIndex: '-4',
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    width: '100%',
  },
  projectOption: {
    borderRadius : 15,
    minWidth: "20vw",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingLeft : 15,
    paddingRight : 15, 
  },
  rootAquarium: {
    position: "relative",  
  },
  listForm: {
    marginTop: 5,
    width: '100%',
  },
  chatForm:{
    height: '35vh',
  },
  tapRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: "100%"
  },
  tabs: {
    borderRight: `0px solid ${theme.palette.divider}`,
  },
  propsViews: {
    padding:10,
    backgroundColor : theme.palette.divider,
    width:"90%", 
    margin:10,
    marginRight:0,
    borderRadius : 10 ,
  },
  teamInfoFrom: {
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  
}));

function Task({match, userInfo}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
   console.log(match.params.task)
  }, 1);


  return (
    <div className={classes.root}>
        <CssBaseline />

        <Box className={classes.background}/>
        <Box width={"100%"} height={"8vh"}/>

        <Grid container className={classes.content}>
          <Grid item xs={12} sm={9} justify = "center" >
            <Box display="flex" height="100%" bgcolor="white" className={classes.contentOption}>
              

              <Aquarium className={classes.rootAquarium}/>
  

            </Box>
          </Grid>


          <Grid item xs={12} sm={3} justify = "center">    
            <Box display="flex" height="100%" bgcolor="white" className={classes.projectOption}>
          
                <List className={classes.listForm}>
                  <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt="수정" src={""} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="h5"
                              color="textPrimary"
                            >
                              {"dsd"}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={"userNickname"}
                        />
                  </ListItem>
                  <Divider/> 

                    <ChatViewer chatRoomId={1} height={'35vh'} className={classes.chatForm}/>
                    
                  <Divider/>

                  <Box bgcolor="red" height='35vh' >
                    <TaskProps/>
                  </Box>
                  
                  <Divider/>

                </List>

              </Box>
          </Grid>
        </Grid>

          
    </div>
  );
}



const TaskProps = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.tapRoot}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        style={{
          background: theme.palette.primary.main,
          color: "black",
          width:"25%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius : 10 ,
          marginTop : 10,
          marginBottom : 10
        }}
        TabIndicatorProps={{style: {width:"100%",  opacity: 0.3}}}
      >
        <Tab icon={<AssignmentIndIcon />} label="인원" aria-label="인원" />
        <Tab icon={<BallotIcon />} label="상태" aria-label="상태" />
        <Tab icon={<AssignmentIcon />} label="메모" aria-label="메모" />
        <Tab icon={<AssignmentLateIcon />} label="관리" aria-label="관리" />
      </Tabs>
      <Box className={classes.propsViews} > 
        <TabPanel value={value} index={0}>
          <TeamInfoList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Box>
      
    </div>
  );
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
     
      <Box> 
        {children}
      </Box>
      
    </div>
  );
}


const TeamInfoList = () => {
  const classes = useStyles();

  return (
    <Box> 
      <List  className={classes.teamInfoFrom} subheader={<li />}>
     
      <ListItem>
        <ListItemText primary={`df`} />
      </ListItem>
     
      </List>
    </Box>
  );
}





export default withRouter(Task)