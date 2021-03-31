import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';


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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;


function ScrollList(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  //------------------------------무한 스크롤------------------------------------- 

  useEffect(() => {
 
  }, 1);


  const handleScroll = (event) => {
    // const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    // if (scrollHeight - scrollTop === clientHeight) {
    //   callApiPost().then(res => setPosts(res));
    //   setPostNum(prev => prev + 3);
    // }

  };

  const callApiPost = async () => {
    // const response = await fetch('/api/posts/get');
    // const post = await response.json();
    // return post.filter((c, index) => index < postNum);
  }


  //---------------------------- summit 부분 --------------------------------------

  return (

    <div >
      
      <Container alignItems='baseline' className={classes.grid}>
        <GridList cellHeight={60} className={classes.gridList} cols={3} onScroll={handleScroll}>
          {/* {posts ? posts.map((pos) => <Post key={pos._id} post={pos} user={props.userID} className={classes.margin} />) : loading && <Loading>Loading ...</Loading>} */}
        </GridList>
      </Container>

    </div>

  );
}

export default ScrollList;