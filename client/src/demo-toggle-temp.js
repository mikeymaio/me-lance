import React, {Component} from 'react';

import Toggle from 'material-ui/Toggle';

import * as actions from './login/login.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class LoggedToggle extends Component {

  render() {
    return (
        <Toggle
            label="Logged In Sim"
            defaultToggled={this.props.isLoggedIn}
            onToggle={this.props.handleSession}
            labelPosition="right"
            style={{margin: 20, width: '30%', display: 'inline-block'}}
          />
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
        // handleModal: actions.handleModal,
        // handleDrawer: actions.handleDrawer,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedToggle);

