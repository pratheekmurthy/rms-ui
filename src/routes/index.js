import routes from 'src/modules/dashboard-360/routes';
import surveyRoutes from 'src/modules/surveys/routes';
import campaignRoutes from 'src/modules/campaign/routes';
import React from 'react';
import telephonyRoutes from '../modules/telephony/routes';
import ticketingRoutes from '../modules/ticketing/routes';

export const dash360 = React.lazy(() =>
  import('src/modules/dashboard-360/views')
);
export const surveys = React.lazy(() => import('src/modules/surveys'));
export const telephony = React.lazy(() =>
  import('src/modules/telephony/views/index')
);
export const ticketing = React.lazy(() =>
  import('src/modules/ticketing/views')
);
export const campaign = React.lazy(() => import('src/modules/campaign'));

export default [
  {
    path: '/dash360',
    routes,
    key: 'dash360',
    component: dash360,
    crumb: 'Dashboard 360'
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
    component: telephony,
    crumb: 'Telephony'
  },
  {
    path: '/ticketing',
    routes: ticketingRoutes,
    key: 'ticketing',
    component: ticketing,
    crumb: 'Ticketing'
  },
  {
    path: '/campaign',
    routes: campaignRoutes,
    key: 'campign',
    component: campaign,
    crumb: 'Campaign'
  }
];
