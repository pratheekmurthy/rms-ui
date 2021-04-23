import { SET_USER_DATA } from 'src/modules/dashboard-360/redux/constants';
import {
  SET_LOGGED_IN,
  SET_ACCOUNT_TYPE,
  SET_ACTIVATED_ROUTE,
  SET_NEW_CRUMB,
  SET_URL_MATCH_FOUND,
  SET_AGENT_CURRENT_STATUS,
  SET_SEARCH_DISTRIBUTOR,
  Add_Data
} from './constants';

const logInInitialState = false;
const accountTypeInitialState = '';
const agentInitialState = {
  "AgentType": "",
  "role": "",
  "callUniqueId": "",
  "distributer_id": "",
  "callStatusId": "",
  "callDispositionStatus": "",
  "callType": "",
  "callEvent": "",
  "callerNumber": "",
  "callStatus": "",
  "AgentSIPID": ""
}
const initialselectedData = {}

export const selectedData = (state = initialselectedData, action) => {
  switch (action.type) {
    case Add_Data: {
      console.log("i am in reddd")
      return action.payload;
    }
    default:
      return state;
  }
}

export const logInState = (state = logInInitialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const userData = (state = null, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const agentCurrentStatus = (state = agentInitialState, action) => {
  switch (action.type) {
    case SET_AGENT_CURRENT_STATUS: {
      return action.payload
    }
    default:
      return state
  }
}

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
export const searchDistributor = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_DISTRIBUTOR: {
      return action.payload;
    }
    default:
      return state;
  }
};

const allusersInitialState = []
export const allusers = (state = allusersInitialState, action) => {
  switch (action.type) {
    case 'SET_ALL_USERS': {
      return action.payload;
    }
    default:
      return state;
  }
};

let profilesInitilaState = []

export const profilesReducers = (state = profilesInitilaState, action) => {
  switch (action.type) {
    case 'SET_PROFILES': {
      return action.payload;
    }
    default:
      return state
  }
}