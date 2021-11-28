//  커뮤니티 메인 페이지
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import AssignmentIcon from '@material-ui/icons/Assignment';

const sampleTerm = {
  termId:1,
  termTitle: '샘플 약관',
  termDescription: '샘플 약관입니다.',
  termText: '프로젝트를 진행하면서 다음과 같은 조항을 명사한다. 1.~ 하지 않는다. 2. ~하지 않는다. 3.~한다.',
  termOwnerInfo: {userId: 1, userName: '남현수'},
  termAgreeUsersId: [1,2,5,3,6],
  createAt: '2021-11-14 19:22:34',
  termRequired: true,
}

const sampleTerms = [sampleTerm, sampleTerm, sampleTerm]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh',
  },
  formRoot: {
    padding: 10,
    height: '91%',
    borderRadius: '5px'
  },
  placeRoot: {
    height: "90vh",
    justifyContent: "center",
    overflow: 'hidden',
    width: '100%',
  },
  rootList: {
    width: '100%',
    minWidth : "20vw",
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  termList: {
    margin: "5% 0% 5%",
    width: '100%',
    overflow: 'auto',
    maxHeight: '60vh',
  },
  listForm: {
    marginTop: 5,
    width: '100%',
  },
  place: {
    height: "100%",
    padding: '10px',
  },
  waveform: {
    display: "flex",
    position: "absolute",
    zIndex: "-2",
    width: "100%",
    height: "100%",
    bottom: 0,
  }, 
  termsViewerForm: {
    backgroundColor: theme.palette.primary.light,
    weight: "100%",
     height: "90%",
     borderRadius: '10px'
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px",
    marginBottom: "2%"
  },
  termBar: {
    width: "95%",
    padding: "5px",
    background: "#EAE9E9",
    margin: "5px"
  },
  termBarList: {
    width: "100%",
    marginLeft: '7px'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(6),
    right: theme.spacing(7),
  },
}));


 function MainPage({userInfo}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {userId, userNickname, userImgUrl} = {...userInfo} 

  const [open, setOpen] = React.useState(false);
  const [termRequired, setTermRequired] = React.useState(false);

  const toggleChecked = () => {
    setTermRequired((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };



  return (
    <div className={classes.root}>
      <Box height="10vh"/>

      <Grid container spacing={3} className={classes.placeRoot}>

        <Grid item xs={false} sm={3} className={classes.place}>

        <Box display="flex" height="100%" bgcolor="white" className={classes.rootList}>
        <List className={classes.listForm}>
          <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="rounded" alt="수정" src={userImgUrl} style={{position :'relative', top : 5  }}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="h5"
                          color="textPrimary"
                        >
                          {"사용자 약관 관리"}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={userNickname}
                    />
            </ListItem>
            <Divider/>  
              <List className={classes.termList}>
                {sampleTerms ? sampleTerms.map(tm=> ( <TermBar termInfo={tm}/> )) : ""}
              </List>
            <Divider/>
        </List>
        </Box>

        </Grid>
        <Grid item xs={12} sm={6} className={classes.placeList}>

          <Box className={classes.termsViewerForm}>

            <TermFrom termInfo={sampleTerm}/>

          </Box>
        </Grid>
      </Grid>

      <Fab aria-label={'Add'} className={classes.fab} color={"primary"} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        maxWidth="lg"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"> <br/> <Typography variant="h4">  <strong> 새 약관 생성 </strong> </Typography> </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="termTitle"
                name="termTitle"
                label="약관 제목"
                fullWidth
                
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="termDescription"
                name="termDescription"
                label="약관 설명"
                multiline
                rows={2}
                maxRows={2}
                variant="outlined" 
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="termText"
                name="termText"
                label="약관 내용"
                multiline
                rows={12}
                variant="outlined" 
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={ <Switch checked={termRequired} onChange={toggleChecked} inputProps={{ 'aria-label': 'primary checkbox' }} />}
                label="선택 필수"
              />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} color="primary" style={{margin: "10px"}}>
            생성
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}



function TermFrom({termInfo}){
  const classes = useStyles();
  const theme = useTheme();

  const [checked, setChecked] = React.useState(true);

  const checkChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <div className={classes.formRoot}>
        <AppBar position="relative">  
          <Toolbar>
            <Typography variant="h4"> 사용자 약관 </Typography>
          </Toolbar>
        </AppBar>
        <List className={classes.rootList} style={{borderRadius: '0 0 10px 10px', padding: 20, height:'95%'}}>
          <li>
              <br/>
              <Typography variant="h5" component="h2">
                <strong> {termInfo.termTitle} </strong>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {termInfo.termDescription}
                </Typography>      
                <br/><br/>
                <Box style={{minHeight:'35vh', padding: 20, background: theme.palette.primary.light , borderRadius: '10px'}}>
                  <Typography color="textSecondary">
                    {termInfo.termText}
                  </Typography>  
                </Box>
                <br/>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveCard" value="yes" onChange={checkChange} />}
                    label="Remember credit card details for next time"
                />
              <br/>
          </li>
          <Divider/>
          <li>
              <br/>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                  <strong> 약관 정보 </strong>
                  </Typography>
                  <Typography color="textSecondary"> <strong> 약관 생성자 :  </strong> { termInfo.termOwnerInfo.userName }</Typography>
                  <Typography color="textSecondary"> <strong> 선택 여부 :  </strong> { termInfo.termRequired ? "필수" : "선택" }</Typography>
                  <Typography color="textSecondary"> {new Date( termInfo.createAt ).toLocaleDateString('ko-KR', { year: 'numeric',month: 'long', day: 'numeric',}) + " 에 생성됨"} </Typography>

              
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                  <strong> 참여자 정보 </strong>
                  </Typography>
                  <Grid container>
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                  </Grid>
                </Grid>
              </Grid>
              <br/><br/>
              <Box textAlign="right">
                <Button variant="contained" disabled={!checked} color="primary" href="#contained-buttons">
                  동의
                </Button>
              </Box>
              <br/>
          </li>
        </List>
    </div>
  )
}



function TermBar({termInfo}) {
  const classes = useStyles();
  return (
        <Button className={classes.termBar}>
          <List className={classes.termBarList}> 
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AssignmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={termInfo.termTitle} secondary={new Date( termInfo.createAt ).toLocaleDateString('ko-KR', { year: 'numeric',month: 'long', day: 'numeric',}) + " 에 생성됨"} />
          </ListItem> 
          </List>
        </Button>
  );
}



export default withRouter(MainPage)