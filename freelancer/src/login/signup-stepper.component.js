import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class SignUp extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Step 1: Enter User Info</StepLabel>
            <StepContent>
              <TextField
                hintText="email@email.com"
                errorText="This field is required"
                floatingLabelText="Email Address"
                floatingLabelFixed={true}
              />
              <TextField
                hintText="enter a password"
                errorText="This field is required"
                floatingLabelText="Password"
                floatingLabelFixed={true}
              />
              <TextField
                hintText="confirm your password"
                errorText="This field is required"
                floatingLabelText="Confirm Password"
                floatingLabelFixed={true}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Step 2: Personal Info</StepLabel>
            <StepContent>
              {/*<p>Do this here...</p>*/}
              <TextField
                hintText="John Doe"
                errorText="This field is required"
                floatingLabelText="Name"
                floatingLabelFixed={true}
              />
              <TextField
                hintText="555-555-5555"
                errorText="This field is required"
                floatingLabelText="Phone No."
                floatingLabelFixed={true}
              />
              <TextField
                hintText="123 Main St"
                errorText="This field is required"
                floatingLabelText="Address"
                floatingLabelFixed={true}
              />
              <TextField
                hintText="Los Angeles"
                errorText="This field is required"
                floatingLabelText="City"
                floatingLabelFixed={true}
              />
              <TextField
                hintText="CA"
                errorText="This field is required"
                floatingLabelText="State"
                floatingLabelFixed={true}
              />
              <TextField
                hintText="postal code"
                errorText="This field is required"
                floatingLabelText="Postal Code"
                floatingLabelFixed={true}
              />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
            <StepContent>
              <p>
                Do this here...
              </p>
              <TextField
                hintText="hint"
                errorText="This field is required"
                floatingLabelText="Label"
                floatingLabelFixed={true}
              />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Welcome to Freelance!
            </a>
          </p>
        )}
      </div>
    );
  }
}

export default SignUp;