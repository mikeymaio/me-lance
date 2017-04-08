import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import store from './store';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { fade } from '../utils/colorManipulator';

import muiTheme from './my-theme';

import './index.css';

// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: '#007766',
//     primary2Color: 'white',
//     accent1Color: 'red',
//     accent2Color: '#007766',
//     textColor: '#007766',
//     alternateTextColor: 'white',
//   },
//   appBar: {
//     height: 40,
//   },
//   tabs: {
//       textColor: '#bbb',
//     },
// });

ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider
    muiTheme={muiTheme}
  >
  <App />
  </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
