import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import lightTheme from './my-theme-light';
import darkTheme from './my-theme-dark';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import './index.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#007766',
    primary2Color: '#fff',
    accent1Color: '#ff6a00',
    accent2Color: '#007766',
    textColor: '#007766',
    alternateTextColor: '#fff',

  },
  textField: {
    disabledTextColor: '#076',
  },
  datePicker: {
    color: '#ccc',
    textColor: '#FFF',
    calendarTextColor: '#076',
    selectColor: '#076',
    selectTextColor: '#eee',
    calendarYearBackgroundColor: '#FFF',
    disabledTextColor: '#076',
  },
  toolbar: {
      backgroundColor: '#076',
    },
    raisedButton: {
      backgroundColor: '#076',
      color: '#fff'
    }
});

const muiDarkTheme = getMuiTheme({
  palette: {
    primary1Color: '#007766',
    primary2Color: '#222',
    accent1Color: '#fff',
    accent2Color: '#007766',
    textColor: '#007766',
    alternateTextColor: '#222',

  },
  textField: {
    disabledTextColor: '#076',
  },
  datePicker: {
    color: '#ccc',
    textColor: '#222',
    calendarTextColor: '#076',
    selectColor: '#076',
    selectTextColor: '#eee',
    calendarYearBackgroundColor: '#222',
    disabledTextColor: '#076',
  },
});

const light = getMuiTheme(lightBaseTheme)
const dark = getMuiTheme(darkBaseTheme)

import { connect } from 'react-redux';


class ToRender extends React.Component {
  render() {
    let theme = this.props.theme === 'dark' ?
        dark :
        muiTheme;
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
