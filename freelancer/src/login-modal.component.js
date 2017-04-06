import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <FlatButton {...this.props} label="Login" style={{color: 'white'}} onTouchTap={this.handleOpen}/>
        <Dialog
          //title=""
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Login" value={0} />
          <Tab label="Sign Up" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            {/*<h2 style={styles.headline}>Log In</h2>*/}
            <Paper>
              <h3 className="col-xs-9 col-xs-offset-3">To demo the app, log in with<br />username: demo<br />password: demo123</h3>
            </Paper>
            <TextField
              floatingLabelText="Username"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your username"
              errorText="This field is required"
            /><br />
            <TextField
              floatingLabelText="Password"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your password"
              errorText="This field is required"
            />
          </div>
          <div style={styles.slide}>
            <TextField
              floatingLabelText="Username"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your username"
              errorText="This field is required"
            /><br />
            <TextField
              floatingLabelText="Password"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your password"
              errorText="This field is required"
            />
            <TextField
              floatingLabelText="Confirm Password"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="confirm your password"
              errorText="This field is required"
            />
            <TextField
              floatingLabelText="email"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="email@email.com"
              errorText="This field is required"
            />
            <TextField
              floatingLabelText="Address"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="123 Main St"
              errorText="This field is required"
            />
            <TextField
              floatingLabelText="City"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="Los Angeles"
              errorText="This field is required"
            />
            <TextField
              floatingLabelText="State/Province"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="CA"
              errorText="This field is required"
            />
            <TextField
              floatingLabelText="Zip Code"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="90026"
              errorText="This field is required"
            />
            <TextField
              floatingLabelText="Phone No."
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="555-555-5555"
              errorText="This field is required"
            />
          </div>
        </SwipeableViews>
        </Dialog>
      </div>
    );
  }
}