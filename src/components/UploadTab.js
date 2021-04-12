import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ImageIcon from '@material-ui/icons/Image';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Container from '@material-ui/core/Container';
import Fab from "@material-ui/core/Fab";
import TextField from '@material-ui/core/TextField';
import { image } from '../_actions/index'
  

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    background: '#ff7961', 
    color: '#ffffff' 
  },
  button: {
    margin: 10
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const [postImg, setpostImg] = useState(null);
  const [postImgName, setpostImgName] = useState("");  // ??

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = (event) => {
    setpostImg(event.target.files[0]);
    setpostImgName(event.target.value);

    const body = new FormData();
    body.append("img", postImg);

    dispatch(image(body))   
      .then(res => {
        console.log(res)
        //setUrl(response.payload.url);
      })

  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Add Comment" icon={<AddCommentIcon />} {...a11yProps(0)} />
          <Tab label="Add Image" icon={<ImageIcon />} {...a11yProps(1)} />
          <Tab label="Add video" icon={<PlayCircleFilledIcon />} {...a11yProps(2)} />
          <Tab label="Item Four" icon={<AddCommentIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container className={classes.main}>
            <Fab component="span" className={classes.button}>
                <AddCommentIcon />
            </Fab>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container className={classes.main}>
          <TextField variant="outlined" type="file" id="file" name="file" file={postImg} value={postImgName} onChange={handleFileChange} />
            이미지를 추가해주세요
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container className={classes.main}>
            <Fab component="span" className={classes.button}>
                <PlayCircleFilledIcon />
            </Fab>
            필요한 URL를 입력해주세요
        </Container>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Container className={classes.main}>
            <Fab component="span" className={classes.button}>
                <AddCommentIcon />
            </Fab>
        </Container>
      </TabPanel>
    </div>
  );
}