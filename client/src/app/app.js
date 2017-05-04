import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/header.component';
import MainMenu from '../menu/menu.component';


import InvoiceList from '../invoices/editable-invoice-list.component';
import InvoiceDetail from '../invoices/invoice-detail.component';
import AddInvoice from '../invoices/add-invoice.component';

import ClientList from '../clients/client-list.component';
import AddClient from '../clients/add-client.component';

import ProjectList from '../projects/editable-project-list.component';
import AddProject from '../projects/add-project.component';

import Settings from '../settings/settings.component';

import ExampleChart from '../dashboard/dashboard.component';

import Landing from '../landing/landing.component';

import Loader from '../loader/loader.component';

import TimeTracker from '../time-tracker/time-tracker.component';

import Notification from '../notifications/notification.component';


import './app.css';

const styleItem = {
  display: 'inline',
  float: 'left',
  width: '25%',
  textAlign: 'center'
};


class App extends Component {
  render() {
    return (
      <div className="app">
        {/*<div className="app-header">
        </div>*/}
        {this.props.isLoading ? <Loader style={{zIndex: 5000}}/> : false}
        { this.props.isLoggedIn ?
        <div>
        <Header className="app-header" />
        <div className="container-fluid" style={{backgroundColor: "#eee"}}>
          <div className="row">
            {/*<SubHeader />*/}
          <MainMenu id="main-menu" autoWidth={false} width="100%" listStyle={{width: '0.01%'}} style={{width:'100%'}} menuItemStyle={styleItem}/>
          <TimeTracker id="timetracker-mobile" textColor="#076" style={{margin: 15, display: 'block', width: '100%'}}/>
          </div>
          <div
            className="col-xs-12 col-md-10 col-md-offset-1"
            style={{textAlign: 'center'}}>
            {this.props.isLoggedIn && this.props.selectedItem === 'dashboard' ? <ExampleChart /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'clients' && this.props.clientView === 'clientList' ? <ClientList /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'clients' && this.props.clientView === 'addClient' ? <AddClient /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'projects' && this.props.projectView === 'projectList' ? <ProjectList /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'projects' && this.props.projectView === 'addProject' ? <AddProject /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'invoices' && this.props.invoiceView === 'invoiceList' ? <InvoiceList /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'invoices' && this.props.invoiceView === 'invoiceDetail' ? <InvoiceDetail /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'invoices' && this.props.invoiceView === 'addInvoice' ? <AddInvoice /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'settings' ? <Settings /> : false}
            <Notification />
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
        isLoading: state.appReducer.isLoading,
        isLoggedIn: state.loginReducer.isLoggedIn,
        selectedItem: state.menuReducer.selectedItem,
        clientView: state.clientReducer.clientView,
        projectView: state.projectReducer.projectView,
        invoiceView: state.invoiceReducer.invoiceView,
    };
}

export default connect(mapStateToProps)(App);

