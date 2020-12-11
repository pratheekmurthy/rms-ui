import invoices from '../views/admin/invoices';
import Orders from '../views/admin/orders';
import Dashboard from '../views/reports/DashboardView/index';

export default [
  {
    path: '/dashboard',
    exact: false,
    key: 'dashboard',
    component: Dashboard
  },
  {
    path: '/orders',
    exact: true,
    key: 'order',
    component: Orders,
    crumb: 'Orders'
  },
  {
    path: '/orders/:orderId',
    exact: true,
    key: 'orderWithId',
    component: Orders
  },
  {
    path: '/invoices',
    exact: true,
    key: 'invoices',
    component: invoices,
    crumb: 'Invoices'
  },
  {
    path: '/invoices/:orderId',
    exact: true,
    key: 'invoicesWithId',
    component: invoices
  }
];
