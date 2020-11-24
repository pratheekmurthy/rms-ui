import {
    SET_LOGGED_IN, SET_ACCOUNT_TYPE, SET_LOGIN_ACTION, SET_USER_DATA,
    SET_PRODUCT_DATA, SET_USER_ORDERS, SET_DELIVERY_PRICES, SET_CATEGORIES, SET_CATEGORIES_NAMES_MAP
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
export const setActionAfterLogIn = (actionType, courseId) => {
    return {
        type: SET_LOGIN_ACTION,
        actionType,
        payload: courseId
    };
};

export const setUserData = (data) => {
    return {
        type: SET_USER_DATA,
        payload: data
    };
};

export const setProductsData = (data) => {
    return {
        type: SET_PRODUCT_DATA,
        payload: data
    };
};

export const setUserOrders = (orderIsSet) => {
    return {
        type: SET_USER_ORDERS,
        payload: orderIsSet
    };
};

export const setDeliveryPrices = (deliveryDetails) => {
    return {
        type: SET_DELIVERY_PRICES,
        payload: deliveryDetails
    };
};
export const setCategories = (categories) => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    };
};
export const setCategoriesNames = (categoriesMap) => {
    return {
        type: SET_CATEGORIES_NAMES_MAP,
        payload: categoriesMap
    };
};
