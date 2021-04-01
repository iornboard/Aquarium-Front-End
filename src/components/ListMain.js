import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';
import Card from './Card'


const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  gridList: {
    height: 800,
  },
  grid: {
    width: '100%',
  },
  fabButton: {
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
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
    return post
  }
  
  console.log(posts)


  //---------------------------- summit 부분 --------------------------------------

  return (

    <div >
      <Container alignItems='baseline' className={classes.grid}>
        <GridList cellHeight={60} className={classes.gridList} cols={3} onScroll={handleScroll}>
            {posts ? posts.map((pos) => <Card text = {pos.postText}/> ) : "로딩중.."  }
        </GridList>
      </Container>

    </div>

  );
}

export default ScrollList;