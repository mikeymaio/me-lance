import React, {Component} from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import * as actions from '../login/login.actions';

import { handleMenuItemSelect } from '../menu/menu.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PopoverMenu extends Component {
    render() {
        return (
            <IconMenu
                //{...props}
                iconButtonElement={
                <IconButton><MoreVertIcon color='#fff' /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem value="1" primaryText="My Info" onTouchTap={() => this.props.handleMenuItemSelect('settings')}/>
                <MenuItem value="2" primaryText="Help" onTouchTap={() => this.props.handleMenuItemSelect('help')}/>
                {/*<MenuItem value="3" primaryText="Send feedback" />*/}
                <MenuItem value="4" primaryText="Sign out" onTouchTap={this.props.handleLogout} />
            </IconMenu>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleSession: actions.handleSession,
        handleLogout: actions.handleLogout,
        handleMenuItemSelect: handleMenuItemSelect,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopoverMenu);