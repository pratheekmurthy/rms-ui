import ticketDashboard from '../views/ticket-dashboard';
import createTicket from '../views/create-ticket';
import ticketSetup from '../views/ticketsetup';
import ticketChart from '../views/Ticket-charts';
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
  },
  {
    path: '/charts',
    key: 'ticketChart',
    component: ticketChart
  }
];
