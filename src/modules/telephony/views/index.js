import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import getTelephonyModule from '../redux/module';

export default function index({ routes }) {
  return (
    <DynamicModuleLoader modules={[getTelephonyModule()]}>
      <RouteSwitch routes={routes} />
    </DynamicModuleLoader>
  );
}
