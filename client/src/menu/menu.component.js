import React from 'react';
// import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import * as actions from './menu.actions';

import { handleClientView } from '../clients/clients.actions';

import { handleProjectView } from '../projects/projects.actions';

import { handleInvoiceView } from '../invoices/invoice.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class MainMenu extends React.Component {

  render() {
    return (
      <div id={this.props.id} style={{marginBottom: 10}}>
        <Paper style={{width:'100%'}}>
              <Menu autoWidth={this.props.autoWidth} width={this.props.width} listStyle={this.props.listStyle} style={this.props.style}>
                <MenuItem
                  primaryText="Dashboard"
                  style={this.props.menuItemStyle}
                  onTouchTap={() => this.props.handleMenuItemSelect('dashboard')}
                />
                <MenuItem
                  primaryText="Clients"
                  style={this.props.menuItemStyle}
                  onTouchTap={() => { this.props.handleMenuItemSelect('clients');
                                      this.props.handleClientView('clientList')}}
                />
                <MenuItem
                  primaryText="Projects"
                  style={this.props.menuItemStyle}
                  onTouchTap={() => { this.props.handleMenuItemSelect('projects')
                                    this.props.handleProjectView('projectList')}}
                />
                <MenuItem
                  primaryText="Invoices"
                  style={this.props.menuItemStyle}
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
        selectedItem: state.menuReducer.selectedItem,
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

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);