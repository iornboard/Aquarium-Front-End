//  커뮤니티 메인 페이지
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckIcon from '@material-ui/icons/Check';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Link from '@material-ui/core/Link';

import Wave from "react-wavify";
import youtubeParser  from 'youtube-metadata-from-url';

import AquariumYT from '../../components/aquarium/AquariumYoutube';

import { readAllAquarium, readPullAquarium, createAquarium } from '../../_actions/actionAquarium'//*
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh',
  },
  placeRoot: {
    height: "90vh",
    justifyContent: "center",
    overflow: 'hidden',
    width: '100%',
  },
  placeList: {
    marginTop: 5,
    height: "95%",
    padding: '10px',
    overflow: 'auto',
    background: 'white',
    border: '15px solid white',
    borderRadius: 10,
  },
  placeBar: {
    marginTop: 5,
    marginLeft: 25,
    height: "95%",
    padding: '10px',
    background: 'white',
    border: '15px solid white',
    borderRadius: 10,
  },
  place: {
    height: "100%",
    padding: '10px',
  },
  cardRoot: {
    maxWidth: '100%',
    margin: 10
  },
  media: {
    height:"30vh"
  },
  rootAquarium: {
    position: "relative",  
    margin: "10px 10px 75px 10px"
  },
  waveform: {
    display: "flex",
    position: "absolute",
    zIndex: "-2",
    width: "100%",
    height: "100%",
    bottom: 0,
  },
  rootList:{
    marginLeft : 15,
    marginRight : 15, 
  },
  expandedPanel: {
    margin: "5% 0 0 0",
    marginBottom : "5%",
    padding : "5% 5% 3%;",
    borderRadius : 5,
    backgroundColor: theme.palette.primary.main,
    display :"flex",
    flexWrap :"wrap", 
    justifyContent : "flex-end"
  },
  commentField: {
    backgroundColor: "white",
    borderRadius: "5px",
    marginBottom: "10%",
    marginTop: "5%",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px",
    marginBottom: "2%"
  },
  comInput: {
    color: 'white'
  },

}));

 function MainPage({history}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userInfo = useSelector( store => store.auth.userData );
  const {userId, userNickname, userImgUrl} = {...userInfo}

  const [aquariums, setAquariums ] = React.useState([]);

  useEffect(() => {
    dispatch(readPullAquarium())
      .then(res => setAquariums(res.payload))
  },1);

  return (
    <div className={classes.root}>
      <Box height="10vh"/>

      <Box className={classes.waveform}>
        <WaveHome />
      </Box>

      <Grid container spacing={3} className={classes.placeRoot}>

        <Grid item xs={false} sm={4} className={classes.place}>
          <Box textAlign="center" margin='50px -10px 0 0'>
            <img src={"../potalLogo.png"} height="30%" alignItems = "center" />
            <Typography variant="h5" component="p" style={{ margin: '20px 0 20px 0'}}>
            <h2><strong>모두가 모이는 공간</strong></h2>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.placeList}>
          <Box width="auto" height="5%" color='white' textAlign="right" className={classes.header}>
            <Typography variant="h5" component="p" style={{ padding: '3px 10px 0 0'}}>
              Aquarium  
            </Typography>
          </Box>
          <ContentList aqrms={aquariums}/>
        </Grid>
        <Grid item xs={false} sm={3} className={classes.placeBar}>
          <Box width="auto" height="5%" color='white' textAlign="right" className={classes.header}>
            <Typography variant="h5" component="p" style={{ padding: '3px 10px 0 0'}}>
              MY  
            </Typography>
          </Box>
          <Box>  
            { userInfo ? <SideBar userInfo={userInfo} history={history}/> : <PleaseLogin/> }
          </Box>
        </Grid>
    
      </Grid>
    </div>
  );
}



function ContentList({aqrms}) {
  const classes = useStyles();
  
  return (
    <List className={classes.root}>
      {aqrms ? aqrms.map((aq) => (
        <li>
          <ContentCard aqrm={aq}/>
        </li>
      )) : ""}
    </List>
  );
}


function ContentCard({aqrm}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [ments, setMents] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.cardRoot}>

    <CardHeader
      avatar={
        <Avatar aria-label="recipe" src={aqrm.userInfo.userImgUrl} className={classes.avatar}>
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={aqrm.userInfo.userNickname}
      subheader={aqrm.userInfo.userEmail}
    />

    { aqrm.aqrmVideoUrl ? 
        <CardMedia
        onClick={handleClickOpen}
        className={classes.media}
        image={aqrm.aqrmThumbnail ? aqrm.aqrmThumbnail : "../logo512.png"}
        title="Paella dish"
        /> 
        : ''
    }
    
    <Typography variant="h5" component="p" style={{ margin: '20px 0 20px 0'}}>
      {aqrm.aqrmTitle}
    </Typography>

    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
       {aqrm.aqrmtext}
      </Typography>
    </CardContent>

    {/* <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions> */}
    
    {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
          minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
          heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
          browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
          and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
          pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
          saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
          without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
          medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
          again without stirring, until mussels have opened and rice is just tender, 5 to 7
          minutes more. (Discard any mussels that don’t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse> */}
    <Divider/>

      <Dialog onClose={handleClose}  maxWidth={"xl"} open={open} >
        <AquariumYT aqrmId={aqrm.aqrmId}  className={classes.rootAquarium} />
      </Dialog>
  </Box>
    
  );
}

function SideBar({userInfo,history}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(false);
  const [values, setValues] = useState({});

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const onSubmitHandler = (event) => {

    if(values.aqrmVideoUrl){

      youtubeParser.metadata(values.aqrmVideoUrl)
      .then( info => {
          const data = {...values, aqrmThumbnail: info.thumbnail_url, userId: userInfo.userId }
          dispatch( createAquarium(data) )
          window.location.replace("/")
      })
      .catch( err => {
      });

    }else{

      const data = {...values, userId: userInfo.userId }
      dispatch( createAquarium(data) )
      window.location.replace("/")
    }
  }
  
  return (
    <Box className={classes.rootList}>
      
              <List className={classes.root}>
              <Box textAlign="right">
                <Typography
                   component="span"
                   variant="body1"
                   color="textPrimary"
                 >
                  - 환영합니다 <i>{userInfo.userNickname}</i> 님 -
                </Typography>
              </Box>

              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar variant="rounded" alt="수정" src={userInfo.userImgUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="h5"
                        color="textPrimary"
                      >
                        {userInfo.userNickname}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={userInfo.userEmail}
                />
              </ListItem>

              
              <Divider/>
                <Box display="flex" flexWrap="wrap" justifyContent="flex-end">
                    <IconButton onClick={handleChange}>
                      <Typography style={{ margin: '0 10px 0 0'}} variant="subtitle1"> <i> 아쿠아리움 추가하기 </i> </Typography>
                      <PlayCircleFilledIcon/>
                    </IconButton>
                </Box>
              <Divider/>

              <Collapse in={checked}>
                <Box className={classes.expandedPanel}>
                  <Box color="white">
                    <Typography style={{ margin: '0 0 10px 0'}} variant="h5"> <PlayCircleFilledIcon style={{  position: 'relative', top: '3px'}}/> <strong> 새 아쿠아리움 추가 </strong> </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    id="aqrmTitle"
                    name="aqrmTitle"
                    label="제목을 입력해주세요"
                    onChange={handleFormChange}
                    value={values.aqrmTitle}
                    InputProps={{
                      className: classes.comInput
                    }}
                    style={{ margin: '0 0 10px 0'}}
                  />
                  <TextField
                    fullWidth
                    id="aqrmVideoUrl"
                    name="aqrmVideoUrl"
                    label="유튜브 URL을 입력해 주세요"
                    onChange={handleFormChange}
                    value={values.aqrmVideoUrl}
                    InputProps={{
                      className: classes.comInput
                    }}
                  />
              
                  <TextField
                    className={classes.commentField}
                    fullWidth
                    id="aqrmtext"
                    name="aqrmtext"
                    multiline
                    rows={4}
                    maxRows={4}
                    onChange={handleFormChange}
                    variant="outlined" 
                    value={values.aqrmtext}
                  />

                  <Button variant="contained" color="secondary" onClick={onSubmitHandler}>
                    생성
                  </Button>
                </Box>
              </Collapse>
              
              <Divider/>    
      </List>
    </Box>  
  );
}

const WaveHome = () => (
  <Wave
    fill="#ff8346"
    paused={false}
    options={{
      height: 870,
      amplitude: 20,
      speed: 0.2,
      points: 3,
    }}
  />
);

const PleaseLogin = () => (
  <Box textAlign="center" style={{ margin: '100px 0 0 0'}}>
    <img src={"../logo192.png"} height="30%" alignItems = "center" />
    <Typography variant="h5" component="p" style={{ margin: '20px 0 20px 0'}}>
      <strong>커뮤니티를 통해 다양한 사람들과 </strong><br/>
      <strong>경험을 공유해보세요</strong><br/><br/>
      <h6><i><Link href="/signin"> -로그인 하러가기- </Link></i></h6> 
    </Typography>
  </Box>
);

export default withRouter(MainPage)