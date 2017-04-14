import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {List, ListItem} from 'material-ui/List';

import * as actions from './projects.actions';

import TextField from 'material-ui/TextField';

import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Loader from '../loader/loader.component';

class ProjectList extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    open: false,
  };

  this.handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  this.handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

}
  componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {

    return (
      <div>
        <br />
          <List>
              <h3 style={{color: "#076", display: "inline-block"}} >Your Projects</h3>
              <FlatButton
                label="New Project"
                primary={true}
                keyboardFocused={false}
                onTouchTap={() => this.props.handleProjectView('addProject')}
                style={{float: "right"}}
              />
              {this.props.clients.map( client => (
                  client.projects.map( (project, index) => (
                    <Card key={project.projectName+index}>
                    <CardHeader
                      title={project.name}
                      subtitle={project.client}
                      //avatar="images/ok-128.jpg"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true} children={
                    <form id="project-edit-form" onSubmit={(event) => {
                        event.preventDefault()
                        console.log('project-update-form submitted')
                        let clientName = event.target.clientName.value
                        let projectName = event.target.projectName.value
                        let rate = event.target.rate.value
                        let ratePer = event.target.ratePer.value
                        let budget = event.target.budget.value
                        let startDate = event.target.startDate.value
                        let endDate = event.target.endDate.value
                        let timeSpent = event.target.timeSpent.value
                        let billingCycle = event.target.billingCycle.value
                        let completed = event.target.completed.value
                        let userId = this.props.userId

                        this.props.handleUpdateProject(clientName, projectName, rate, ratePer, budget, startDate, endDate, timeSpent, billingCycle, completed, userId)
                      }}>
                      { this.props.isLoading ? <Loader /> : false }
                      <TextField
                            id={project.clientName}
                            name="clientName"
                            floatingLabelText="Client"
                            defaultValue={project.client}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.projectName}
                            name="name"
                            floatingLabelText="Project Name"
                            defaultValue={project.projectName}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.rate}
                            name="rate"
                            floatingLabelText="Charge"
                            defaultValue={project.rate}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.ratePer}
                            name="ratePer"
                            floatingLabelText="Per"
                            defaultValue={project.ratePer}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <br />
                        <TextField
                            id={project.budget}
                            name="budget"
                            floatingLabelText="Budget"
                            defaultValue={project.budget}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.startDate}
                            name="startDate"
                            floatingLabelText="Start Date"
                            defaultValue={project.startDate}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <br />
                        <TextField
                            id={project.endDate}
                            name="endDate"
                            floatingLabelText="End Date"
                            defaultValue={project.endDate}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.notes}
                            name="notes"
                            floatingLabelText="Notes"
                            defaultValue={project.notes}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.billingCycle}
                            name="billingCycle"
                            floatingLabelText="Billing Cycle"
                            defaultValue={project.billingCycle}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.invoiceTemp}
                            name="invoiceTemp"
                            floatingLabelText="Invoice Template"
                            defaultValue={project.invoiceTemp}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={project.completed}
                            name="completed"
                            floatingLabelText="Status"
                            defaultValue={project.completed}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                            <Divider inset={false} style={{color: "#076", height: 3}} />
                            { this.props.projectEdit ?
                              <div>
                                <FlatButton key={`cancel${project.projectId}`} label="Cancel" onTouchTap={() => this.props.handleProjectEdit()} />
                                <FlatButton key={`save${project.projectId}`} type="submit" form="project-edit-form" label="Save" //onTouchTap={() => this.props.handleClientEdit()}
                                  />
                                  </div>
                                :
                                <div>
                                  <FlatButton
                                  className="pull-left"
                                  key={`delete${client.clientId}`} label="DELETE" onTouchTap={() => this.props.handleDeleteClient(client.clientId, this.props.userId)} />
                                  <FlatButton key={`edit${client.clientId}`} label="Edit" style={{color: "#FFF", backgroundColor: "#076"}} onTouchTap={() => this.props.handleClientEdit()} />

                                    {/*<FlatButton key={`test${client.clientId}`} label="Loader" style={{color: "#FFF", backgroundColor: "#076"}} onTouchTap={() => this.props.testLoader()} />*/}

                                </div>}
                                <Divider inset={false} style={{color: "#076", height: 3}} />
                        </form>
                    }
                  />
              </Card>
                  ))
            ))}
          </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        clients: state.clientReducer.clients,
        projectEdit: state.projectReducer.projectEdit,
        isLoading: state.projectReducer.isLoading,
        userId: state.loginReducer.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserClients: actions.fetchUserClients,
        handleClientView: actions.handleClientView,
        handleClientEdit: actions.handleClientEdit,
        handleUpdateClient: actions.handleUpdateClient,
        handleDeleteClient: actions.handleDeleteClient,
        handleProjectView: actions.handleProjectView,
        testLoader: actions.testLoader,
        // filterClients: actions.filterClients,
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);