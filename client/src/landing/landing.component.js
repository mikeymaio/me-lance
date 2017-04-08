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

import * as actions from '../header/header.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoggedToggle from '../demo-toggle-temp';


class Landing extends Component {

  render() {
    return (
      <div>
      <div className="container-fluid" style={{backgroundColor: '#007766', color: 'white',
                  height: 500,
                  padding: 20,}}>
                  <div className="pull-left"><h3>Freelancer</h3></div>
                  <div className="pull-right"><LoginModal /></div>
                  <div className="col-xs-12" style={{textAlign: 'center'}}><h1>Boost Your Productivity Today!</h1>{ "{ IMAGE / ANIMATION / CAROUSEL HERE}" }</div>
      </div>
      <div className="container-fluid" style={{
        //backgroundColor: '#007766', color: 'white',
                  height: 500,
                  padding: 20,}}>
                  <LoggedToggle />
                  <p style={{textAlign: 'center'}}>Description of application here...(with images, icons, links, etc...)</p>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

