import Axios from 'axios';
import {
  GET_DEALER_INVOICES,
  GET_DEALER_JOINING_DETAILS,
  GET_DEALER_KYC,
  GET_DEALER_ORDERS,
  GET_DEALER_PROFILE
} from 'src/modules/dashboard-360/utils/endpoints';

export const getDealerDetails = distributorID =>
  Axios.get(GET_DEALER_PROFILE, {
    params: { distributorID }
  });

export const getDealerJoiningDetails = distributorID =>
  Axios.get(GET_DEALER_JOINING_DETAILS, {
    params: { distributorID }
  });

export const getDealerOrderDetails = distributorID =>
  Axios.get(GET_DEALER_ORDERS, {
    params: { distributorID }
  });

export const getSingleOrderDetails = orderID =>
  Axios.get(GET_DEALER_ORDERS, {
    params: { orderID }
  });

export const getDealerInvoiceDetails = distributorID =>
  Axios.get(GET_DEALER_INVOICES, {
    params: { distributorID }
  });

export const getSingleInvoiceDetails = orderID =>
  Axios.get(GET_DEALER_ORDERS, {
    params: { orderID }
  });

export const getDealerKYCDetails = distributorID =>
  Axios.get(GET_DEALER_KYC, {
    params: { distributorID }
  });

export default distributorID => [
  getDealerDetails(distributorID),
  getDealerJoiningDetails(distributorID),
  getDealerOrderDetails(distributorID),
  getDealerInvoiceDetails(distributorID),
  getDealerKYCDetails(distributorID)
];
