import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { image } from '../../_actions/index'
import { useDropzone } from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card'
import Fade from '@material-ui/core/Fade';


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
  dropzoneContainer: {
    display: 'flex',
    width: '100%',
    height: 90,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // borderStyle: "dashed",
    // borderColor: "#aaa",
  },
  preview: {
    width: '40%',
    height: "85%",
    margin: '2%',
    // borderStyle: "dashed",
    // borderColor: "#aaa",
  }
}));

export default function Uploader({className}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(); 


  const [postImg, setpostImg] = useState();
  const [postImgUrl, setPostImgUrl] = useState(""); 
  const [checked, setChecked] = React.useState(false);

  const onDrop = React.useCallback((acceptedFile) => {

    console.log("드롭 실행")

    setpostImg(acceptedFile[0])
    const previewUrl = URL.createObjectURL(acceptedFile[0])
    setPreview(previewUrl);
    setChecked((prev) => !prev);

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

  return (
    <Box width={'100%'} className={className}>

      <RootRef rootRef = {ref}>
        <Card {...rootProps} className={classes.dropzoneContainer} >
          <input {...getInputProps()}/>

        <Fade in={checked}>
          <CardMedia
            onLoad= {() => URL.revokeObjectURL(preview) }
            className={classes.preview}
            image={preview}
          />
        </Fade>
        </Card>
      </RootRef>
    </Box >

  );
}