import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
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

  const post = props.post
  const {postText, postTitle, postImgUrl} = {...post}
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([]);
  

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      //callApiPost().then(res => setPosts(res));
    }

  };

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }



  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
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
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
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
                  <TextField fullWidth id="input-with-icon-grid" label="With a grid" />
                </Grid>
                <Grid item xs= {1} >
                  <Button variant="contained" color="primary">
                    go!
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs= {4} style={{padding:16}}>
              <GridList cellHeight={60} className={classes.gridList} cols={1} onScroll={handleScroll}>
                  <List>
                    
                    <CommentForm/>
                    <Divider variant="inset" component="li" />

                  </List>
              </GridList>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>

    </Card>
  );
}