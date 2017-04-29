import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';




class Login extends React.Component {

constructor(props) {
  super(props)

  this.state = {
      canSubmit: false,
    };

  this.errorMessages = {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
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

  const submitForm = (data) => {
    alert(JSON.stringify(data, null, 4));
  }

  const notifyFormError = (data) => {
    console.error('Form error:', data);
  }

    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form
            onValid={enableButton}
            onInvalid={disableButton}
            onValidSubmit={submitForm}
            onInvalidSubmit={notifyFormError}
          >
            <FormsyText
              name="userName"
              validations="isWords"
              validationError={wordsError}
              required
              hintText="demo"
              floatingLabelText="Username"
            />
            <FormsyText
              name="password"
              validations="isPassword"
              validationError={wordsError}
              hintText="demo123"
              type="password"
              floatingLabelText="Password"
            />
            <RaisedButton
              style={submitStyle}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  }
};

export default Login;