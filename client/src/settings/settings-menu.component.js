import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleSettingsView } from './settings.actions';

const style = {
  display: 'inline-block',
  margin: 0,
  padding: 0,
};

class SettingsMenu extends React.Component {
    render() {
        return (
            <Paper style={style} className={this.props.className}>
            <Menu>
                <MenuItem primaryText="Edit User Info" onTouchTap={() => this.props.handleSettingsView('EDIT_USER')}/>
                <MenuItem primaryText="Change Password" onTouchTap={() => this.props.handleSettingsView('EDIT_PASSWORD')}/>
                <MenuItem primaryText="Change Theme" onTouchTap={() => this.props.handleSettingsView('EDIT_THEME')}/>
            </Menu>
            </Paper>
        )
    }
}


// export default SettingsMenu;

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
        // fetchDataFromApi: fetchDataFromApi,
        handleSettingsView: handleSettingsView,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);