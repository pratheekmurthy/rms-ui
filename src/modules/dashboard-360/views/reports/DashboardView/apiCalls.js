import Axios from 'axios';
import {
    GET_DEALER_INVOICES, GET_DEALER_JOINING_DETAILS,
    GET_DEALER_KYC, GET_DEALER_ORDERS, GET_DEALER_PROFILE
} from 'src/modules/dashboard-360/utils/endpoints';

export const getDealerDetails = Axios.get(GET_DEALER_PROFILE, {
    params: {
        distributorID: 1001
    }
});

export const getDealerJoiningDetails = Axios.get(GET_DEALER_JOINING_DETAILS, {
    params: {
        distributorID: 1001
    }
});

export const getDealerOrderDetails = Axios.get(GET_DEALER_ORDERS, {
    params: {
        distributorID: 1001
    }
});

export const getDealerInvoiceDetails = Axios.get(GET_DEALER_INVOICES, {
    params: {
        distributorID: 1001
    }
});

export const getDealerKYCDetails = Axios.get(GET_DEALER_KYC, {
    params: {
        distributorID: 1001
    }
});
