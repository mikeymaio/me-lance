import React from 'react';

import {List, ListItem} from 'material-ui/List';

import Divider from 'material-ui/Divider';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as actions from './projects.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';





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
          open={this.props.isDetailModalOpen}
          autoScrollBodyContent={true}
        >
    <List className={this.props.className} >
      <ListItem
        primaryText="ID: 12321"
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Name: ${this.props.name}`}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Client: ${this.props.client}`}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Company: ${this.props.company}`}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Email: ${this.props.email}`}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Phone No: ${this.props.phone}`}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Deadline: ${this.props.deadline}`}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Budget: ${this.props.budget}`}
      />
      <Divider inset={true} />
      <ListItem
        primaryText={`Hours Worked: ${this.props.hoursWorked}`}
      />
    </List>
    </Dialog>
    </div>
);
    }
}

export default ProjectDetail;