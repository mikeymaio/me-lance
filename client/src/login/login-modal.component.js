import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

import * as actions from './login.actions';

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
    overflow: "hidden",
  },
  paper: {
  marginTop: 30,
  marginBottom: 20,
  textAlign: 'center',
  backgroundColor: '#eee'
},
  error: {
    textAlign: 'center',
    backgroundColor: '#fff'
    }
};

const customContentStyle = {
  width: '100%',
  maxWidth: 700,
};

class LoginModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      canSubmit: false,
    };

  this.errorMessages = {
    wordsError: "Please only use letters",
    alphaNumError: "Please only use letters and numbers",
    numericError: "Please provide a number",
    passwordError: "Password must be at least 8 characters",
    passwordConfirmError: "Passwords do not match",
    emailError: "Please enter a valid email address",
  }

  this.styles = {
    submitStyle: {
      marginTop: 32,
    },
  }
  }


  render() {

  const enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  const disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  }


  const submitLoginForm = (data) => {
    let userName = data.username;
    let password = data.password;

    this.props.handleLogin(userName, password)
  }

  const submitSignupForm = (data) => {
    let userName = data.username
    let password = data.password
    let passwordConfirm = data.passwordConfirm
    let email = data.email
    let firstName = data.firstName
    let lastName = data.lastName
    let phone = data.phone
    let address = data.address

    this.props.handleSignUp(userName, password, passwordConfirm, email, firstName, lastName, phone, address)

  }

  const notifyFormError = (data) => {
    console.error('Form error:', data);
  }

  let {submitStyle } = this.styles;
    let { wordsError, numericError, passwordError, passwordConfirmError, emailError, alphaNumError } = this.errorMessages;

    const actionButtons =
    this.props.loginModalSlideIndex === 0 ?
    [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleLoginModal}
      />,
      <RaisedButton
        label="Submit"
        form="login-form"
        type="submit"
        primary={true}
        keyboardFocused={true}
        style={submitStyle}
        disabled={!this.state.canSubmit}
      />,
    ] :
    [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleLoginModal}
      />,
      <RaisedButton
        label="Submit"
        form="signup-form"
        type="submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleLoginModal}
        style={submitStyle}
        disabled={!this.state.canSubmit}
      />,
    ];

    return (
      <div style={{padding: 15}}>
        <a href="#" style={{color: '#fff', textDecoration: 'none'}} onTouchTap={ () => {
          this.props.handleLoginModal();
          this.props.handleLoginSlides(0);
          }}>
          Login / Demo Account
        </a>
        <Dialog
          actions={actionButtons}
          modal={false}
          open={this.props.isLoginModalOpen}
          onRequestClose={this.props.handleLoginModal}
          autoScrollBodyContent={true}
          bodyStyle={{padding: 1}}
          contentStyle={customContentStyle}
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
          <div style={styles.slide}>
            <Paper
            className="col-xs-6 col-xs-offset-3"
            style={styles.paper}
            zDepth={2}
              children={
              <h3
              >To demo the app, log in with<br />username: demo<br />password: demo123</h3>
              } />
          <Formsy.Form
            id="login-form"
            onValid={enableButton}
            onInvalid={disableButton}
            onValidSubmit={submitLoginForm}
            onInvalidSubmit={notifyFormError}
          >
            <FormsyText
              name="username"
              className="col-xs-9 col-xs-offset-3"
              validations="isAlphanumeric"
              validationError={alphaNumError}
              required
              hintText="demo"
              floatingLabelText="Username"
            />
            <br />
            <FormsyText
              name="password"
              className="col-xs-9 col-xs-offset-3"
              hintText="demo123"
              type="password"
              floatingLabelText="Password"
              required
            />
            <Paper
            className="col-xs-6 col-xs-offset-3"
            style={styles.error}
            zDepth={0}
              children={
              <div style={{color: 'red'}} >{this.props.error}</div>
              } />
          </Formsy.Form>
          </div>
          <div style={styles.slide}>
              { this.props.isLoading ?
              <CircularProgress style={{position: 'absolute', left: '147%', top: '45%', zIndex: 500}} size={60} thickness={7} />
              : false }
              <Formsy.Form
            id="signup-form"
            onValid={enableButton}
            onInvalid={disableButton}
            onValidSubmit={submitSignupForm}
            onInvalidSubmit={notifyFormError}
          >
          <h3 style={{textAlign: "center"}}>Sign Up</h3>
            <FormsyText
              name="username"
              className="col-xs-9 col-xs-offset-3"
              validations="isAlphanumeric"
              validationError={alphaNumError}
              required
              hintText="demo"
              floatingLabelText="Username"
            />
            <FormsyText
              name="password"
              className="col-xs-9 col-xs-offset-3"
              validations="minLength:8"
              validationError={passwordError}
              required
              type="password"
              floatingLabelText="Password"
              hintText="enter a password"
            />
            <FormsyText
              name="passwordConfirm"
              className="col-xs-9 col-xs-offset-3"
              validations="equalsField:password"
              validationError={passwordConfirmError}
              required
              type="password"
              floatingLabelText="Password Confirmation"
              hintText="Re-enter password"
            />
            <FormsyText
              name="firstName"
              className="col-xs-9 col-xs-offset-3"
              validations="isWords"
              validationError={wordsError}
              hintText="John"
              floatingLabelText="First Name"
            />
            <FormsyText
              name="lastName"
              className="col-xs-9 col-xs-offset-3"
              validations="isWords"
              validationError={wordsError}
              hintText="Doe"
              floatingLabelText="Last Name"
            />
            <FormsyText
              name="email"
              className="col-xs-9 col-xs-offset-3"
              validations="isEmail"
              validationError={emailError}
              required
              floatingLabelText="Email"
              hintText="email@email.com"
            />
            <FormsyText
              name="phone"
              className="col-xs-9 col-xs-offset-3"
              validationError={numericError}
              hintText="555-555-5555"
              floatingLabelText="Phone No."
            />
            <FormsyText
              name="address"
              className="col-xs-9 col-xs-offset-3"
              multiLine={true}
              hintText="123 Main St Somewhere CA 90026"
              floatingLabelText="Address"
            />
            <div className="col-xs-9 col-xs-offset-3" style={{height:20}} />
          </Formsy.Form>
          </div>
        </SwipeableViews>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isLoginModalOpen: state.loginReducer.isLoginModalOpen,
        loginModalSlideIndex: state.loginReducer.loginModalSlideIndex,
        error: state.loginReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleLoginModal: actions.handleLoginModal,
        handleLoginSlides: actions.handleLoginSlides,
        fetchDataFromApi: actions.fetchDataFromApi,
        handleLogin: actions.handleLogin,
        handleSignUp: actions.handleSignUp
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);


