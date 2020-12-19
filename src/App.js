import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/modules/dashboard-360/components/GlobalStyles';
import 'src/modules/dashboard-360/mixins/chartjs';
import theme from 'src/modules/dashboard-360/theme';
import { connect, Provider } from 'react-redux';
import rootStore from './redux/store';
import RouteSwitch from './components/RouteSwitch';
import routes from './routes';
import MainLoader from './components/MainLoader';
import TopBar from './components/TopBar';
import NavBar from './modules/dashboard-360/layouts/DashboardLayout/NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <React.Suspense fallback={<MainLoader />}>
            <div className={classes.root}>
              <GlobalStyles />
              <Container classes={classes} />
            </div>
          </React.Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.logInState
});

function ContainerComp({ isLoggedIn, classes }) {
  const filteredRoutes = routes.filter(
    route => route.requiresAuth === isLoggedIn
  );
  console.log(filteredRoutes, 'route', routes);
  return isLoggedIn ? (
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

const Container = connect(mapStateToProps)(ContainerComp);

export default App;
