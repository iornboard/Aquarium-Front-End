import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({

  }));


export default function AvatarComp(props) {

  const classes = useStyles();

  const {userNickname, userImgUrl} = props.user

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
        <div>

          <Avatar variant="rounded" alt="수정" src="수정" onClick = {handleClickOpen} />

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title"> <div><Avatar src = {userImgUrl} /></div>  <div></div>{userNickname}</DialogTitle>

            <DialogContent>

              유저정보를 표기합니다

            </DialogContent>
          </Dialog>
        </div>
  );
}

