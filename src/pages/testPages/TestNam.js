//  커뮤니티 메인 페이지
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

const sampleTerms = {
  termId:1,
  termName: '샘플 약관',
  termDescription: '샘플 약관입니다.',
  termOwnerInfo: {userId: 1, userName: '남현수'},
  termAgreeUsersId: [1,2,5,3,6],
  createAt: '2021-11-14 19:22:34',
  termRequired: true,
  semiTerms: [ 
    {
      semiTermId: 1,
      TermId: 1,
      semiTermAgreeUsersId: [1,2,5,3,6],
      semiTermsName: '프로젝트 보안의 관한 조항',
      semiTermText: '프로젝트를 진행하면서 다음과 같은 조항을 명사한다. 1.~ 하지 않는다. 2. ~하지 않는다. 3.~한다.',
      termsRequired: true
    },
    {
      semiTermId: 1,
      TermId: 1,
      semiTermAgreeUsersId: [1,2,5,3,6],
      semiTermsName: '프로젝트 보안의 관한 조항',
      semiTermText: '프로젝트를 진행하면서 다음과 같은 조항을 명사한다. 1.~ 하지 않는다. 2. ~하지 않는다. 3.~한다.',
      termsRequired: true
    },
    {
      semiTermId: 1,
      TermId: 1,
      semiTermAgreeUsersId: [1,2,5,3,6],
      semiTermsName: '프로젝트 보안의 관한 조항',
      semiTermText: '프로젝트를 진행하면서 다음과 같은 조항을 명사한다. 1.~ 하지 않는다. 2. ~하지 않는다. 3.~한다.',
      termsRequired: true
    }
  ] 
}



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh',
  },
  placeRoot: {
    height: "90vh",
    justifyContent: "center",
    overflow: 'hidden',
    width: '100%',
  },
  rootList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 300,
  },
  place: {
    height: "100%",
    padding: '10px',
  },
  waveform: {
    display: "flex",
    position: "absolute",
    zIndex: "-2",
    width: "100%",
    height: "100%",
    bottom: 0,
  }, 
  termsViewerForm: {
    backgroundColor: theme.palette.primary.light,
    weight: "100%",
     height: "90%",
     borderRadius: '10px'
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px",
    marginBottom: "2%"
  },
}));


 function MainPage({history}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Box height="10vh"/>

      <Box className={classes.waveform}>
        
      </Box>

      <Grid container spacing={3} className={classes.placeRoot}>

        <Grid item xs={false} sm={3} className={classes.place}>
          <Box width="auto" height="5%" color='white' textAlign="right" className={classes.header}>
          </Box>
          <List className={classes.rootList}>
    
          </List>
        </Grid>
        <Grid item xs={12} sm={7} className={classes.placeList}>
          <Box width="auto" height="5%" color='white' textAlign="right" className={classes.header}> 
          </Box>
          <Box className={classes.termsViewerForm}>

          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(MainPage)