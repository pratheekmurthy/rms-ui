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
        path: '/orders/:orderId',
        exact: true,
        key: 'order',
        component: Orders
    }
];
