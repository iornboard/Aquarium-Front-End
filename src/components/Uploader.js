import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { image } from '../_actions/index'
import { useDropzone } from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

  const [preview, setPreview] = useState(); 


  const onDrop = React.useCallback((acceptedFile) => {

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
    })
  }

  const {getRootProps, getInputProps} = useDropzone({ multiple: false, onDrop,})
  const { ref, ...rootProps } = getRootProps();

  return (
    <div className={classes.root}>

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

    </div>
  );
}