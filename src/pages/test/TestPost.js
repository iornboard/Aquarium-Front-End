import React, { useState } from "react"
import { useDispatch , useSelector } from 'react-redux';
import { CreatePost } from '../../_actions/actionPost';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import UploadTab from '../../components/UploadTab'
import AppBar from '../../components/AppBarMain';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export default function PostPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  
  // !!! hardCoding !!! 

  const userInfo = useSelector( store => store.auth.userData , []);
  const {id} = {...userInfo}
  const userId = id

  const fileInfo = useSelector( store => store.file.ImgFileInfo , []);
  const {fileDownloadUri} = {...fileInfo}
  const postImgUrl =  fileDownloadUri 

   // !!! hardCoding !!! 


  const [values, setValues] = useState([]);
  const [states, setState] = useState({ postIsPrivate: false, postIsBlinded: false, });


  const handleSwitcheChange = (event) => {
    setState({ ...states, [event.target.name]: event.target.checked });
  };


  const handleFormChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }


  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    const body = {...values, ...states , postImgUrl , userId }
    console.log(body)

    dispatch(CreatePost(body))
    setValues();
  }


  return (
      <Container component="main" maxWidth="sm" >
        <AppBar />
        <CssBaseline />
        <div className={classes.paper}>
        <UploadTab/>
          <form className={classes.form} noValidate>
            <TextField 
              variant="outlined" 
              margin="normal"
              id="postTitle" 
              name="postTitle" 
              label="제목" 
              fullWidth
              onChange = {handleFormChange} />
            <TextField
              variant="outlined" 
              margin="normal"
              id="postText"
              name="postText" 
              label="여기에 글을 입력해주세요"
              multiline
              rows={4}
              rowsMax={8}
              fullWidth
              onChange={handleFormChange}
            />
            <Button variant="contained" color="primary" type="submit" onClick = {onSubmitHandler}>
              글쓰기
            </Button>

             
            비밀글
            <Switch
            checked={states.postIsPrivate}
            onChange={handleSwitcheChange}
            name="postIsPrivate"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            />

            차단글
            <Switch
              checked={states.postIsBlinded}
              onChange={handleSwitcheChange}
              name="postIsBlinded"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />

          </form>
        </div>
      </Container>
  );
}