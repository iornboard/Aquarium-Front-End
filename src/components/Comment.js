import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import AvatarComp from './AvatarComp';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function CommentList(props) {
  const classes = useStyles();

  const {commentText , user , post } = props.comment
  const {postText, postTitle, postImgUrl, postId } = props.comment.post
  const {userNickname, userImgUrl} = props.comment.user


  return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AvatarComp user = {user} />
        </ListItemAvatar>
        <ListItemText
          primary= {userNickname}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {commentText}
            </React.Fragment>
          }
        />   
        </ListItem>
  );
}