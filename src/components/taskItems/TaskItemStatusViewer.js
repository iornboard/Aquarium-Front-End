import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    maxHeight: '35vh',
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="기간 설정" {...a11yProps(0)} />
        <Tab label="상태 설정" {...a11yProps(1)} />
        <Tab label="인원 설정" {...a11yProps(2)} />
        <Tab label="프로젝트 메모" {...a11yProps(3)} />
        <Tab label="프로젝트 히스토리" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        프로젝트 기간
      </TabPanel>
      <TabPanel value={value} index={1}>
        프로젝트 상태
      </TabPanel>
      <TabPanel value={value} index={2}>
        프로젝트 인원 현황
      </TabPanel>
      <TabPanel value={value} index={3}>
        프로젝트 메모
      </TabPanel>
      <TabPanel value={value} index={4}>
        프로젝트 히스토리
      </TabPanel>
    </div>
  );
}