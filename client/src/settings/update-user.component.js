import React from 'react';

import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

import { fetchDataFromApi } from '../login/login.actions';
import { handleUserUpdate } from './settings.actions';
import { handleMenuItemSelect } from '../menu/menu.actions';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

    const submitSignupForm = (data) => {
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

    let {submitStyle } = this.styles;
    let { wordsError, numericError, emailError, alphaNumError } = this.errorMessages;

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
            <FormsyText
              name="firstName"
              value={user.firstName}
              className="col-xs-9 col-xs-offset-3"
              validations="isWords"
              validationError={wordsError}
              hintText="John"
              floatingLabelText="First Name"
            />
            <FormsyText
              name="lastName"
              value={user.lastName}
              className="col-xs-9 col-xs-offset-3"
              validations="isWords"
              validationError={wordsError}
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
              className="col-xs-9 col-xs-offset-3"
              validationError={numericError}
              hintText="555-555-5555"
              floatingLabelText="Phone No."
            />
            <FormsyText
              name="address"
              value={user.address}
              className="col-xs-9 col-xs-offset-3"
              multiLine={true}
              hintText="123 Main St Somewhere CA 90026"
              floatingLabelText="Address"
              floatingLabelStyle={{left: 15}}
            />
            <div className="col-xs-9 col-xs-offset-3">
                <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.props.handleMenuItemSelect('dashboard')}
            />
            <RaisedButton
                label="Save"
                form="signup-form"
                type="submit"
                primary={true}
                keyboardFocused={true}
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
        user: state.loginReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchDataFromApi: fetchDataFromApi,
        handleUserUpdate: handleUserUpdate,
        handleMenuItemSelect: handleMenuItemSelect,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);


