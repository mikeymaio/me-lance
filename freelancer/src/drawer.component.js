import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class DrawerMenu extends React.Component {

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
        <button
            style={{height:30, width: 30, fontSize: '2em', color: 'white', backgroundColor: '#222', border: 'none', marginLeft: 10, outline: 'none'}}
            onTouchTap={this.handleToggle}>
          &#9776;
        </button>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            //onTouchTap={this.handleClose}
            >Menu Item</MenuItem>
          <MenuItem
            //onTouchTap={this.handleClose}
            >Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}