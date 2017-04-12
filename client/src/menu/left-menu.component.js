import React from 'react';
// import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import * as actions from './left-menu.actions';
import { handleClientView } from '../clients/clients.actions';

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
            onTouchTap={() => this.props.handleMenuItemSelect('projects')}
            >Projects
          </MenuItem>
          <MenuItem
            onTouchTap={() => this.props.handleMenuItemSelect('invoices')}
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleMenuItemSelect: actions.handleMenuItemSelect,
        handleClientView: handleClientView,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);