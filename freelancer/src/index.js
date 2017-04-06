import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import store from './store';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider
    //muiTheme={getMuiTheme(darkBaseTheme)}
  >
  <App />
  </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
