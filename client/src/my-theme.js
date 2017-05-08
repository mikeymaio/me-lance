import getMuiTheme from 'material-ui/styles/getMuiTheme';

const myTheme = getMuiTheme({
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

export default myTheme;
