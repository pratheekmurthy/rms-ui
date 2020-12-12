import ticketDashboard from '../views/ticket-dashboard';
import createTicket from '../views/create-ticket';

export default [
  {
    path: '/ticket-dashboard',
    key: 'ticketDashboard',
    component: ticketDashboard
  },
  {
    path: '/create-ticket',
    key: 'createTicket',
    component: createTicket
  },
];
