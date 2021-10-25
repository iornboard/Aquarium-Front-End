import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Uploader from "../../components/common/Uploader";
import { userImage } from "../../_actions/actionUser";
import { useDispatch, useSelector } from "react-redux";

import Wave from "react-wavify";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh", //네모칸
    Width: "100vh",
    // position: "absolute",
    // screenLeft : "50%",
    //screenTop : "50%",
    
    // flexDirection: 'column',
    // minHeight: '60vh',
    // minHeight: '150vh'
    
  },
  //211024 ~49L
  background: {
    position: "absolute",
    zIndex: "-4",
    backgroundColor: theme.palette.primary.light,
    height: "100%",
    width: "100%",
  },
  waveform: {
    display: "flex",
    position: "absolute",
    zIndex: "-2",
    width: "100%",
    height: "100%",
    bottom: 0,
  },
  boxer: {
    display: "flex",
    justifyContent: "center",
    Width : "100%",
    height: "100%",
  },
  paper: {//주황선으로감싼 상자
    height: "100%",
    width: "80%",
    margin: theme.spacing(8, 4),
    padding: "60px 30px 60px 30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: theme.palette.primary.main,
    minWidth: "50vh",
    maxWidth: "150vh",
    backgroundColor: "white",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
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
  // root: {
  //   display: 'flex',
  //   '& > *': {
  //     margin: theme.spacing(5), // 컨테이너테두리에서 안쪽 사이에 공간의 크기
  //   },
  // },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  //--아바타
  //텍스트필드
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(5),
  //     width: '25ch',
  //   },
  // },
  //수정및 저장버튼
  button: {
    margin: theme.spacing(1),
    variant: "contained",
    color: "primary",//"theme.palette.primary.main",
    size: "large",
  },
}));

function UserPorfile({ userInfo }) {
  //컨테이너로 감싸고 그리드로해서 만들기
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userId, userEmail, userFullname, userNickname, userImgUrl } = {
    ...userInfo,
  };

  const fileInfo = useSelector((store) => store.file.ImgFileInfo);
  const { fileDownloadUri } = { ...fileInfo };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    const userImgUrl = fileDownloadUri;

    const body = { userId, userImgUrl };

    dispatch(userImage(body));
    // setOpen(false); 211024
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.background} />
      <Box className={classes.waveform}>
        <WaveHome />
      </Box>

      <CssBaseline />
      <Box className={classes.boxer}>
        <div className={classes.paper}>
          {/* <Container component="main" className={classes.main} maxWidth="sm"> */}
          {/* 해당경로에 사진추가 및 위치변경하기 */}

          <IconButton component="span" onClick={handleClickOpen}>
            <Avatar alt="Aquarium" src={userImgUrl} className={classes.large} />
          </IconButton>

          <Typography variant="h5" component="h6" gutterBottom>
            내 정보 수정
          </Typography>
          {/* https://material-ui.com/components/text-fields/#text-field 텍스트 부분수정 */}
          {/* classes.root수정하기 */}
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              fullWidth
              margin="normal"
              label="사용자 이름"
            />
            <TextField id="outlined-basic" fullWidth label="닉네임" />
            <TextField
              id="outlined-basic"
              fullWidth
              margin="normal"
              label="이메일 주소"
            />
            <TextField id="outlined-basic" fullWidth label="비밀번호" />
            {/* 팔로워,팔로잉, 프로필사진(없으면 기본사진), 관리자,공지동의,최근 접속일, 비밀번호(보안성있게 만들기),토큰(권한설정즉 비번확인), 만든거,올린거 */}
          </form>
          {/* ERD랑 다른 커뮤니티 확인 */}
          <Box marginTop="50px">
            <Button
              href="/"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              수정 및 저장!
            </Button>
          </Box>
          {/* </Container> */}
        </div>
      </Box>

      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {" "}
          프로필 사진을 넣어주세요{" "}
        </DialogTitle>
        <DialogContent>
          <Container>
            <Uploader />
            <Button
              fullWidth
              variant="contained"
              color="theme.palette.primary.main"
              startIcon={<SaveIcon />}
              onClick={onSubmitHandler}
            >
              Save
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default UserPorfile;

const WaveHome = () => (
  <Wave
    fill="#ff8346"
    paused={false}
    options={{
      height: 600,
      amplitude: 20,
      speed: 0.2,
      points: 3,
    }}
  />
);