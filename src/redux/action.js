import {
    SET_LOGGED_IN, SET_ACCOUNT_TYPE
} from './constants';

export const setLoggedIn = (isLoggedIn) => {
    return {
        type: SET_LOGGED_IN,
        payload: isLoggedIn
    };
};

export const setAccountType = (accType) => {
    return {
        type: SET_ACCOUNT_TYPE,
        payload: accType
    };
};