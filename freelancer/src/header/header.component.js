import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
// import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DrawerMenu from '../drawer/drawer.component';

import LoginModal from '../login/login-modal.component';
import TimeTracker from '../time-tracker/time-tracker.component';

import * as actions from './header.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem value="1" primaryText="Settings" />
    <MenuItem value="2" primaryText="Help" />
    <MenuItem value="3" primaryText="Send feedback" />
    <MenuItem value="4" primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Header extends Component {

  render() {
    return (
      <div>
          <AppBar
          title="Freelancer"
          style={{backgroundColor: '#007766',
                  //height: 150,
                  padding: 20,}}
          //iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementLeft={<DrawerMenu />}
          iconElementRight={this.props.isLoggedIn ? <Logged /> : <LoginModal />}
        />
        <Toggle
            label="Logged In Sim"
            defaultToggled={this.props.isLoggedIn}
            onToggle={this.props.handleSession}
            labelPosition="right"
            style={{margin: 20, width: '30%', display: 'inline-block'}}
          />
          <TimeTracker style={{width: '50%', display: 'inline-block'}}/>
      </div>
    );
  }
}

// export default Header;


function mapStateToProps(state) {
    return {
        // isModalOpen: state.headerReducer.isModalOpen,
        // isDrawerOpen: state.headerReducer.isDrawerOpen,
        isLoading: state.headerReducer.isLoading,
        isLoggedIn: state.headerReducer.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleSession: actions.handleSession,
        // handleModal: actions.handleModal,
        // handleDrawer: actions.handleDrawer,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

