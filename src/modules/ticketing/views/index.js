import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import RouteSwitch from 'src/components/RouteSwitch';
import getTicketingModule from '../redux/module';

export default function index({ routes }) {
  return (
    <DynamicModuleLoader modules={[getTicketingModule()]}>
      <CustomBreadcrumbs />
      {/* Ticketing Component */}
      <RouteSwitch routes={routes} redirectPath="/ticketing/ticket-dashboard" />
    </DynamicModuleLoader>
  );
}
