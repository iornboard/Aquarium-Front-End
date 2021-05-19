import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Height } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  testSection1: {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '50vh',
  },
  testSection2 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '30vh',
  },
  testSection3 : {
    marginTop: theme.spacing(1),
    background : '#2ECCFA',
    width : '100%', 
    minHeight: '15vh',
  },
}));

export default function TaskTool() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CssBaseline />

        <Grid container spacing={1}>

            <Grid item xs={8}>

                <Card className={classes.testSection1}/>
                <Card  className={classes.testSection2}/>
  
            </Grid>  

            <Grid item xs={4}>

                <Card className={classes.testSection3}/>
                <Card className={classes.testSection1}/>
                <Card className={classes.testSection3}/>
        
            </Grid>  
            
  
        </Grid>  
        
    </div>
  );
}