import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import lightTheme from './my-theme-light';
import darkTheme from './my-theme-dark';

import './index.css';




import { connect } from 'react-redux';


class ToRender extends React.Component {
  render() {
    let theme = this.props.theme === 'dark' ?
        darkTheme :
        lightTheme;
    return (
      <MuiThemeProvider
        muiTheme={theme}
  >
  <App />
  </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
    return {
        theme: state.settingsReducer.theme
    };
}


export default connect(mapStateToProps)(ToRender);
