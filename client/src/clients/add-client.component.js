import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import * as actions from './clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  textField: {
    display: 'inline-block',
    margin: 10,

    width: '40%',
    // float: 'left'
  }
}
class AddClient extends React.Component {

    actionButtons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleAddClientModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
      />,
    ];

    render() {
        return (

      <div>
        <h3 style={{color: "#076", display: "inline-block"}} >New Client</h3>
        <Divider />
        <form id="new-client-form" onSubmit={(event) => {
            event.preventDefault()

            let firstName = event.target.clientFirstName.value
            let lastName = event.target.clientLastName.value
            let company = event.target.company.value
            let phone = event.target.phone.value
            let email = event.target.email.value
            let address = event.target.address.value
            let userId = this.props.userId

            this.props.handleAddClient(firstName, lastName, company, phone, email, address, userId)

            event.target.clientFirstName.value = ''
            event.target.clientLastName.value = ''
            event.target.company.value = ''
            event.target.phone.value = ''
            event.target.email.value = ''
            event.target.address.value = ''
          }}>
            <TextField
              id="clientFirstName"
              name="clientFirstName"
              floatingLabelText="Client's First Name"
              floatingLabelFixed={true}
              hintText="John"
              style={styles.textField}
            />
            <TextField
              id="clientLastName"
              name="clientLastName"
              floatingLabelText="Client's Last Name"
              floatingLabelFixed={true}
              hintText="Doe"
              style={styles.textField}
            />
            <br />
            <TextField
              id="company"
              name="company"
              floatingLabelText="Company Name"
              floatingLabelFixed={true}
              hintText="John Doe Inc"
              style={styles.textField}
            />
            <TextField
              id="phone"
              name="phone"
              floatingLabelText="Client's Phone No."
              floatingLabelFixed={true}
              hintText="555-555-5555"
              style={styles.textField}
            />
            <br />
            <TextField
              id="email"
              name="email"
              floatingLabelText="Client's Email"
              floatingLabelFixed={true}
              hintText="jdoe@jdoe.com"
              style={styles.textField}
            />
            <TextField
              id="address"
              name="address"
              floatingLabelText="Client's Address"
              floatingLabelFixed={true}
              hintText="123 Main St"
              style={styles.textField}
            />
            </form>
            <br />
            <div className="col-xs-12" style={{marginTop: 10}} >
              <Divider />
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.props.handleClientView('clientList')}
              />
              <FlatButton
                label="Save"
                form="new-client-form"
                type="submit"
                primary={true}
                keyboardFocused={true}
              />
            </div>
    </div>
);
    }
}

function mapStateToProps(state) {
    return {
        userId: state.loginReducer.user.userId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleClientView: actions.handleClientView,
        handleAddClient: actions.handleAddClient,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);