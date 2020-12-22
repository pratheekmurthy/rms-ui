import ticketDashboard from '../views/ticket-dashboard';
import createTicket from '../views/create-ticket';
import ticketReport from '../views/ticket-report';

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
    path: '/ticket-report',
    key: 'ticketReport',
    component: ticketReport,
    crumb: 'Ticket Report'
  }
];
