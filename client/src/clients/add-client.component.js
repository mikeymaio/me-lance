import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
// import {List, ListItem} from 'material-ui/List';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import Divider from 'material-ui/Divider';
// import Avatar from 'material-ui/Avatar';
// import {pinkA200, transparent} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as actions from './clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import CommunicationCall from 'material-ui/svg-icons/communication/call';

// import CommunicationEmail from 'material-ui/svg-icons/communication/email';

// import ActionHome from 'material-ui/svg-icons/action/home';
// import ActionWork from 'material-ui/svg-icons/action/work';





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

    render() {
        return (

      <div>
        <RaisedButton label="Add Client" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} onTouchTap={this.props.handleAddClientModal} />
        <Dialog
          title="New Client"
          actions={this.actionButtons}
          modal={false}
          //open={this.props.isAddClientModalOpen}
          //onRequestClose={this.props.handleModal}
          open={this.props.isAddClientModalOpen}
          //onRequestClose={}
          autoScrollBodyContent={true}
        >
        <form id="add-client" onSubmit={(event) => {
            event.preventDefault()

            let clientName = event.target.clientName.value
            let company = event.target.company.value
            let phone = event.target.phone.value
            let email = event.target.email.value
            let address = event.target.address.value

            this.props.handleAddClient(clientName, company, phone, email, address)

            event.target.clientName.value = ''
            event.target.password.value = ''
            event.target.phone.value = ''
            event.target.email.value = ''
            event.target.address.value = ''
          }}>
            <TextField
              id="clientName"
              name="clientName"
              floatingLabelText="Client's Name"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="John Doe"
              errorText="This field is required"
            /><br />
            <TextField
              id="company"
              name="company"
              floatingLabelText="Company Name"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="John Doe Inc"
              errorText="This field is required"
            /><br />
            <TextField
              id="phone"
              name="phone"
              floatingLabelText="Client's Phone No."
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="555-555-5555"
              errorText="This field is required"
            /><br />
            <TextField
              id="email"
              name="email"
              floatingLabelText="Client's Email"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="John Doe Inc"
              errorText="johndoe@johndoeinc.com"
            /><br />
            <TextField
              id="address"
              name="address"
              floatingLabelText="Client's Address"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="John Doe Inc"
              errorText="johndoe@johndoeinc.com"
            /><br />
            </form>
        </Dialog>
    </div>
);
    }
}

// export default ListExampleContacts;

function mapStateToProps(state) {
    return {
        isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);