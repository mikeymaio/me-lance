import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

// import FlatButton from 'material-ui/FlatButton';

// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DrawerMenu from '../drawer/drawer.component';
import PopoverMenu from '../popover-menu/popover-menu.component';

import LoginModal from '../login/login-modal.component';
import TimeTracker from '../time-tracker/time-tracker.component';

import * as actions from './header.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import './header.css';


class ToolBar extends Component {
  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{marginTop: 0}}>
          <TimeTracker id="timetracker" textColor="#FFF" style={{width: '100%', textAlign: 'center'}}/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <PopoverMenu />
        </ToolbarGroup>
      </Toolbar>
    )
  }
};


class Header extends Component {

  render() {
    return (
      <div>
          <AppBar
          title="Freelancer"
          style={{
            //backgroundColor: '#007766',
                  //height: 150,
                  padding: 20,}}
                  titleStyle={{minWidth: 100}}
          //showMenuIconButton={false}
          iconElementLeft={<DrawerMenu />}
          //iconElementRight={this.props.isLoggedIn ? <PopoverMenu /> : <LoginModal />}
          iconElementRight={<ToolBar />}
        />
          {/*<TimeTracker style={{marginTop: 15, display: 'block', width: '100%'}}/>*/}
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

