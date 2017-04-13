import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {List, ListItem} from 'material-ui/List';

import * as actions from './clients.actions';

import TextField from 'material-ui/TextField';

import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';




class ClientListExpandable extends React.Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {

    return (
      <div>
        <br />
          <List>
              <h3 style={{color: "#076", display: "inline-block"}} >Your Clients</h3>
              <FlatButton
                label="New Client"
                primary={true}
                keyboardFocused={false}
                onTouchTap={() => this.props.handleClientView('addClient')}
                style={{float: "right"}}
              />
        {this.props.clients.map( (client, index) => (
            <div key={client.clientId}>
            <ListItem
                key={client.lastName+index}
                primaryText={
                  <TextField
                    id={client.lastName}
                    floatingLabelText="Name"
                    name="clientName"
                    defaultValue={`${client.firstName} ${client.lastName}`}
                    disabled={!this.props.clientEdit}
                    underlineDisabledStyle={{display: 'none'}}
                />
                }
                secondaryText={client.company
                 // <TextField
                 //   id={client.company}
                 //   name="company"
                 //   defaultValue={client.company}
                ///>
              }
                initiallyOpen={false}
                primaryTogglesNestedList={false}
                nestedItems={[
                    <ListItem
                    key={`email${index}`}
                    primaryText={
                      <TextField
                        id={client.email}
                        name="email"
                        floatingLabelText="Email"
                        defaultValue={client.email}
                        disabled={!this.props.clientEdit}
                        underlineDisabledStyle={{display: 'none'}}
                      />
                    }
                    />,
                    <ListItem
                    key={`phone${index}`}
                    primaryText={
                      <TextField
                        id={client.phone}
                        name="phone"
                        floatingLabelText="Phone"
                        defaultValue={client.phone}
                        disabled={!this.props.clientEdit}
                        underlineDisabledStyle={{display: 'none'}}
                      />
                    }
                    />,
                    <ListItem
                    key={`address${index}`}
                    primaryText={
                      <TextField
                        id={client.address}
                        name="address"
                        floatingLabelText="Address"
                        defaultValue={client.address}
                        disabled={!this.props.clientEdit}
                        underlineDisabledStyle={{display: 'none'}}
                      />
                    }
                    />,
                     this.props.clientEdit ?
                     <FlatButton key={`save${client.clientId}`} label="Save" onTouchTap={() => this.props.handleClientEdit()} />
                    :
                    <FlatButton key={`edit${client.clientId}`} label="Edit" onTouchTap={() => this.props.handleClientEdit()} />
                ]}
                />
                {/*<FlatButton label="Edit Client Info" />*/}
                <Divider inset={true} style={{color: "#076", height: 3}} />
                </div>
            ))}
          </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
        clients: state.clientReducer.clients,
        clientEdit: state.clientReducer.clientEdit,
        userId: state.loginReducer.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserClients: actions.fetchUserClients,
        handleClientView: actions.handleClientView,
        handleClientEdit: actions.handleClientEdit,
        // filterClients: actions.filterClients,
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientListExpandable);