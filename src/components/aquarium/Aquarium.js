//구현 이슈

// 1. 외부에서 가져온 커스컴 컴포넌트(기본 분류로 할 것) 또는 컴포넌트를 HOC형식으로 변환할 것
// 2. 마커의 시간 변환시 즉각 삭제 되도록 변경할 것
// 3. 컴포넌트를 완벽한 felx가 되도록 구현할 것 
// 4. 시범용 영상, 저작권이 괜찮은지 


import React, {useRef, useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { makeStyles, useTheme , withStyles } from '@material-ui/core/styles';
import { createMention, readMention, readAllMentMark } from '../../_actions/actionMention'
import { createCommnet, readAllMentCommnet } from '../../_actions/actionComment'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import ListSubheader from '@material-ui/core/ListSubheader';



import logo from '../../hoc/logo.png';

//외부에서 가져온 커스컴 컴포넌트(기본 분류로 할 것) 또는 컴포넌트를 HOC형식으로 변환할 것
import AvatarComp from "../common/AvatarComp";
import Uploader from "../common/Uploader"
import SimpleProgress from "../common/SimpleProgress"


import videojs from 'video.js';
import VREPlayer from 'videojs-react-enhanced';
import 'video.js/dist/video-js.css';


// const AccordionDetailsSty = withStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.primary.main,
//   },
// }))(AccordionDetails);


const useStyles = makeStyles((theme) => ({
  basic: {
    marginBottom: "5%"
  },
  basicShadow: {
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3);"
  },
  canvasForm: {
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  timeSlideOption: {
    margin: "5% 0% 0% 0%" 
  },
  mentionField: {
    backgroundColor: "white",
    borderRadius: "5px",
    marginBottom: "5%"
  },
  fabProgress: {
    position: 'absolute',
    top: 14.4,
    left: 15.4,
    zIndex: 1,
  },
   markerModal: {
    position: 'absolute',
    zIndex: 1,
  },
  drawerPaper: {
    width: 350,
  },
  rootList:{
    marginLeft : 15,
    marginRight : 15, 
  },
  drawerimage: {
    width: "100%",
    marginTop : "5%",
    marginBottom : "5%",
    marginLeft : "auto",
    marginRight : "auto" 
  },
  expandedPanel: {
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
    marginBottom: "10%"
  },
  commentList: {
    margin: "5% 0% 5%",
    width: '100%',
    overflow: 'auto',
    maxHeight: '20vh',
  },
}));




// const sampleMentionInfos = [ 
//   { x:150 , y:150 , mentText:"여기에 내용 그리고 여기에 내용", mentId : 1 , start:0 , end:5},
//   { x:300 , y:300 , mentText:"여기에 내용2", mentId : 2 , start:10 , end:15},
//   { x:70 , y:300 , mentText:"여기에 내용3", mentId : 3 , start:5 , end:15},
//   { x:500 , y:500 , mentText:"여기에 내용4", mentId : 4 , start:0 , end:15},
//   { x:280 , y:600 , mentText:"여기에 내용5", mentId : 5 , start:10 , end:20},
// ]


var globalVideoTime = 0  // const 와 var의 차이 알아서 이 부분은 효울적으로 수정하기 !!


const Aquarium = ( {width=1280, height=720, scr='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', className , aqrmId} ) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const userInfo = useSelector( store => store.auth.userData);  // 현재 유저 정보 받아오기
  const {userId, userNickname, userImgUrl} = {...userInfo} 

  const fileInfo = useSelector( store => store.file.ImgFileInfo);  // 현재 유저 정보 받아오기
  const {fileDownloadUri} = {...fileInfo} 

  const [mentions, SetMentions] = React.useState();
  const [values, setValues] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [timeValue, setTimeValue] = React.useState([20, 37]);
  const [showed, setShowed] = React.useState(false);
  

  const [ctx, setCtx] = useState([]);
  const [positionX, setPositionX] = useState([]);  // 캔버스로 받는 X좌표
  const [positionY, setPositionY] = useState([]);  // 캔버스로 받는 y좌표


  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = width;
    canvas.height = height*0.95; 

    // flex로 구현할 때
    // const rect = canvas.parentNode.getBoundingClientRect()
    // canvas.width = rect.width;
    // canvas.height = rect.height*0.95;  


    // window.addEventListener('resize', (e) => {
    //   const rect = canvas.parentNode.getBoundingClientRect()
    //   canvas.width = rect.width;
    //   canvas.height = rect.height*0.95;  

    // })

    const context = canvas.getContext("2d");
    context.fillStyle="rgba(0, 255, 255, 0.00)";
    context.fillRect(0,0,canvas.width,canvas.height);

    setCtx(contextRef.current);


    dispatch(readAllMentMark(aqrmId))
      .then(res => SetMentions(res.payload))

  },[])


  
// 캔버스를 눌러 위치를 구하는 함수
  const addMention = (e) => {
    var bx = e.target.getBoundingClientRect(),
    x = e.clientX - bx.left,y = e.clientY - bx.top;


    setPositionX(x);
    setPositionY(y);
    
    setOpen(true);
    setShowed(true);

    setSelectedTime(globalVideoTime)  // 상황에 따라서 조절하기
}

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleTimeValueChange = (event, newValue) => {
    setTimeValue(newValue);
  };

  const onSubmitHandler = (event) => {

    const newMention = { x: positionX, y: positionY, mentText: values, mentImgUrl : fileDownloadUri, start:selectedTime, end:selectedTime+5, userId:userId, aqrmId:aqrmId }
    
    dispatch(createMention(newMention))
      .then(res => {SetMentions( prev => [...prev, res.payload] ) })
  
    setOpen(false);
    setValues("");

  }


  return (
    <div>
      
    { aqrmId ? 
    <Box position='absolute' zIndex={1}  className={className}>
          <Box
                  p={2}
                  position="absolute"
                  top={positionY}
                  left={positionX}
                  zIndex="tooltip"
                  >
              <Zoom in={open} >
                <Chip avatar={ <Avatar>M</Avatar> } label={"여기에 새 맨션 추가"} color="primary" className={classes.basicShadow} />
              </Zoom>
          </Box>
        
        
        <canvas 
          ref={canvasRef}
          onMouseDown={addMention}
        > 
        </canvas> 


        <VideoPlayer  className={classes.canvasForm} scr={scr} /> {/* <- 비디오 컴포넌트 부분  ->*/}


        { mentions ?  mentions.map( men => <CustomMarker mentInfo={men} userId={userId} />) : " " }   {/* 마커의 생성*/}

        <Drawer
              variant="temporary"
              anchor={'right'}
              open={open}
              onClose={handleClose}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
            
            <Box width="auto" height="6%" display="inline-block"  bgcolor={theme.palette.primary.dark}>
              <img src={logo} height="100%" alignItems = "center" />
            </Box> 

            <Box bgcolor={theme.palette.primary.main} height="100%" >
              
              <Box margin="5%" display="flex" flexWrap="wrap" justifyContent="flex-end" >

                <TextField
                  name='mentText'
                  className={classes.mentionField}
                  fullWidth
                  id="filled-multi=ine-flexible"
                  multiline
                  rows={10}
                  maxRows={8}
                  onChange={e => setValues(e.target.value)}
                  variant="outlined" 
                  value={values}
                />

                <Uploader className={classes.basic}/>
          
                <Button variant="contained" color="secondary" onClick={onSubmitHandler}>
                  댓글 버튼
                </Button>

                <Slider
                  className={classes.timeSlideOption}
                  color='secondary'
                  fullWidth
                  value={timeValue}
                  step={5}
                  min={0}
                  max={110}
                  onChange={handleTimeValueChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                />
              </Box>
            </Box>    
        </Drawer>
            
        <Box height={height} width={width} position="absolute" top={0} zIndex={-5} bgcolor="rgb(0, 0, 0)" />  {/*  영상을 못 찾았을때 표시하기 위한 박스  */}  
    </Box>
     : 
     "정보를 불러오지 못했습니다. "
     }

     </div>
  );
}



const VideoPlayer = ({className, width, height, scr}) => {

  const playerOptions = {
    width: width,
    height: height,
    src: scr,
    controls: true, 
    autoplay: "any",
  };
  const videojsOptions = {
    fluid: false,
  };

  const timeUpdater = (e,player,currentTimeSecond) => {
    const currentSecond = Math.floor(currentTimeSecond);
    
    globalVideoTime = currentSecond
    //console.log(globalVideoTime)
  };

  //!!! 추후 수정할 수도 있는 코드 -> 타임라인을 변경할 때마다, 마커나 다시 렌더링 될 수 있게 함 ->  아님 마커 내부에서 5초마다 다시 렌더링을 확인하는 방법 또는 show,hidden 방법의 개선이 있음 
  const reRander = () => {
    // console.log('리렌더링')
  }

  return (
    <Box className={className}>
      <VREPlayer
          playerOptions={playerOptions}
          videojsOptions={videojsOptions}
          onReady={(player) => console.log(player)}
          onTimeUpdate={timeUpdater}
          onSeeking={reRander}
        />
    </Box>
  );
}




const CustomMarker = ({ mentInfo, userId }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  // const timeRef = useRef(0);
  
  const [mentionMainInfo, setMentionMainInfo] = React.useState();  // 멘션 세부정보

  const [comments, setComments] = React.useState([]);  // 댓글들 
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [showed, setshowed] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  
   // !!!수정해야 하는 사항 -> 마커를 움직을 때의 이슈를 해결 할 것 
  useEffect(() => {
    setInterval(() => {
      // 프로그래스 설정
      const timer = setInterval(() => {
        setProgress(((globalVideoTime - mentInfo.start + 1 ) / (mentInfo.end - mentInfo.start)  * 100 ) );
  
        if(progress>=100) clearInterval(timer);
      }, 1000);

      // 마커 보이기 설정
      if(globalVideoTime == mentInfo.start || globalVideoTime == mentInfo.end){

        if(globalVideoTime <= mentInfo.start){
          setshowed(true) 
        } 
        if(globalVideoTime >= mentInfo.end) {
          setshowed(false) 
          setOpen(false)
      }}
    }, 1000);
  }, []);

  const handleOpen = () => {

    dispatch(readMention(mentInfo.mentId))
      .then(res => setMentionMainInfo(res.payload))

    dispatch(readAllMentCommnet(mentInfo.mentId))
      .then(res => setComments(res.payload))

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMentionMainInfo(null) 
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const onSubmitHandler = () => {

    const newCommnet = { commentText : values, userId : userId, aqrmId :mentionMainInfo.aqrmId , mentId : mentionMainInfo.mentId }

    dispatch(createCommnet(newCommnet))
      .then(res => {setComments(prev => [...prev, res.payload])})

    setValues("");
    setChecked(false)
  }
  
  

  return (
    <Box p={2} position='absolute' top={mentInfo.y} left={mentInfo.x} zIndex={1} >

      <Fade in={showed}>
        <Box >
          <Chip avatar={ <Avatar src={mentInfo.avatarImg} /> } label={<EllipsisText> {mentInfo.mentText} </EllipsisText>} onClick={handleOpen} className={classes.basicShadow} />
            <CircularProgress value={progress} size={35} thickness={8} variant="determinate" className={classes.fabProgress} /> {/* 남은 시간 표시 */}
        </Box>
      </Fade>

        <Drawer
            variant="temporary"
            anchor={'right'}
            open={open}
            onClose={handleClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
          <Box width="auto" height="6%" bgcolor="grey.300" display="inline-block">
          </Box> 

          {mentionMainInfo ? 
            <Box className={classes.rootList}>
              <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar variant="rounded" alt="수정" src={mentionMainInfo.userInfo.userImgUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="h5"
                        color="textPrimary"
                      >
                        {mentionMainInfo.userInfo.userNickname}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={mentionMainInfo.userInfo.userEmail}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                      <Typography
                        component="span"
                        variant="h6"
                        color="textPrimary"
                      >
                        {mentionMainInfo.mentText}
                      </Typography>
                  }
                />
              </ListItem>
              <ListItem alignItems="center" >
                {mentionMainInfo.mentImgUrl ? <img className={classes.drawerimage} src={mentionMainInfo.mentImgUrl} alt={"시벙용 그림"} /> : ""}
              </ListItem>

              </List>
              <Divider/>
                <Box display="flex" flexWrap="wrap" justifyContent="flex-end">
                    <IconButton>
                        <CheckIcon/>
                    </IconButton>
                    <IconButton onClick={handleChange}>
                      <ModeCommentIcon/>
                    </IconButton>
                </Box>
              <Divider/>

              <Collapse in={checked}>
                <Box className={classes.expandedPanel}>
                  <TextField
                        className={classes.commentField}
                        fullWidth
                        id="filled-multi=ine-flexible"
                        multiline
                        rows={4}
                        maxRows={4}
                        onChange={e => setValues(e.target.value)}
                        variant="outlined" 
                        value={values}
                  />

                  <Button variant="contained" color="secondary" onClick={onSubmitHandler}>
                    댓글 버튼
                  </Button>
                </Box>
              </Collapse>
              
              <Divider/>

              <List className={classes.commentList}>
              {comments.map((comt) => (
                <Comment commentInfo={comt}/>
              ))}
              </List>

            </Box>  
          :  
            <Box height={"100%"} display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
              <SimpleProgress/>
            </Box>  
          }  
        </Drawer>

    </Box>



  );
};



function Comment({commentInfo}) {
  const classes = useStyles();

  return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AvatarComp user = {commentInfo.userInfo} />
        </ListItemAvatar>
        <ListItemText
          primary= {commentInfo.userInfo.userNickname}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
              </Typography>
              { commentInfo.commentText }
            </React.Fragment>
          }
        />   
        </ListItem>
  );
}



const EllipsisText = (props) => {
  const { children } = props

  return (
    <div style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 100
      }}>
      {children}
    </div>
  )
}

export default Aquarium;