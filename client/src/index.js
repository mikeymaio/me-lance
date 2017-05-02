import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lightTheme from './my-theme-light';
import darkTheme from './my-theme-dark';

import ToRender from './to-render.component';

import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();






ReactDOM.render(
  <Provider store={store}>
  <ToRender />
  </Provider>,
  document.getElementById('root')
);

