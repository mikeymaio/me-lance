import React from 'react';

import UpdateUser from './update-user.component';

import { fetchDataFromApi } from '../login/login.actions';
import { handleUserUpdate } from './settings.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Settings extends React.Component {

  render() {

    return (
      <div className="col-xs-12">
        <UpdateUser className="col-xs-9"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        settingsView: state.settingsReducer.settingsView,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchDataFromApi: fetchDataFromApi,
        handleUserUpdate: handleUserUpdate,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


