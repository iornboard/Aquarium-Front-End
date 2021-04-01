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
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
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
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="postText" name="postText" label="Standard" onChange = {handleChange} />
          <Button variant="contained" color="primary" type="submit" onClick = {onSubmitHandler}>
            글쓰기
          </Button>
        </form>
      </Container>
    </div>
  );
}