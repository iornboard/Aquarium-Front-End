// task 컴포넌트에서 마커 포인트를의 리스트를 보여주는 컴포넌트 

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '27vh',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function PinnedSubheaderList() {
  const classes = useStyles();

  return (
      <div>
         <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              CheckPoint
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <List subheader={<li />}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                <ul className={classes.ul}>
        
                    <ListItem >
                      <ListItemText primary={`Item ${item}`} />
                    </ListItem>
        
                </ul>
            ))}
          </List>
        </div>
      </div>
  );
}