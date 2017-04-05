import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DrawerMenu from './drawer.component';


class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

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
  state = {
    logged: false,
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
          <AppBar
          title="Mentor"
          style={{backgroundColor: '#222',
                  //height: 150,
                  padding: 20,}}
          //iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementLeft={<DrawerMenu />}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
        <Toggle
          label="Logged In Sim"
          defaultToggled={false}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />
      </div>
    );
  }
}

export default Header;