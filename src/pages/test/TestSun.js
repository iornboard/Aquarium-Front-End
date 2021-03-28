import React, { useState } from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Appbar from '../../components/AppBarMain';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '10vh',
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
  loot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function StickyFooter() {

  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChange1 = (event) => {
    setName(event.target.value)
  }
  const handleChange2 = (event) => {
    setEmail(event.target.value)
  }

  return (

    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
       {name} {email}

      <form className={classes.loot} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" value={name} onChange={handleChange1} />
      <TextField id="standard-basic" label="Standard" value={email} onChange={handleChange2} />
    </form>
      <Container component="main" className={classes.main} maxWidth="sm">
      
        <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography>
        <Button variant="contained" color="primary" disableElevation>
      Disable elevation
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
          
        </Container>
      </footer>
    </div>
  );
}