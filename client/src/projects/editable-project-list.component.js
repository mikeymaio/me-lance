import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {List} from 'material-ui/List';

import * as actions from './projects.actions';

import { fetchUserClients } from '../clients/clients.actions';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

import Loader from '../loader/loader.component';


const billingOptions = [
  <MenuItem key={1} value="hr" primaryText="hr" />,
  <MenuItem key={2} value="day" primaryText="day" />,
  <MenuItem key={3} value="week" primaryText="week" />,
  <MenuItem key={4} value="fixed price" primaryText="fixed price" />,
  <MenuItem key={5} value="other" primaryText="other" />,
];


class ProjectList extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    open: false,
    billingOptionValue: "hr",
    selectedClient: "Select A Client",
    selectedClientIndex: null,
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

    this.handleBillingChange = (event, index, value) => {
        this.setState({billingOptionValue: value});
  };

    this.handleClientChange = (event, index, value) => {
        this.setState({selectedClient: value, selectedClientIndex: index});
  };

    this.handleTemplateChange = (event, index, value) => {
        this.setState({selectedTemplate: value});
  };

}
//   componentDidUpdate() {
//     this.props.fetchUserClients(this.props.userId)
//   }

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
                      title={project.projectName}
                      subtitle={project.clientName}
                      //avatar="images/ok-128.jpg"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true} children={
                    <form id="project-edit-form" onSubmit={(event) => {
                        event.preventDefault()
                        console.log('project-update-form submitted')
                        let clientName = this.state.selectedClient
                        let projectName = event.target.projectName.value
                        let rate = event.target.rate.value
                        let ratePer = this.state.billingOptionValue
                        let budget = event.target.budget.value
                        let startDate = event.target.startDate.value
                        let endDate = event.target.endDate.value
                        let totalTimeSpent = event.target.totalTimeSpent.value
                        let billingCycle = event.target.billingCycle.value
                        let completed = event.target.completed.value
                        let userId = this.props.userId

                        this.props.handleUpdateProject(clientName, projectName, rate, ratePer, budget, startDate, endDate, totalTimeSpent, billingCycle, completed, userId)
                      }}>
                      { this.props.isLoading ? <Loader /> : false }
                      <TextField
                            id={project.clientName}
                            name="clientName"
                            floatingLabelText="Client"
                            defaultValue={project.clientName}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <SelectField
                            value={this.state.selectedClient}
                            defaultValue={project.clientName}
                            onChange={this.handleClientChange}
                            //maxHeight={200}
                            name="clientName"
                            floatingLabelText="Client Name"
                            hintText="Client Name"
                            disabled={!this.props.projectEdit}
                        >
                        {this.props.clients.map( ( client, index ) => (
                            <MenuItem key={index} value={`${client.firstName} ${client.lastName}`} primaryText={`${client.firstName} ${client.lastName}`} />
                        ))}
                        </SelectField>
                        <TextField
                            id={project.projectName}
                            name="projectName"
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
                        {/*<TextField
                            id={project.ratePer}
                            name="ratePer"
                            floatingLabelText="Per"
                            defaultValue={project.ratePer}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />*/}
                        <SelectField
                            value={this.state.billingOptionValue}
                            onChange={this.handleBillingChange}
                            //maxHeight={200}
                            name="ratePer"
                            floatingLabelText="Per"
                            disabled={!this.props.projectEdit}
                        >
                            {billingOptions}
                        </SelectField>
                        <br />
                        <TextField
                            id={project.budget}
                            name="budget"
                            floatingLabelText="Budget"
                            defaultValue={project.budget}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        {/*<TextField
                            id={project.startDate}
                            name="startDate"
                            floatingLabelText="Start Date"
                            defaultValue={project.startDate}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />*/}
                        <DatePicker
                            name="startDate"
                            hintText="Start Date"
                            container="inline"
                            mode="landscape"
                            autoOk={true}
                            disabled={!this.props.projectEdit}
                        />
                        <br />
                        <DatePicker
                            name="endDate"
                            hintText="End Date"
                            container="inline"
                            mode="landscape"
                            autoOk={true}
                            disabled={!this.props.projectEdit}
                        />
                        <br />
                        {/*<TextField
                            id={project.endDate}
                            name="endDate"
                            floatingLabelText="End Date"
                            defaultValue={project.endDate}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />*/}
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
                        <TextField
                            id={project.totalTimeSpent}
                            name="totalTimeSpent"
                            floatingLabelText="Total Time Spent"
                            defaultValue={project.totalTimeSpent}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                            <Divider inset={false} style={{color: "#076", height: 3}} />
                            { this.props.projectEdit ?
                              <div>
                                <FlatButton key={`cancel${project.projectId}`} label="Cancel" onTouchTap={() => this.props.handleProjectEdit()} />
                                <FlatButton label="Save" key={`save${project.projectId}`} type="submit" form="project-edit-form"
                                //onTouchTap={() => this.props.handleProjectEdit()}
                                  />
                                  </div>
                                :
                                <div>
                                  <FlatButton
                                  className="pull-left"
                                  key={`delete${project.projectId}`}
                                  label="DELETE" onTouchTap={() => this.props.handleDeleteProject(project.clientId, project.projectId, project.userId)} />
                                  <FlatButton key={`edit${project.projectId}`} label="Edit" style={{color: "#FFF", backgroundColor: "#076"}} onTouchTap={() => this.props.handleProjectEdit()} />

                                    {/*<FlatButton key={`test${project.projectId}`} label="Loader" style={{color: "#FFF", backgroundColor: "#076"}} onTouchTap={() => this.props.testLoader()} />*/}

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
        handleProjectEdit: actions.handleProjectEdit,
        handleUpdateProject: actions.handleUpdateProject,
        handleDeleteProject: actions.handleDeleteProject,
        handleProjectView: actions.handleProjectView,
        testLoader: actions.testLoader,
        fetchUserClients: fetchUserClients,
        // filterClients: actions.filterClients,
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);