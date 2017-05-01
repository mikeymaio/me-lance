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
    //padding: 10,
    overflow: "hidden",
  },
  paper: {
    // height: 150,
  //width: '45%',
  marginTop: 30,
  marginBottom: 20,
  // padding: 5,
  textAlign: 'center',
  backgroundColor: '#eee'
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
    urlError: "Please provide a valid URL",
    passwordError: "Password must be at least 8 characters",
    passwordConfirmError: "Passwords do not match",
    emailError: "Please enter a valid email address",
  }

  this.styles = {
    paperStyle: {
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
  }
  }


//       componentDidMount() {
//     this.props.fetchDataFromApi()
//   }

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
    console.log(data);
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

  let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError, passwordError, passwordConfirmError, emailError, alphaNumError } = this.errorMessages;

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
        onTouchTap={this.props.handleLoginModal}
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
      <div>
        <FlatButton label="Login / Demo Account" style={{color: '#fff'}} onTouchTap={this.props.handleLoginModal}/>
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
            {/*<h2 style={styles.headline}>Log In</h2>*/}
            <Paper
            className="col-xs-6 col-xs-offset-3"
            style={styles.paper}
            zDepth={2}
              children={
              <h3
              //className="col-xs-9 col-xs-offset-3"
              >To demo the app, log in with<br />username: demo<br />password: demo123</h3>
              } />
              {/*{ this.props.isLoading ?
            <CircularProgress style={{position: 'absolute', left: '47%', top: '45%', zIndex: 500}} size={60} thickness={7} />
            : false }*/}
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
            />
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
            {/*<br />*/}
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
            {/*<br />*/}
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
            {/*<br />*/}
            <FormsyText
              name="firstName"
              className="col-xs-9 col-xs-offset-3"
              validations="isWords"
              validationError={wordsError}
              //required
              hintText="John"
              floatingLabelText="First Name"
            />
            {/*<br />*/}
            <FormsyText
              name="lastName"
              className="col-xs-9 col-xs-offset-3"
              validations="isWords"
              validationError={wordsError}
              //required
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
              //type="tel"
              className="col-xs-9 col-xs-offset-3"
              //validations={{matchRegexp: '^\d{3}-\d{3}-\d{4}$' }}
              validationError={numericError}
              //required
              hintText="555-555-5555"
              floatingLabelText="Phone No."
            />
            {/*<br />*/}
            <FormsyText
              name="address"
              className="col-xs-9 col-xs-offset-3"
              //validations="isAlphanumeric"
              //validationError={alphaNumError}
              //required
              hintText="123 Main St Somewhere CA 90026"
              floatingLabelText="Address"
            />
            {/*<br />*/}
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


