import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/modules/dashboard-360/components/GlobalStyles';
import 'src/modules/dashboard-360/mixins/chartjs';
import theme from 'src/modules/dashboard-360/theme';
import { useLoading, Grid } from '@agney/react-loading';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import rootStore from './redux/store';
import RouteSwitch from './components/RouteSwitch';
import routes from './routes';

const useStyle = makeStyles((dtheme) => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: dtheme.palette.primary.light,
    color: 'white'
  }
}));

function Loader() {
  const classes = useStyle();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Grid width="50" height="50" />,
  });

  return (
    <Box
      {...containerProps}
      justifyContent="center"
      alignItems="center"
      display="flex"
      className={classes.root}
    >
      {indicatorEl}
    </Box>
  );
}

const App = () => {
  return (
      <Provider store={rootStore}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <React.Suspense
              fallback={<Loader />}
            >
              <GlobalStyles />
              <RouteSwitch routes={routes} isRoot />
            </React.Suspense>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
  );
};

export default App;
