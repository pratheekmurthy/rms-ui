import {
  logInState,
  accountType,
  activatedRoute,
  crumbs,
  urlMatchFound,
  userData,
  agentCurrentStatus,
  searchDistributor,
  selectedData,
  allusers,
  profilesReducers

} from './reducers';

export default function getWeatherModule() {
  return {
    // Unique id of the module
    id: 'root',
    // Maps the Store key to the reducer
    reducerMap: {
      logInState,
      accountType,
      activatedRoute,
      crumbs,
      urlMatchFound,
      userData,
      agentCurrentStatus,
      searchDistributor,
      selectedData,
      allusers,
      profilesReducers
    }
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
  };
}
