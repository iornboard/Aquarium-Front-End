import React, { useState } from "react"
import { useDispatch } from 'react-redux';
import { CreatePost } from '../../_actions/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UploadTab from '../../components/UploadTab'

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

  const [values, setValues] = useState({  postText: "" });

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    dispatch(CreatePost(values)) 
    setValues({  postText: "" });
  }

  return (
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <div className={classes.paper}>
        <UploadTab/>
          <form className={classes.form} noValidate>
            <TextField 
              variant="outlined" 
              margin="normal"
              id="postText" 
              name="postText" 
              label="제목" 
              fullWidth
              onChange = {handleChange} />
            <TextField
              variant="outlined" 
              margin="normal"
              id="standard-multiline-flexible"
              label="여기에 글을 입력해주세요"
              multiline
              rows={4}
              rowsMax={8}
              fullWidth
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" type="submit" onClick = {onSubmitHandler}>
              글쓰기
            </Button>
          </form>
        </div>
      </Container>
  );
}