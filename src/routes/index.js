import routes from 'src/modules/dashboard-360/routes';
import React from 'react';
import telephonyRoutes from '../modules/telephony/routes';

import authRoutes from '../modules/auth/routes';

import agentRoutes from '../modules/agentForm/routes';
export const dash360 = React.lazy(() =>
  import('src/modules/dashboard-360/views')
);

export const telephony = React.lazy(() =>
  import('src/modules/telephony/views/index')
);

export const agentform = React.lazy(() =>
  import('src/modules/agentForm/views/index')
);
export const auth = React.lazy(() => import('src/modules/auth/views/index'));

export default [
  {
    path: '/dash360',
    routes,
    key: 'dash360',
    component: dash360,
    crumb: 'Dashboard 360',
    requiresAuth: true
  },
 
  {
    path: '/telephony',
    routes: telephonyRoutes,
    key: 'telephony',
    component: telephony,
    crumb: 'Telephony',
    requiresAuth: true
  },
  {
    path: '/agent',
    routes: agentRoutes,
    key: 'dashboardagent',
    component:agentform,
    requiresAuth: true
  },
  {
    path: '/auth',
    routes: authRoutes,
    key: 'auth',
    component: auth,
    requiresAuth: false
  }
  
];
