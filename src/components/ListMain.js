import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';
import CardForm from './Card'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  gridList: {
    height: 800,
    width: '95%',
  },
  fabButton: {
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  mediaCard:{
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));


function ScrollList() {

  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  //------------------------------무한 스크롤------------------------------------- 

  useEffect(() => {
    callApiPost().then(res =>  setPosts(res));
  }, 1);


  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      callApiPost().then(res => setPosts(res));
    }

  };

  const callApiPost = async () => {
    const response = await fetch('/api/post');
    const post = await response.json();
    console.log(post)
    return post
  }
  
  //---------------------------- summit 부분 --------------------------------------

  return (

      <Container alignItems='baseline' className={classes.grid}>
        
          <GridList cellHeight={60} className={classes.gridList} cols={1} onScroll={handleScroll}>
              {posts ? posts.map((pos) => <CardForm post = {pos} className={classes.mediaCard} style={{padding:10}} /> ) : "로딩중.."  }
          </GridList>
        
      </Container>

  );
}

export default ScrollList;