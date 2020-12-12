import routes from 'src/modules/dashboard-360/routes';
import surveyRoutes from 'src/modules/surveys/routes';
import React from 'react';
import telephonyRoutes from '../modules/telephony/routes';

export const dash360 = React.lazy(() =>
  import('src/modules/dashboard-360/views')
);
export const surveys = React.lazy(() => import('src/modules/surveys'));
export const telephony = React.lazy(() =>
  import('src/modules/telephony/views')
);

export default [
  {
    path: '/dash360',
    routes,
    key: 'dash360',
    component: dash360,
    crumb: ['Dashboard 360']
  },
  {
    path: '/surveys',
    routes: surveyRoutes,
    key: 'surveys',
    component: surveys,
    crumb: 'Surveys'
  },
  {
    path: '/telephony',
    routes: telephonyRoutes,
    key: 'telephony',
    component: telephony
  }
];
