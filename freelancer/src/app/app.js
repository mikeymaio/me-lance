import React, { Component } from 'react';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../header/header.component';
import SideMenu from '../menu/left-menu.component';
import InvoiceList from '../invoices/invoice-list.component';
import ClientList from '../clients/client-list.component';
import ProjectList from '../projects/project-list.component';
import ExampleChart from '../dashboard/dashboard.component';

import './app.css';



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
            {this.props.selectedItem === 'dashboard' ? <ExampleChart /> : false}
            {this.props.selectedItem === 'clients' ? <ClientList /> : false}
            {this.props.selectedItem === 'projects' ? <ProjectList /> : false}
            
            {this.props.selectedItem === 'invoices' ? <InvoiceList /> : false}
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

