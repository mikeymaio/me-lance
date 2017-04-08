import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import SignUp from './signup-stepper.component';

import * as actions from '../header/header.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

class LoginModal extends React.Component {

  render() {

    const actionButtons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleLoginModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleLoginModal}
      />,
    ];

    return (
      <div>
        <FlatButton label="Login / Demo Account" style={{color: 'white'}} onTouchTap={this.props.handleLoginModal}/>
        <Dialog
          //title=""
          actions={actionButtons}
          modal={false}
          open={this.props.isLoginModalOpen}
          onRequestClose={this.props.handleLoginModal}
          autoScrollBodyContent={true}
        >
        <Tabs
          onChange={this.props.handleLoginSlides}
          value={this.props.loginModalSlideIndex}
        >
          <Tab label="Login" value={0} />
          <Tab label="Sign Up" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.props.loginModalSlideIndex}
          onChangeIndex={this.props.handleLoginSlides}
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
            <SignUp />
            {/*<TextField
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
            />*/}
          </div>
        </SwipeableViews>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isLoginModalOpen: state.headerReducer.isLoginModalOpen,
        loginModalSlideIndex: state.headerReducer.loginModalSlideIndex,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleLoginModal: actions.handleLoginModal,
        handleLoginSlides: actions.handleLoginSlides
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);