import React, { useState } from 'react';
import { Link, Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  InputBase,
  fade,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/modules/dashboard-360/components/Logo';
import NestedMenu from './NestedMenu';
import { SearchIcon } from '@material-ui/data-grid';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { setLoggedIn,setSearchDistributor} from 'src/redux/action';
import { connect } from 'react-redux';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    // flexGrow: 1,
    fontWeight: 500,
    marginRight: 15,
    fontSize: '0.96rem',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputRoot: {
    color: 'white'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '30ch'
      }
    }
  }
}));

const TopBar = ({ className, onMobileNavOpen, logout, searchDist, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [searchText, setSearchText] = useState('');
  const updateSearchText = evt => {
    setSearchText(evt.target.value);
    console.log('search', evt.target.value);
    localStorage.setItem('search', evt.target.value);
    // changeValue();
    // alert(evt.target.value);
    // getDistributorById(evt.target.value);
  };
  // const changeValue = () => {
  //   var x = window.open('', 'myWindow', 'width=200,height=100');
  //   x.localStorage.setItem('mytime', Date.now());
  //   x.close();
  // };
  async function logoutUser() {
    try {
      await Axios.get('/auth/user/logout');
      logout();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={updateSearchText}
            value={searchText}
          />
        </div>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {/* <NestedMenu style={{ marginRight: 200 }} /> */}
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/dash360" className="color-white">
              Dashboard
            </Link>
          </Typography>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/telephony/dashboard" className="color-white">
              Telephony
            </Link>
          </Typography>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/ticketing/ticket-dashboard" className="color-white">
              Ticketing
            </Link>
          </Typography>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/surveys/home" className="color-white">
              Surveys
            </Link>
          </Typography>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/campaign/dashboard" className="color-white">
              Campaign
             </Link>
          </Typography>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/ticketing/setup" className="color-white">
              Tkt-Setup
            </Link>
          </Typography>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/ticketing/ticket-report" className="color-white">
              Tkt-Dashboard
            </Link>
          </Typography>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountBoxRoundedIcon />
          </IconButton>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={() => logoutUser()}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = state => ({
  searchDist: state.searchDistributor
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(setLoggedIn(false)),
  searchDist: val => dispatch(setSearchDistributor(val))
});

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  logout: PropTypes.func
};

export default connect(null,mapStateToProps, mapDispatchToProps)(TopBar);
