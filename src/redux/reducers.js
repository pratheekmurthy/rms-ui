import { combineReducers } from 'redux';
import {
    SET_LOGGED_IN, SET_ACCOUNT_TYPE, SET_LOGIN_ACTION, SET_USER_DATA, SET_PRODUCT_DATA,
    SET_USER_ORDERS, SET_DELIVERY_PRICES, SET_CATEGORIES, SET_CATEGORIES_NAMES_MAP
} from './constants';

const logInInitialState = false;
const accountTypeInitialState = '';

const logInState = (state = logInInitialState, action) => {
    switch (action.type) {
        case SET_LOGGED_IN: {
            return action.payload;
        }
        default: return state;
    }
};

const accountType = (state = accountTypeInitialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT_TYPE: {
            return action.payload;
        }
        default: return state;
    }
};

const afterLogInAction = (state = null, action) => {
    switch (action.type) {
        case SET_LOGIN_ACTION: {
            return {
                actionType: action.actionType,
                payload: action.payload
            };
        }
        default: return state;
    }
};

const userData = (state = null, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return action.payload;
        }
        default: return state;
    }
};

const productData = (state = null, action) => {
    switch (action.type) {
        case SET_PRODUCT_DATA: {
            return action.payload;
        }
        default: return state;
    }
};

const userProductsSet = (state = null, action) => {
    switch (action.type) {
        case SET_USER_ORDERS: {
            return action.payload;
        }
        default: return state;
    }
};

const deliveryPrices = (state = null, action) => {
    switch (action.type) {
        case SET_DELIVERY_PRICES: {
            return action.payload;
        }
        default: return state;
    }
};

const categories = (state = null, action) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            return action.payload;
        }
        default: return state;
    }
};

const categoriesNamesMap = (state = new Map(), action) => {
    switch (action.type) {
        case SET_CATEGORIES_NAMES_MAP: {
            return action.payload;
        }
        default: return state;
    }
};

export default combineReducers({
    logInState,
    accountType,
    afterLogInAction,
    userData,
    productData,
    userProductsSet,
    deliveryPrices,
    categories,
    categoriesNamesMap
});
