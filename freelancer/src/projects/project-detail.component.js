import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
// import Avatar from 'material-ui/Avatar';
// import {pinkA200, transparent} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as actions from './projects.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import CommunicationCall from 'material-ui/svg-icons/communication/call';

// import CommunicationEmail from 'material-ui/svg-icons/communication/email';

// import ActionHome from 'material-ui/svg-icons/action/home';
// import ActionWork from 'material-ui/svg-icons/action/work';





class ProjectDetail extends React.Component {

    actionButtons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleProjectDetailModal}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleProjectDetailModal}
      />,
    ];

    render() {
        return (

      <div>
        <FlatButton label="+" style={{margin: 'auto'}} onTouchTap={this.props.handleProjectDetailModal}/>
        <Dialog
          title="Project Details"
          actions={this.actionButtons}
          modal={false}
          //open={this.props.isDetailModalOpen}
          //onRequestClose={this.props.handleModal}
          open={this.props.isDetailModalOpen}
          //onRequestClose={}
          autoScrollBodyContent={true}
        >
    <List className={this.props.className} >
      <ListItem
        primaryText="ID: 12321"
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Name: ${this.props.name}`}
        //leftAvatar={<Avatar src="images/chexee-128.jpg" />}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Client: ${this.props.client}`}
        //leftIcon={<ActionHome color="#007766" />}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Company: ${this.props.company}`}
        //leftIcon={<ActionWork color="#007766" />}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Email: ${this.props.email}`}
        //leftIcon={<CommunicationEmail color="#007766" />}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Phone No: ${this.props.phone}`}
        //leftIcon={<CommunicationCall color="#007766" />}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Deadline: ${this.props.deadline}`}
        //leftIcon={<CommunicationCall color="#007766" />}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Budget: ${this.props.budget}`}
        //leftIcon={<CommunicationCall color="#007766" />}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Hours Worked: ${this.props.hoursWorked}`}
        //leftIcon={<CommunicationCall color="#007766" />}
      />
    </List>
    </Dialog>
    </div>
);
    }
}

// export default ListExampleContacts;

function mapStateToProps(state) {
    return {
        isDetailModalOpen: state.projectReducer.isDetailModalOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleProjectDetailModal: actions.handleProjectDetailModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);