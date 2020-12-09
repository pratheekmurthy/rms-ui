import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router';
import RouteSwitch from 'src/components/RouteSwitch';
import TopBar from '../DashboardLayout/TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const MainLayout = ({ routes }) => {
  const classes = useStyles();

  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <RouteSwitch routes={routes} redirectPath={isAdmin ? '/admin/dashboard' : ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
