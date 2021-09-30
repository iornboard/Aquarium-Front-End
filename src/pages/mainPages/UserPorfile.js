import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Uploader from  '../../components/common/Uploader';
import { userImage } from '../../_actions/actionUser' 
import { useDispatch , useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


//유튜브 메뉴참고해보기 메뉴 축약되는거

//------------이거삭제해보기 저작권
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default function StickyFooter({userInfo}) {//컨테이너로 감싸고 그리드로해서 만들기
  const classes = useStyles();
  const dispatch = useDispatch();

  const {userId, userEmail, userFullname, userNickname, userImgUrl} = {...userInfo}

  const fileInfo = useSelector( store => store.file.ImgFileInfo );
  const {fileDownloadUri} = {...fileInfo}


  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    const userImgUrl =  fileDownloadUri 

    const body = {userId , userImgUrl}

    dispatch(userImage(body))
    setOpen(false);

  }

  return (
    <div>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        {/* 해당경로에 사진추가 및 위치변경하기 */}

        <IconButton component="span" onClick = {handleClickOpen}>
          <Avatar alt="Aquarium" src={userImgUrl} className={classes.large}/>
        </IconButton>

        <Typography variant="h5" component="h6" gutterBottom>
          내 정보 수정
        </Typography>
        {/* https://material-ui.com/components/text-fields/#text-field */}
        {/* classes.root수정하기 */}
        <form  noValidate autoComplete="off">
          <TextField id="outlined-basic" margin="normal" fullWidth label="Email Address" />
          <TextField id="outlined-basic" fullWidth label="Password" />
          <TextField id="outlined-basic" margin="normal" label="userFullname" />
          <TextField id="outlined-basic" label="userNickname" />
          {/* 팔로워,팔로잉, 프로필사진(없으면 기본사진), 관리자,공지동의,최근 접속일, 비밀번호(보안성있게 만들기),토큰(권한설정즉 비번확인), 만든거,올린거 */}
        </form>
        {/* ERD랑 다른 커뮤니티 확인 */}
        <Button href="/" variant="contained"  color="primary"size="large"className={classes.button}startIcon={<SaveIcon />}>
          
          수정 및 저장
        </Button>
        
      </Container>

      <Dialog 
        fullWidth
        maxWidth='lg'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title"> 프로필 사진을 넣어주세요 </DialogTitle>
        <DialogContent>
          <Container>      
            <Uploader/>
              <Button 
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<SaveIcon/>}
                onClick = {onSubmitHandler}
                >
                Save
              </Button>
          </Container>
        </DialogContent>
      </Dialog>

    </div>

  
  );
}