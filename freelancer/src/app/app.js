import React, { Component } from 'react';
import { connect } from 'react-redux';
// import logo from '../logo.svg';
import './app.css';

// import Toggle from 'material-ui/Toggle';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../header/header.component';
// import SignUpModal from '../login/signup-modal.component';
import SideMenu from '../menu/left-menu.component';
// import LoginModal from '../login/login-modal.component';
import InvoiceTable from '../table/invoice-detail.component';

import ClientList from '../table/client-list.component';
import ClientDetail from '../table/client-detail.component';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="app">
        {/*<div className="app-header">
        </div>*/}
        <Header className="app-header" />
        <div className="container-fluid" style={{backgroundColor: "#eee"}}>
          <div className="col-xs-3">
          <SideMenu />
          </div>
          <div className="col-xs-9" style={{textAlign: 'center'}}>
            {this.props.selectedItem === 'invoices' ? <InvoiceTable /> : false}
            {this.props.selectedItem === 'clients' ? <ClientList /> : false}

            {/*<ClientDetail />*/}
          </div>
        </div>
      </div>
    );
  }
}

// export default App;

function mapStateToProps(state) {
    return {
        selectedItem: state.leftMenuReducer.selectedItem
    };
}

export default connect(mapStateToProps)(App);

