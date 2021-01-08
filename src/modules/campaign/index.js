import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';

export default function View({ routes }) {
  return (
    <DynamicModuleLoader>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} redirectPath="/surveys/dashboard" />
    </DynamicModuleLoader>
  );
}
