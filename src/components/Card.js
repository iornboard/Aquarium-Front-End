import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import CommentForm from './Comment'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AvatarComp from './AvatarComp';
import { useDispatch , useSelector } from 'react-redux';
import { createComment , getPostComments } from '../_actions/actionComment'


const useStyles = makeStyles((theme) => ({
  root: {
    width : '100%' 
  },
  avatar: {
    backgroundColor: red[500],
    marginTop: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  comment: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  button: {
    marginTop: theme.spacing(1),
  },
  gridList: {
    height: 300,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NomalCard(props) {

  const classes = useStyles();
  const dispatch = useDispatch();


  // !!! hardCoding !!! 
  const {postText, postTitle, postImgUrl, postId ,user } = props.post
  const {userNickname, userImgUrl} = props.post.user

  const userInfo = useSelector( store => store.auth.userData , []);
  const {userId} = {...userInfo}

 // !!! hardCoding !!! 

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([]);
  const [comments, setComments] = React.useState();

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleClickOpen = () => {
    setOpen(true);

    // 사실상 useEffect를 대신하는 것
    if(!comments){
      dispatch(getPostComments(postId))
      .then(res => setComments(res.payload))
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    const body = {...values, postId, userId }
    
    dispatch(createComment(body))

    // !!! hardCoding !!! 
    setTimeout( dispatch(getPostComments(postId)).then(res => setComments(res.payload)),5000);
    // !!! hardCoding !!! 

  }


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <AvatarComp user = {user}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {postTitle}
        subheader={userNickname} 
      />
      
        {postImgUrl ? <CardMedia
          className={classes.media}
          image= {postImgUrl}
        />: ""}
        <CardContent>
          <Typography paragraph> {postText} </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="show more"  className={classes.comment} onClick={handleClickOpen}>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Dialog 
        fullWidth
        maxWidth='lg'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogTitle id="alert-dialog-slide-title">{postTitle}</DialogTitle>
        <DialogContent>
          <Grid container>

            <Grid item xs= {8} style={{padding:16}}>
              <Card className={classes.root}>
              <CardHeader
                avatar={
                  <AvatarComp user = {user}/>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title= {postTitle}
                subheader="September 14, 2016"
              />
                {postImgUrl ? <CardMedia
                  className={classes.media}
                  image= {postImgUrl}
                />: ""}
                <CardContent>
                  <Typography paragraph> {postText} </Typography>
                </CardContent>
              </Card>
                
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item >
                  <AccountCircle />
                </Grid>
                <Grid item xs= {9}>
                  <TextField fullWidth id="input-with-icon-grid" label="With a grid" name="commentText" onChange={handleFormChange }/>
                </Grid>
                <Grid item xs= {1} >
                  <Button variant="contained" color="primary" onClick = { onSubmitHandler }>
                    go!
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs= {4} style={{padding:16}}>
              <GridList cellHeight={60} className={classes.gridList} cols={1}>
                  <List>
                    
                    {comments? comments.map( co => <div> <CommentForm comment={co}/>  <Divider variant="inset" component="li" /> </div> ) : "" }   

                  </List>
              </GridList>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>

    </Card>
  );
}