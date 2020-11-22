import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { Provider } from 'react-redux';
import rootStore from './redux/store';
import View from './views';

const App = () => {
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <View />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
