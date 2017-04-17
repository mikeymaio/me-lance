import React from 'react';

import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import * as actions from './clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Validation, fieldValidatorCore } from "react-validation-framework";
import validator from "validator";

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
        //onTouchTap={this.props.handleAddClientModal}
      />,
    ];

// componentWillMount(){
//     fieldValidatorCore.addSupport("TextField", (args)=>{
//       return args[0].target.value;
//     }, (callback, args)=>{
//       callback(args[0]);
//     }, "errorText");
//   }

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
          {/*<Validation group="myGroup1"
		    //closures={{area}}
        closures={[]}
	        validators={[
			    {
	         validator: (val) => !validator.isEmpty(val),
	         errorMessage: "This field is required"
	        },
          {
	         validator: (val) => !validator.isEmail(val),
	         errorMessage: "This field must be a valid email address"
	        }
          ]}>*/}
            <TextField
              id="clientFirstName"
              //className="col-xs-5"
              name="clientFirstName"
              floatingLabelText="Client's First Name"
              floatingLabelFixed={true}
              hintText="John"
              //errorText="This field is required"
              style={styles.textField}
            />
            <TextField
              id="clientLastName"
              //className="col-xs-5"
              name="clientLastName"
              floatingLabelText="Client's Last Name"
              floatingLabelFixed={true}
              hintText="Doe"
              //errorText="This field is required"
              style={styles.textField}
            />
            <br />
            <TextField
              id="company"
              //className="col-xs-5"
              name="company"
              floatingLabelText="Company Name"
              floatingLabelFixed={true}
              hintText="John Doe Inc"
              //errorText="This field is required"
              style={styles.textField}
            />
            {/*<br />*/}
            <TextField
              id="phone"
              name="phone"
              floatingLabelText="Client's Phone No."
              floatingLabelFixed={true}
              hintText="555-555-5555"
              //errorText="This field is required"
              style={styles.textField}
            />
            <br />
            <TextField
              id="email"
              name="email"
              floatingLabelText="Client's Email"
              floatingLabelFixed={true}
              hintText="John Doe Inc"
              //errorText="johndoe@johndoeinc.com"
              style={styles.textField}
            />
            {/*<br />*/}
            <TextField
              id="address"
              name="address"
              floatingLabelText="Client's Address"
              floatingLabelFixed={true}
              hintText="John Doe Inc"
              //errorText="johndoe@johndoeinc.com"
              style={styles.textField}
            />
            {/*</Validation>*/}
            {/*<br />*/}
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
                //onTouchTap={() => this.props.handleClientView('clientList')}
              />
            </div>
        {/*</Dialog>*/}
    </div>
);
    }
}

// export default ListExampleContacts;

function mapStateToProps(state) {
    return {
        isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
        userId: state.loginReducer.user.userId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleAddClientModal: actions.handleAddClientModal,
        handleClientView: actions.handleClientView,
        handleAddClient: actions.handleAddClient,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);