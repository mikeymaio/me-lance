import React from 'react';
// import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        {/*<RaisedButton
          style={{height:40, width: 40, fontSize: '1.5em'}}
          label="&#9776;"
          onTouchTap={this.handleToggle}
        />*/}
        <Paper >
        <Menu>
          <MenuItem
            //onTouchTap={this.handleClose}
            //leftIcon={}
            >Clients
          </MenuItem>
          <MenuItem
            //onTouchTap={this.handleClose}
            >Projects
          </MenuItem>
          <MenuItem
            //onTouchTap={this.handleClose}
            >
            Invoices
          </MenuItem>
            <MenuItem
            //onTouchTap={this.handleClose}
            >Timer
          </MenuItem>
        </Menu>
        </Paper>
      </div>
    );
  }
}