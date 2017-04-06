import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../header/header.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DrawerMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        {/*<RaisedButton
          style={{height:40, width: 40, fontSize: '1.5em'}}
          label="&#9776;"
          onTouchTap={this.handleToggle}
        />*/}
        <button
            style={{height:30, width: 30, fontSize: '2em', color: 'white', backgroundColor: '#007766', border: 'none', marginLeft: 10, outline: 'none'}}
            onTouchTap={this.props.handleDrawer}>
          &#9776;
        </button>
        <Drawer
          docked={false}
          width={200}
          open={this.props.isDrawerOpen}
          onRequestChange={this.props.handleDrawer}
        >
          <MenuItem
            //onTouchTap={this.handleClose}
            //leftIcon={}
            >Clients
          </MenuItem>
          <MenuItem
            //onTouchTap={this.handleClose}
            >Projects
          </MenuItem>
          <MenuItem
            //onTouchTap={this.handleClose}
            >
            Invoices
          </MenuItem>
            <MenuItem
            //onTouchTap={this.handleClose}
            >Timer
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isDrawerOpen: state.headerReducer.isDrawerOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleDrawer: actions.handleDrawer,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);