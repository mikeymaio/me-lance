import getMuiTheme from 'material-ui/styles/getMuiTheme';


const darkTheme = getMuiTheme({
  palette: {
    primary1Color: '#007766',
    primary2Color: '#222',
    accent1Color: '#ff6a00',
    accent2Color: '#007766',
    textColor: '#007766',
    alternateTextColor: '#222',
  },
  appBar: {
    height: 40,
  },
  tabs: {
      textColor: '#bbb',
    },
  tableRow: {
    hoverColor: '#eee',
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
  // datePicker: {
  //   color: muiTheme.palette.primary1Color,
  //   textColor: muiTheme.palette.alternateTextColor,
  //   calendarTextColor: muiTheme.palette.textColor,
  //   selectColor: muiTheme.palette.primary2Color,
  //   selectTextColor: muiTheme.palette.alternateTextColor,
  //   calendarYearBackgroundColor: muiTheme.palette.canvasColor,
  // },
});

export default darkTheme;
