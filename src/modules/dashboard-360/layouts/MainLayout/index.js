import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router';
import RouteSwitch from 'src/components/RouteSwitch';
import TopBar from 'src/components/TopBar';
import NavBar from '../DashboardLayout/NavBar';

const MainLayout = ({ routes }) => {

  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Moved to App.js */}
      {/* <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      /> */}
      <RouteSwitch
        routes={routes}
        redirectPath={isAdmin ? '/admin/dashboard' : ''}
      />
      </>
  );
};

export default MainLayout;
