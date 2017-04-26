import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
// import RaisedButton from 'material-ui/RaisedButton';

import * as actions from './drawer.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainMenu from '../menu/menu.component';
import FlatButton from 'material-ui/FlatButton';

import Divider from 'material-ui/Divider';

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
        <button
            style={{height:30, width: 30, fontSize: '2em', color: 'white', backgroundColor: '#007766', border: 'none', marginLeft: 10, outline: 'none'}}
            onTouchTap={this.props.handleDrawer}>
          &#9776;
        </button>
        <Drawer
          docked={true}
          width={200}
          open={this.props.isDrawerOpen}
          onRequestChange={this.props.handleDrawer}
        >
        <FlatButton label="X" className="pull-right" onTouchTap={this.props.handleDrawer} />
          <h4 className="pull-left">Freelancer</h4>
          <Divider style={{height: 3}} />
          <MainMenu style={{width: "100%", float: "left"}} menuItemStyle={{display: "block", width: "100%", float: "left"}} />
          <Divider style={{height: 3}} />
          <Menu>
            <MenuItem value="1" primaryText="Settings" />
            <MenuItem value="2" primaryText="Help" />
            <MenuItem value="3" primaryText="Send feedback" />
            <MenuItem value="4" primaryText="Sign out" />
          </Menu>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isDrawerOpen: state.drawerReducer.isDrawerOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleDrawer: actions.handleDrawer,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);