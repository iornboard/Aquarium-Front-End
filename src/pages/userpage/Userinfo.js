import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AppBar from '../../components/AppBarMain';
import Scroll from '../../components/ListMain';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
//아바타+텍스트필드

//------------이거삭제해보기
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
//--------이거삭제해보기

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '60vh',
    minHeight: '150vh'
  },
  main: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  //Website 2021부분
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

//--아바타
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(5), // 컨테이너테두리에서 안쪽 사이에 공간의 크기
    },
  
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
//--아바타
//텍스트필드
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '25ch',
    },
  },
  //수정및 저장버튼
  button: {
    margin: theme.spacing(1),
  },
  

}));



export default function StickyFooter() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <div className={classes.root}>
      <CssBaseline />
      
      <Container component="main" className={classes.main} maxWidth="sm">
        {/* 해당경로에 사진추가 및 위치변경하기 */}
      <Avatar alt="Aquarium" src="/static/images/avatar/1.jpg" className={classes.large}/>

        <Typography variant="h5" component="h6" gutterBottom>
          내 정보 수정
        </Typography>
{/* https://material-ui.com/components/text-fields/#text-field */}
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Email Address" />
          <TextField id="outlined-basic" label="Password" />
          <TextField id="outlined-basic" label="userFullname" />
          <TextField id="outlined-basic" label="userNickname" />
        </form>

        <Button variant="contained"  color="primary"size="large"className={classes.button}startIcon={<SaveIcon />}>
          수정 및 저장
        </Button>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">My sticky footer can be found here.</Typography>
          <Copyright />
        </Container>
      
      </footer>
    </div>
    
    <CssBaseline />
      <AppBar /> 
      {/* 바로 위에줄이 app바 import확인하기 */}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
        
            <Scroll/>

          </Container>
        </div>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}