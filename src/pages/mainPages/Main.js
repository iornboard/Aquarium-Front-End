//  커뮤니티 메인 페이지
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
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

import AquariumYT from '../../components/aquarium/AquariumYoutube';

import {content} from '../../_actions/index'

import { readAllAquarium, readPullAquarium } from '../../_actions/actionAquarium'//*

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh',
  },
  placeRoot: {
    height: "90vh",
    justifyContent: "flex-end",
    overflow: 'hidden',
    width: '95%'
  },
  placeList: {
    height: "100%",
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: '10px',
    overflow: 'auto'
  },
  place: {
    height: "100%",
    borderRight: `1px solid ${theme.palette.divider}`,
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
}));

export default function MainPage({userInfo}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [aquariums, setAquariums ] = React.useState([]);

  useEffect(() => {
    dispatch(readPullAquarium())
      .then(res => setAquariums(res.payload))
  },1);

  return (
    <div className={classes.root}>
      <Box height="10vh"/>

      <Grid container spacing={3} className={classes.placeRoot}>

        <Grid item xs={12} sm={1} className={classes.place}>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.placeList}>
          <ContentList aqrms={aquariums}/>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.place}>
            <List>
              <Box height="10vh">  {/*  사용자 정보 */} </Box>

              <Box height="10vh">  {/*  친구들 정보 */} </Box>

              <Box height="10vh">  {/*  광고? 또는 트렌트 */} </Box>
            </List>
        </Grid>
    
      </Grid>
{/* 
      <Dialog onClose={handleClose}  maxWidth={"xl"} open={open} >
        <AquariumYT aqrmId={aqrms.aqrmId}  className={classes.rootAquarium} />
      </Dialog> */}
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onContentHandler = () => {
    dispatch(content(aqrm))
  }

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

    <CardMedia
      onClick={onContentHandler}
      className={classes.media}
      image={aqrm.aqrmThumbnail ? aqrm.aqrmThumbnail : "../logo512.png"}
      title="Paella dish"
    />

    <Typography variant="h5" component="p" style={{ margin: '20px 0 20px 0'}}>
      {aqrm.aqrmTitle}
    </Typography>

    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
       {aqrm.aqrmtext}
      </Typography>
    </CardContent>

    <CardActions disableSpacing>
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
    </CardActions>
    
    <Collapse in={expanded} timeout="auto" unmountOnExit>
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
    </Collapse>
  </Box>
    
  );
}