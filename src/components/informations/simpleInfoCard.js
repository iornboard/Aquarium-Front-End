import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    width: '40vh',
    height: '20vh',
    color: '#fff',
    backgroundColor: green[500],
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    width: '5vh',
    height: '5vh',
  },
});

export default function SimpleInfoCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <FolderIcon className={classes.icon}/>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="title">
                  InfoTitle
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  semiInfo
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">mainInfo</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
} 