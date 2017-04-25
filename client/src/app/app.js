import React, { Component } from 'react';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../header/header.component';
import SideMenu from '../menu/left-menu.component';


import InvoiceList from '../invoices/editable-invoice-list.component';
import InvoiceDetail from '../invoices/invoice-detail.component';
import AddInvoice from '../invoices/add-invoice.component';

import ClientList from '../clients/client-list.component';
import AddClient from '../clients/add-client.component';

import ProjectList from '../projects/editable-project-list.component';
import AddProject from '../projects/add-project.component';

import ExampleChart from '../dashboard/dashboard.component';

import Landing from '../landing/landing.component';


// import SubHeader from '../subheader/subheader.component';

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
        { this.props.isLoggedIn ?
        <div>
        <Header className="app-header" />
        <div className="container-fluid" style={{backgroundColor: "#eee"}}>
          <div className="col-xs-2">
            {/*<SubHeader />*/}
          <SideMenu />
          </div>
          <div
            className="col-xs-10"
            style={{textAlign: 'center'}}>
            {this.props.isLoggedIn && this.props.selectedItem === 'dashboard' ? <ExampleChart /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'clients' && this.props.clientView === 'clientList' ? <ClientList /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'clients' && this.props.clientView === 'addClient' ? <AddClient /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'projects' && this.props.projectView === 'projectList' ? <ProjectList /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'projects' && this.props.projectView === 'addProject' ? <AddProject /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'invoices' && this.props.invoiceView === 'invoiceList' ? <InvoiceList /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'invoices' && this.props.invoiceView === 'invoiceDetail' ? <InvoiceDetail /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'invoices' && this.props.invoiceView === 'addInvoice' ? <AddInvoice /> : false}
          </div>
        </div>
        </div>
        :
            <Landing />
        }
      </div>
    );
  }
}

// export default App;

function mapStateToProps(state) {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn,
        selectedItem: state.leftMenuReducer.selectedItem,
        clientView: state.clientReducer.clientView,
        projectView: state.projectReducer.projectView,
        invoiceView: state.invoiceReducer.invoiceView,
    };
}

export default connect(mapStateToProps)(App);

