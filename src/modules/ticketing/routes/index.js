import ticketDashboard from '../views/ticket-dashboard';
import createTicket from '../views/create-ticket';
import ticketSetup from '../views/ticketsetup';
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
  {
    path: '/setup',
    key: 'ticketSetup',
    component: ticketSetup
  }
];
