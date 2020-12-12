import { Box, Breadcrumbs, Grid, Link } from '@material-ui/core';
import React from 'react';
import RouteSwitch from 'src/components/RouteSwitch';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';

export default function View({ routes }) {
  return (
    <>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} redirectPath="/surveys/home" />
    </>
  );
}
