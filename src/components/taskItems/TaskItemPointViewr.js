// task 컴포넌트에서 마커 포인트를의 리스트를 보여주는 컴포넌트 

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
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
    <List className={classes.root} subheader={<li />}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
          <ul className={classes.ul}>
  
              <ListItem >
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
   
          </ul>
      ))}
    </List>
  );
}