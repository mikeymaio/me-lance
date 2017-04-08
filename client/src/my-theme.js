import getMuiTheme from 'material-ui/styles/getMuiTheme';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#007766',
    primary2Color: 'white',
    accent1Color: '#ff6a00',
    accent2Color: '#007766',
    textColor: '#007766',
    alternateTextColor: 'white',
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
});

export default muiTheme;
