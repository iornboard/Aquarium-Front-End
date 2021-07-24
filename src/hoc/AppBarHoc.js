import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import logo from './logo.png';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  loginButton: {
    marginLeft : theme.spacing(2),
  },
}));

export default function (SpecificComponent) {
// 0621
  const classes = useStyles();
// 0621
    function AppBarDrawerLeft() {
      const classes = useStyles();
      const theme = useTheme();

      const userInfo = useSelector( store => store.auth.userData , []);
      const {userId, userEmail, userFullname, userNickname, userImgUrl} = {...userInfo}

      const [open, setOpen] = React.useState(true);
      const [anchorEl, setAnchorEl] = React.useState(null);
      const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

      const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };

      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };

      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

      const handleDrawerOpen = () => {
        setOpen(true);
      };

      const handleDrawerClose = () => {
        setOpen(false);
      };

// 로그아웃
        const userLogout = () => {
          localStorage.removeItem('jwt');
          setOpen(false);
        };

      const menuId = 'primary-search-account-menu';
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          
          <Link color="inherit" href="/UserInfo">
            <MenuItem onClick={handleMenuClose}>Mypage</MenuItem>
          </Link>

            <MenuItem onClick={handleMenuClose}>활동내역</MenuItem>

          <Link color="inherit" href="/post">
            <MenuItem onClick={handleMenuClose}>글쓰기</MenuItem>
          </Link>

            <MenuItem onClick={userLogout}>
            <Link color="inherit" href="/">
              로그아웃
              </Link>
              </MenuItem>
        </Menu>
      );

      const mobileMenuId = 'primary-search-account-menu-mobile';
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              {/* <AccountCircle/> */}
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
      );

      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                color="inherit"
                aria-label="open drawer"
                onClick = {handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            
              <Link color="inherit" href="/">
              <img src={logo} width = "60" height="60" alignItems = "center" />
              </Link>
              
              <Typography className={classes.title} variant="h6" noWrap>
                Aquarium
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                { userInfo ? 
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar src = {userImgUrl} />
                  </IconButton> :     
                    <Button variant="contained" color="secondary" size="small" href="/signin" className={classes.loginButton}>
                      Login
                    </Button>
                  }
                
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            {/* 0621 */}
            <List>
            <Link href="/">
              {['커뮤니티'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon><AssignmentRoundedIcon/></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              </Link>
                 {/* 0621 */}
              <Link href="post">
                {['글쓰기'].map((text1, index1) => (
                <ListItem button key={text1}>
                  <ListItemIcon><CreateRoundedIcon/></ListItemIcon>
                  <ListItemText primary={text1} />
                </ListItem>
              ))}
              </Link>
                {['인기글'].map((text2, index2) => (
                  <ListItem button key={text2}>
                    <ListItemIcon><ThumbUpRoundedIcon/></ListItemIcon>
                    <ListItemText primary={text2} />
                  </ListItem>
                ))}
            </List>
            
            
            <Divider />
            <List> 

            <Link href="collabomain">
                {['프로젝트 관리'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon><WorkRoundedIcon/></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              </Link>

              <Link href="collabomain">
                {['프로젝트 일정'].map((text1, index1) => (
                <ListItem button key={text1}>
                  <ListItemIcon><EventAvailableRoundedIcon/></ListItemIcon>
                  <ListItemText primary={text1} />
                </ListItem>
              ))}
              </Link>

              
              <Link href="collabocreate">
                {['프로젝트 생성'].map((text2, index2) => (
                <ListItem button key={text2}>
                  <ListItemIcon><AddCircleRoundedIcon/></ListItemIcon>
                  <ListItemText primary={text2} />
                </ListItem>
              ))}
              </Link>
            </List>
            
             

            <Divider/>
            <List>
              {/* {['아쿠아리움이란', '만든이' ].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))} */}

              <Link href="">
                {['아쿠아리움이란'].map((text1, index1) => (
                <ListItem button key={text1}>
                  <ListItemIcon><HelpRoundedIcon/></ListItemIcon>
                  <ListItemText primary={text1} />
                </ListItem>
              ))}
              </Link>

              <Link href="">
                {['만든이'].map((text2, index2) => (
                <ListItem button key={text2}>
                  <ListItemIcon><FaceRoundedIcon/></ListItemIcon>
                  <ListItemText primary={text2} />
                </ListItem>
              ))}
              </Link>

            </List>
           
          </Drawer>

          HelpRoundedIcon
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <SpecificComponent />
          </main>
          {renderMenu}
        </div>


      );
    }
    
    return AppBarDrawerLeft
    }