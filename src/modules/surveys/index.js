import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';
import getSurveyModule from './redux/module';

export default function View({ routes }) {
  return (
    <DynamicModuleLoader modules={[getSurveyModule()]}>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} redirectPath="/surveys/home" />
    </DynamicModuleLoader>
  );
}
