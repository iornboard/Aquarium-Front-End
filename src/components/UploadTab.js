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
import { image } from '../_actions/index'
import { useDropzone } from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
  dropzoneContainer: {
    height: 300,
    background: "#efefef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: "#aaa",
  },
  preview: {
    width: 200,
    height: 300,
    margin: "auto",
    display: "block",
    marginBottom: theme.spacing(2),
    objectFit: "contain",
  }
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const dispatch = useDispatch();


  const [value, setValue] = useState(0);
  const [postImg, setpostImg] = useState();
  const [preview, setPreview] = useState(); 
  const [postImgUrl, setPostImgUrl] = useState(""); 


  const onDrop = React.useCallback((acceptedFile) => {

    setpostImg(acceptedFile[0])
    const previewUrl = URL.createObjectURL(acceptedFile[0])
    setPreview(previewUrl);

    upload(acceptedFile[0])  // !!! useState 에서 가져오지 못했음 추후에 꼭 수정할것 !!!
 
  },[])


  const upload = async (file) => {

    const body = await new FormData();
    await body.append("img", file)

    dispatch(image(body))   
      .then(res => {
        console.log(res.payload)

        setPostImgUrl(res.payload.fileDownloadUri)
    })
  }

  const {getRootProps, getInputProps} = useDropzone({ multiple: false, onDrop,})
  const { ref, ...rootProps } = getRootProps();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Grid container className={classes.main}>

            <Grid item xs= {6} style={{padding:16}}>
              <Typography align= "center" variant="subtitle">
                drop here
              </Typography>
              <RootRef rootRef = {ref}>
              <Paper {...rootProps} elevation={0}  className={classes.dropzoneContainer} >
                <input {...getInputProps()}/>
                <p> here's file </p>
              </Paper>
              </RootRef>
            </Grid>

            <Grid item xs= {6} style={{padding:16}}>
              <Typography align= "center" variant="subtitle">
                Preview
              </Typography>
              <img
                  onLoad= {() => URL.revokeObjectURL(preview) }  // 이미지 업로드와 동시에, 메모리에서 URL 해재
                  className={classes.preview}
                  src = {preview}
                />
            </Grid>
          </Grid>
        
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