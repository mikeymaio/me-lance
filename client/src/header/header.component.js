import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

// import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DrawerMenu from '../drawer/drawer.component';
import PopoverMenu from '../popover-menu/popover-menu.component';

import LoginModal from '../login/login-modal.component';
import TimeTracker from '../time-tracker/time-tracker.component';

import * as actions from './header.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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
          iconElementRight={this.props.isLoggedIn ? <PopoverMenu /> : <LoginModal />}
        />
        <Toggle
            label="Logged In Sim"
            defaultToggled={this.props.isLoggedIn}
            onToggle={this.props.handleSession}
            labelPosition="right"
            style={{margin: 20, width: '30%', display: 'inline-block'}}
          />
          <TimeTracker style={{width: '42%', display: 'inline-block', float: 'right', marginTop: 15}}/>
      </div>
    );
  }
}

// export default Header;


function mapStateToProps(state) {
    return {
        // isModalOpen: state.headerReducer.isModalOpen,
        // isDrawerOpen: state.headerReducer.isDrawerOpen,
        isLoading: state.loginReducer.isLoading,
        isLoggedIn: state.loginReducer.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleSession: actions.handleSession,
        handleLogout: actions.handleLogout,
        // handleModal: actions.handleModal,
        // handleDrawer: actions.handleDrawer,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

