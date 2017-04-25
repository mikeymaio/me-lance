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

class SideMenu extends React.Component {

  render() {
    return (
      <div>
        <Paper>
        <Menu className="pull-left">
          <MenuItem
            onTouchTap={() => this.props.handleMenuItemSelect('dashboard')}
            >Dashboard
          </MenuItem>
          <MenuItem
            onTouchTap={() => { this.props.handleMenuItemSelect('clients');
                                this.props.handleClientView('clientList')}}
            >Clients
          </MenuItem>
          <MenuItem
            onTouchTap={() => { this.props.handleMenuItemSelect('projects')
                              this.props.handleProjectView('projectList')}}
            >Projects
          </MenuItem>
          <MenuItem
            onTouchTap={() => { this.props.handleMenuItemSelect('invoices')
                                this.props.handleInvoiceView('invoiceList', null, null, null)}}
            >
            Invoices
          </MenuItem>
            {/*<MenuItem
            onTouchTap={() => this.props.handleMenuItemSelect('timer')}
            >Timer
          </MenuItem>*/}
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