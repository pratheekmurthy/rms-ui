import {
    SET_LOGGED_IN, SET_ACCOUNT_TYPE
} from './constants';

const logInInitialState = false;
const accountTypeInitialState = '';

export const logInState = (state = logInInitialState, action) => {
    switch (action.type) {
        case SET_LOGGED_IN: {
            return action.payload;
        }
        default: return state;
    }
};

export const accountType = (state = accountTypeInitialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT_TYPE: {
            return action.payload;
        }
        default: return state;
    }
};
