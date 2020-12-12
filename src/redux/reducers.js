import {
  SET_LOGGED_IN,
  SET_ACCOUNT_TYPE,
  SET_ACTIVATED_ROUTE,
  SET_NEW_CRUMB,
  SET_URL_MATCH_FOUND
} from './constants';

const logInInitialState = false;
const accountTypeInitialState = '';

export const logInState = (state = logInInitialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const accountType = (state = accountTypeInitialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_TYPE: {
      return action.payload;
    }
    default:
      return state;
  }
};
export const activatedRoute = (state = '', action) => {
  switch (action.type) {
    case SET_ACTIVATED_ROUTE: {
      console.log('activating', action);
      return action.payload;
    }
    default:
      return state;
  }
};
export const crumbs = (state = new Map(), action) => {
  switch (action.type) {
    case SET_NEW_CRUMB: {
      // Not changing reference to prevent rerendering purposefully
      state.set(action.key, action.value);
      return state;
    }
    default:
      return state;
  }
};
export const urlMatchFound = (state = false, action) => {
  switch (action.type) {
    case SET_URL_MATCH_FOUND: {
      return action.payload;
    }
    default:
      return state;
  }
};
