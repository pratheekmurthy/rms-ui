import Charts from '../views/charts';
import Dashboard from '../views/dashboard';
import DeliveryChannels from '../views/delivery-channels';

export default [
  {
    path: '/charts',
    exact: true,
    key: 'charts',
    component: Charts,
    crumb: 'Charts'
  },
  {
    path: '/dashboard',
    exact: true,
    key: 'dashboard',
    component: Dashboard,
    crumb: 'Dashboard'
  },
  {
    path: '/delivery-channels',
    exact: true,
    key: 'deliveryChannels',
    component: DeliveryChannels,
    crumb: 'Delivery Channels'
  }
];
