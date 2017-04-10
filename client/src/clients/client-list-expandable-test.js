import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import TextField from 'material-ui/TextField';

import Divider from 'material-ui/Divider';


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

  render() {
    return (
      <div>
        <br />
        {/*<MobileTearSheet>*/}
          <List>
              {/*<Subheader>Your Clients</Subheader>*/}
              <h3 style={{color: "#076"}} >Your Clients</h3>
        {this.props.clients.map( (client, index) => (
            <div key={index}>
            <ListItem
                key={index}
                primaryText={
                  <TextField
                    id={client.name}
                    name="clientName"
                    defaultValue={client.name}
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
        {/*</MobileTearSheet>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
        clients: state.clientReducer.clients
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientListExpandable);