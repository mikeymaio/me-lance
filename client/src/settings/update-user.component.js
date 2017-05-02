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

import { fetchDataFromApi } from '../login/login.actions';
import { handleUserUpdate } from './settings.actions';


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

class UpdateUser extends React.Component {
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

  const submitSignupForm = (data) => {
    console.log(data);
    let userName = data.username;
    let email = data.email;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let phone = data.phone;
    let address = data.address;

    let userId = this.props.user.userId;

    this.props.handleUserUpdate(userName, email, firstName, lastName, phone, address, userId)

  }

  const notifyFormError = (data) => {
    console.error('Form error:', data);
  }

  let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError, passwordError, passwordConfirmError, emailError, alphaNumError } = this.errorMessages;

    const user = this.props.user;

    return (
      <div className={this.props.className}>
        <Formsy.Form
            id="signup-form"
            onValid={enableButton}
            onInvalid={disableButton}
            onValidSubmit={submitSignupForm}
            onInvalidSubmit={notifyFormError}
          >
            <FormsyText
              name="username"
              value={user.userName}
              className="col-xs-9 col-xs-offset-3"
              validations="isAlphanumeric"
              validationError={alphaNumError}
              required
              hintText="demo"
              floatingLabelText="Username"
            />
            {/*<br />*/}
            {/*<FormsyText
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
            {/*<FormsyText
              name="passwordConfirm"
              className="col-xs-9 col-xs-offset-3"
              validations="equalsField:password"
              validationError={passwordConfirmError}
              required
              type="password"
              floatingLabelText="Password Confirmation"
              hintText="Re-enter password"
            />*/}
            {/*<br />*/}
            <FormsyText
              name="firstName"
              value={user.firstName}
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
              value={user.lastName}
              className="col-xs-9 col-xs-offset-3"
              validations="isWords"
              validationError={wordsError}
              //required
              hintText="Doe"
              floatingLabelText="Last Name"
            />
            <FormsyText
              name="email"
              value={user.email}
              className="col-xs-9 col-xs-offset-3"
              validations="isEmail"
              validationError={emailError}
              required
              floatingLabelText="Email"
              hintText="email@email.com"
            />
            <FormsyText
              name="phone"
              value={user.phone}
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
              value={user.address}
              className="col-xs-9 col-xs-offset-3"
              //validations="isAlphanumeric"
              //validationError={alphaNumError}
              //required
              hintText="123 Main St Somewhere CA 90026"
              floatingLabelText="Address"
            />
            {/*<br />*/}
            <div className="col-xs-9 col-xs-offset-3">
                <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.handleLoginModal}
            />
            <RaisedButton
                label="Submit"
                form="signup-form"
                type="submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.handleLoginModal}
                style={submitStyle}
                disabled={!this.state.canSubmit}
            />
            </div>
          </Formsy.Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isLoginModalOpen: state.loginReducer.isLoginModalOpen,
        // loginModalSlideIndex: state.loginReducer.loginModalSlideIndex,
        user: state.loginReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchDataFromApi: fetchDataFromApi,
        handleUserUpdate: handleUserUpdate,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);


