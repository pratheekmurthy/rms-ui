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
        if (localStorage.getItem('jwtToken')) {
          console.log('inside the jwt')
          
          var obj = {
            UserID: 4,
            AllowPublic: 0,
            UserName: 'chaitra@grassrootsbpo.in',
            EmployeeName: 'Chaitra (GRSSL)',
            EmailID: 'c77e0350859f6255b2739876d6641a24247ece422294b75e99983defa2b70c44',
            OTP: 262732,
            tenetID: '1',
            tenentId: 1,
            tenentName: 'Grassroots',
            roleids: '7',
            role: 'Agent',
            modules: 'Dashboard 360'
          }
          setUserDetailsMain(obj)
          setAccountTypeMain(obj.role === 'Agent' ? ADMIN : USER);
          setLoggedInMain(true);


         var test = await Axios.post('localhost:4000/auth/apiM/verifyClient',{},{ headers: { Authorization:localStorage.getItem('jwtToken') } })
          .then(response=> console.log(response))
          .catch(error => console.log(error));
 


          // var axios = require('axios');

          // var config = {
          //   method: 'post',
          //   url: 'localhost:4000/auth/apiM/verifyClient',
          //   headers: {
          //     'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
          //   }
          // };

          // axios(config)
          //   .then(function (response) {
          //     console.log(JSON.stringify(response.data));
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });

        } else {
          setLoggedInMain(false);
        }
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
