import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
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
}));

function TestTask({match}) {
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
                        sdsd
                  <Divider/>
                </List>

              </Box>
          </Grid>
        </Grid>

          
    </div>
  );
}






export default withRouter(TestTask)