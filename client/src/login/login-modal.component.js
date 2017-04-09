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
    //padding: 10,
  },
};

class LoginModal extends React.Component {

//       componentDidMount() {
//     this.props.fetchDataFromApi()
//   }

  render() {

    const actionButtons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleLoginModal}
      />,
      <FlatButton
        label="Submit"
        form="login-form"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleLoginModal}
      />,
      <button type="submit" form="login-form">MySubmitBtn</button>
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
          <div >
            {/*<h2 style={styles.headline}>Log In</h2>*/}
            <Paper>
              <h3 className="col-xs-9 col-xs-offset-3">To demo the app, log in with<br />username: demo<br />password: demo123</h3>
            </Paper>

      <form id="login-form" onSubmit={(event) => {
            event.preventDefault()

            let userName = event.target.username.value
            let password = event.target.password.value

            this.props.handleLogin(userName, password)

            event.target.username.value = ''
            event.target.password.value = ''
          }}>
            <TextField
              id="username"
              name="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your username"
              errorText="This field is required"
            /><br />
            <TextField
              id="password"
              name="password"
              type="password"
              floatingLabelText="Password"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your password"
              errorText="This field is required"
            />
            </form>
          </div>
          <div style={styles.slide}>
            <SignUp />
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
        submitLoginForm: actions.submitLoginForm,
        handleLoginSlides: actions.handleLoginSlides,
        fetchDataFromApi: actions.fetchDataFromApi,
        handleLogin: actions.handleLogin
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);


