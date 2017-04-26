import React from 'react';
// import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import * as actions from './left-menu.actions';

import { handleView } from '../session/session.actions';

import { handleClientView } from '../clients/clients.actions';

import { handleProjectView } from '../projects/projects.actions';

import { handleInvoiceView } from '../invoices/invoice.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const style = {
  display: 'inline-block',
  margin: '0 32px 16px 0',
  width: '100%'
};

const styleq = {
  display: 'inline',
  float: 'left',
  width: '25%',
  textAlign: 'center'
};

class SideMenu extends React.Component {

  render() {
    return (
      <div>
        <Paper style={{width:'100%'}}>
              <Menu autoWidth={false} width="100%" listStyle={{width: '0.01%'}} style={{width:'100%'}}>
                <MenuItem
                  primaryText="Dashboard"
                  style={styleq}
                  onTouchTap={() => this.props.handleMenuItemSelect('dashboard')}
                />
                <MenuItem
                  primaryText="Clients"
                  style={styleq}
                  onTouchTap={() => { this.props.handleMenuItemSelect('clients');
                                      this.props.handleClientView('clientList')}}
                />
                <MenuItem
                  primaryText="Projects"
                  style={styleq}
                  onTouchTap={() => { this.props.handleMenuItemSelect('projects')
                                    this.props.handleProjectView('projectList')}}
                />
                <MenuItem
                  primaryText="Invoices"
                  style={styleq}
                  onTouchTap={() => { this.props.handleMenuItemSelect('invoices')
                                      this.props.handleInvoiceView('invoiceList', null, null, null)}}
                />
              </Menu>
            </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        selectedItem: state.leftMenuReducer.selectedItem,
        //view: state.sessionReducer.view
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleMenuItemSelect: actions.handleMenuItemSelect,
        handleClientView: handleClientView,
        handleProjectView: handleProjectView,
        handleInvoiceView: handleInvoiceView,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);