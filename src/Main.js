import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MainLoader from './components/MainLoader';
import RouteSwitch from './components/RouteSwitch';
import TopBar from './components/TopBar';
import NavBar from './modules/dashboard-360/layouts/DashboardLayout/NavBar';
import { setAccountType, setLoggedIn, setUserDetails } from './redux/action';
import { ADMIN, USER } from './redux/constants';
import routes from './routes';

function Main({
  isLoggedIn,
  classes,
  setUserDetailsMain,
  setAccountTypeMain,
  setLoggedInMain
}) {
  const [loading, setLoading] = useState(true);
  const [filteredRoutes, setfilteredRoutes] = useState(
    routes.filter(route => route.requiresAuth === false)
  );

  const [localLoggedInState, setLocalLoggedIn] = useState(false);

  useEffect(() => {
    (async function checkLoggedInState() {
      try {
        localStorage.clear();
        const res = await Axios.post('/auth/user/login', {});
        const obj = res.data.userObj;
        setUserDetailsMain(obj);
        setAccountTypeMain(obj.role === 'admin' ? ADMIN : USER);
        setLoggedInMain(true);
      } catch (error) {
        setLoggedInMain(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setfilteredRoutes(
      routes.filter(route => route.requiresAuth === isLoggedIn)
    );
    setLocalLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
  return loading ? (
    <MainLoader />
  ) : localLoggedInState ? (
    <>
      <TopBar />
      <NavBar openMobile={false} onMobileClose={() => null} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <RouteSwitch
              routes={filteredRoutes}
              isRoot
              redirectPath="/dash360"
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <RouteSwitch routes={filteredRoutes} isRoot redirectPath="/auth/login" />
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.logInState
});
const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: type => dispatch(setAccountType(type)),
  setLoggedInMain: val => dispatch(setLoggedIn(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
