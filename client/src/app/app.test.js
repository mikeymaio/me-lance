import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import store from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import myTheme from '../my-theme';

import '../index.css';

injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider muiTheme={myTheme} >
    <App />
  </MuiThemeProvider>
  </Provider>,
  div
  )
});
