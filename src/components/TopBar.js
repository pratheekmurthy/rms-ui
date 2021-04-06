import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import config from '../modules/ticketing/views/config.json';
import { Link, Link as RouterLink } from 'react-router-dom';
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
  fade,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'src/modules/dashboard-360/components/Logo';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { setLoggedIn, setSearchDistributor } from 'src/redux/action';
import { connect } from 'react-redux';
import Axios from 'axios';
import {
  UPDATE_CURRENT_STATUS
} from '../modules/dashboard-360/utils/endpoints'
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

// var APIENDPOINT = SOCKETENDPOINT2;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function updateAgentCallStatusV2(callStatusId, data) {
  // console.log("updateData", updateData)
  var axios = require('axios');
  var config = {
    method: 'put',
    url: UPDATE_CURRENT_STATUS + callStatusId,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      console.log('update', JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

const TopBar = ({
  className,
  onMobileNavOpen,
  logout,
  searchDist,
  ...rest
}) => {
  const user_Details = useSelector(state => state.userData)


  const classes = useStyles();
  const [notifications] = useState([]);




  async function logoutUser() {

    try {
      if (localStorage.getItem('Agenttype') === 'L1') {
        // removeFromQueue('Local/5'+localStorage.getItem('AgentSIPID')+'@from-internal', 7001)
        if (user_Details.AgentQueueStatus === 'dynamic') {
          // removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
        }
      }
      if (localStorage.getItem('Agenttype') === 'L2') {
        // removeFromQueue('Local/3'+localStorage.getItem('AgentSIPID')+'@from-internal', 7002)
        if (user_Details.AgentQueueStatus === 'dynamic') {
          // removeFromQueue(`Local/3${localStorage.getItem('AgentSIPID')}@from-queue`, 7002, user_Details);
        }
      }
      updateAgentCallStatusV2(localStorage.getItem('callStatusId'), { loginStatus: 'false' })
      // axios
      // .delete(BackendURL.AuthenticationURL + '/auth/api/logout', { headers: { "authorization": userData } })
      const userData = localStorage.jwtToken

      const url = 'http://106.51.86.75:4000/auth/apiM/logout'
      await Axios.delete(url, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } });

      localStorage.clear();

      logout();
    } catch (err) {
      console.log(err);
    }
  }
  var test = "green"
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest} style={{ background: 'blue' }}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>

        {/* <div className={classes.search}>
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
            onBlur={distributorID}
          />
        </div> */}
        <Box flexGrow={1} />
        <Hidden mdDown>
          {localStorage.getItem("role") === "Agent" ? <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/dash360" className="color-white">
              Agent {localStorage.getItem('Agenttype') + ' ' + localStorage.getItem('AgentSIPID')}
            </Link>
          </Typography> : <></>}
          {localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Group admin" ? <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/dailyreport" className="color-white">
              Daily Report
            </Link>
          </Typography> : <></>}

          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            ><Typography className={classes.title} variant="h5" noWrap>
                <Link to="/cdrreports" className="color-white">
                  CDR Reports
            </Link>
              </Typography>
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
  searchtextdist: state.searchDistributor
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(setLoggedIn(false)),
  searchDist: val => dispatch(setSearchDistributor(val))
});

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  logout: PropTypes.func,
  searchDist: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
