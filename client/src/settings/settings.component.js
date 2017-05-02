import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

import { fetchDataFromApi } from '../login/login.actions';
import { handleUserUpdate } from './settings.actions';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateUser from './update-user.component';
import SettingsMenu from './settings-menu.component';

class Settings extends React.Component {

  render() {

    return (
      <div className="col-xs-12">
        <SettingsMenu className="col-xs-3"/>
        {this.props.settingsView === 'EDIT_USER' ?
        <UpdateUser className="col-xs-9"/> : false }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isLoginModalOpen: state.loginReducer.isLoginModalOpen,
        // loginModalSlideIndex: state.loginReducer.loginModalSlideIndex,
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


