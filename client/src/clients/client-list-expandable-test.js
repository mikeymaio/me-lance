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
                    name="clientName"
                    defaultValue={`${client.firstName} ${client.lastName}`}
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
                        defaultValue={client.email}
                      />
                    }
                    />,
                    <ListItem
                    key={`phone${index}`}
                    primaryText={
                      <TextField
                        id={client.phone}
                        name="phone"
                        defaultValue={client.phone}
                      />
                    }
                    />,
                    <ListItem
                    key={`address${index}`}
                    primaryText={
                      <TextField
                        id={client.address}
                        name="address"
                        defaultValue={client.address}
                      />
                    }
                    />,
                ]}
                />
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
        userId: state.loginReducer.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserClients: actions.fetchUserClients,
        handleClientView: actions.handleClientView,
        // filterClients: actions.filterClients,
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientListExpandable);