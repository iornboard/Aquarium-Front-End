import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import WorkCard from '../../components/works/WorkCard';
import InfoBarChart from '../../components/informations/InfoBarChart';
import InfoRadarChart from '../../components/informations/InfoRadarChart';

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
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  charts: {
    minHeight: '100vh',
  }
}));

 function UserMain({match}) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  console.log(match.params.username);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={3}>

            <Avatar src="https://cdn.mkhealth.co.kr/news/photo/202010/50970_51164_4758.jpg" style={{ height: '300px', width: '300px' }}/>
              

            

          {match.params.username}
          </Grid>

          <Grid item xs={9}>

          <WorkCard/>
          <Paper className={fixedHeightPaper}>
            <InfoBarChart className={classes.charts}/>
          </Paper>
          <Paper className={fixedHeightPaper}>
          <InfoRadarChart className={classes.charts}/>
          </Paper>

          {match.params.username}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}



export default withRouter(UserMain)