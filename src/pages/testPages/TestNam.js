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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

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
    backgroundColor: theme.palette.background.paper,
    
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

        <Grid container spacing={3} className={classes.content}>
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

                  <Box bgcolor="red" height='35vh'>
                    <TaskProps/>
                  </Box>

                </List>

              </Box>
          </Grid>
        </Grid>

          
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



const TaskProps = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.tapRoot}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} >
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}







export default withRouter(Task)