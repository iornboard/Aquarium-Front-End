import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { authUserPage } from '../../_actions/index'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';

import { withRouter } from 'react-router-dom';
import InfoBarChart from '../../components/informations/InfoBarChart';
import InfoRadarChart from '../../components/informations/InfoRadarChart';
import SimpleMainInfoCard from '../../components/informations/simpleMainInfoCard';
import SimpleInfoCard from '../../components/informations/simpleInfoCard';
import SimpleInfoList from '../../components/informations/SimpleInfoList'

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import AquariumYT from '../../components/aquarium/AquariumYoutube';
import { readAllAquarium } from '../../_actions/actionAquarium'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // 변경
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 0.5,
    height: '100vh',
    // overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    float: 'left',
  },
  fixedHeight: {
    height: 240,
  },
  // 변경
  large: {
    width: theme.spacing(28),
    height: theme.spacing(28),
    marginTop: 50,
 
  },
  boxx:{
    display :"listitem",
    justifyContent : "center",
    padding : 25,
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "12px",
    borderColor: theme.palette.primary.main,
  },
  rootAquarium: {
    position: "relative",  
    margin: "10px 10px 75px 10px"
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
}));

function Mypage({match, userInfo, history}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [ aquariums, setAquariums ] = React.useState();   

  const [pageUserInfo, setPageUserInfo] = React.useState();

  const {userNickname, userId, userImgUrl, userEmail, createdAt} = {...pageUserInfo} 


  
   //!!!하드코딩!!!
  useEffect(() => {
    dispatch(authUserPage(match.params.username))
      .then(res => { res ? setPageUserInfo(res.payload.data) : history.push("/") })

    dispatch(readAllAquarium(userId))
      .then(res => res.payload)

  }, 1);


  useEffect(() => {
    if(userId != null){
      dispatch(readAllAquarium(userId))
      .then(res => setAquariums(res.payload))
    }
  }, [userId]);


  //!!!하드코딩!!!


  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        
          <Grid container>
            <Grid spacing={3} className={classes.root} item xs={4}>
              <Box className={classes.boxx}>
              <Avatar alt="userimg" src={userImgUrl} className={classes.large} />
                <br/>
                <Divider style={{margin : "10px 0px 10px 0px" , height: 3, backgroundColor: theme.palette.primary.main}}/>

              <Box textAlign="center" m={1}>
                <Typography variant="h4" gutterBottom>
                  {userNickname}
                </Typography>
              </Box>

              <Box textAlign="left" m={1}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>{"이메일: " + userEmail}</strong>
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>
                  <strong>{new Date(createdAt).toLocaleDateString('ko-KR', { year: 'numeric',month: 'long', day: 'numeric',}) + "일 가입됨"}</strong>
                </Typography>
              </Box>
              
             


              </Box>
            </Grid>
           
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                { aquariums ? <WorkCard aqrms={aquariums}/> : "" }
              </Paper>
            </Grid>
            {/* <Grid item xs={12} md={8} lg={9}>
              <Grid container>
                  <SimpleInfoCard/>
                  <SimpleInfoCard/>
                  <SimpleInfoCard/>
              </Grid> 
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <InfoBarChart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <SimpleMainInfoCard/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <SimpleInfoList />
              </Paper>
            </Grid> */}

            {/* <Grid item xs={3}>
              <Paper className={classes.paper}  >
                <InfoRadarChart height="100%" />
              </Paper>
            </Grid> */}
          
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}


const WorkCard = ({aqrms}) => {
  const classes = useStyles();


  return (
    <div>
    <Container className={classes.cardGrid}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {aqrms.map( Aq => (
               <AqrmCard aqrms={Aq}/>
            ))}
          </Grid>
    </Container>
    </div>
  );
}


const AqrmCard = ({aqrms}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Grid item xs={12} sm={6} md={4}>
      <Card onClick={handleClickOpen}>
         <CardMedia
          className={classes.cardMedia}
          image="../logo512.png"
          title="Image title"
          />
        <CardContent className={classes.cardContent}>
           <Typography gutterBottom variant="h5" component="h2">
            {aqrms.aqrmTitle}
          </Typography>
          {/* <Typography>
             {aqrms.aqrmLikeCount}
           </Typography> */}
         </CardContent>
      </Card>

      <Dialog onClose={handleClose}  maxWidth={"xl"} open={open} >
        <AquariumYT aqrmId={aqrms.aqrmId}  className={classes.rootAquarium} />
      </Dialog>
    </Grid>

  );
}


export default withRouter(Mypage)