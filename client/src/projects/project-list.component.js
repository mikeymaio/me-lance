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

import Checkbox from 'material-ui/Checkbox';

const styles = {
    input: {
    display: 'inline-block',
    margin: 0,
    width: '50%',
    textAlign: 'left',
  },
  datePicker: {
    marginTop: 0,
    width: '50%',
  },
  selectMenu: {
    display: 'inline-block',
    width: '50%',
    textAlign: 'left',
    margin: 0,
  },
  checkbox: {
    width: '50%',
    textAlign: 'center',
    marginBottom: 16,
  },
  block: {
    maxWidth: 250,
  },
}


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
    billingCycleValue: null,
    selectedClient: "",
    selectedClientIndex: null,
    // selectedTemplate: "",
    completed: null,
    totalTimeSpent: 0,
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
        this.setState({billingCycleValue: value});
  };

      this.handleStatusChange = (event, index, value) => {
        this.setState({completed: value});
  };

    this.handleClientChange = (event, index, value) => {
        this.setState({selectedClient: value, selectedClientIndex: index});
  };


    this.handleTemplateChange = (event, index, value) => {
        this.setState({selectedTemplate: value});
  };

      this.handleStatus = (event, index, value) => {
        this.setState({completed: value});
  };


}

componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
}

  render() {

          const FilterLink = ({
        filter,
        children
        }) => {
            return (
                <a href="#"
                style={{marginLeft: '5px'}}
                onClick={e => {
                e.preventDefault();
                this.props.filterProjects(filter)
                }} >
                {children}
                </a>
            );
    };

    const getVisibleProjects = (
        projects,
        filter
        ) => {
            switch(filter) {
            case 'SHOW_ALL':
                return projects
            case 'SHOW_COMPLETED':
                return projects.filter(
                p => p.completed
                )
            case 'SHOW_ACTIVE':
                return projects.filter(
                p => !p.completed
                )
            default:
                return projects
            }
    }

    return (
      <div>
        <br />
          <List>
              <h3 style={{color: "#076", display: "inline-block"}}>Your Projects</h3>
              <FlatButton
                label="New Project"
                primary={true}
                keyboardFocused={false}
                onTouchTap={() => this.props.handleProjectView('addProject')}
                style={{float: "right"}}
              />
              {this.props.clients.map( client => (
                  client.projects.map( (project, index) => {
                   return <Card key={project.projectName+index}>
                    <CardHeader
                      title={project.projectName}
                      subtitle={project.clientName}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true} children={
                    <form id="project-edit-form" onSubmit={(event) => {
                        event.preventDefault()
                        let projectName = event.target.projectName.value;
                        let rate = event.target.rate.value;
                        let ratePer = this.state.billingCycleValue;
                        let notes = event.target.notes.value;
                        let startDate = event.target.startDate.value;
                        let endDate = event.target.endDate.value;
                        let totalTimeSpent = event.target.totalTimeSpent.value;
                        let billingCycle = this.state.billingCycleValue;
                        let completed = this.state.completed;
                        let userId = this.props.userId;
                        let clientId = project.clientId;
                        let projectId = project._id;

                        this.props.handleUpdateProject(projectName, rate, ratePer, notes, startDate, endDate, totalTimeSpent, billingCycle, completed, userId, clientId, projectId)
                      }}>
                      { this.props.isLoading ? <Loader /> : false }

                        <TextField
                            name="projectName"
                            floatingLabelText="Project Name"
                            floatingLabelFixed={true}
                            defaultValue={project.projectName}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            style={styles.input}
                            />
                            <br />
                        <TextField
                            name="rate"
                            floatingLabelText="Charge"
                            floatingLabelFixed={true}
                            hintText="$"
                            defaultValue={project.rate}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            style={styles.input}
                            />
                            <br />
                        <SelectField
                            value={this.state.billingCycleValue}
                            onChange={this.handleBillingChange}
                            name="ratePer"
                            floatingLabelText="Per"
                            floatingLabelFixed={true}
                            hintText={project.ratePer}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            style={styles.selectMenu}
                            hintStyle={{color: '#076'}}
                            labelStyle={{color: '#076'}}
                        >
                            {billingOptions}
                        </SelectField>
                        <br />
                        <DatePicker
                            name="startDate"
                            hintText="Start Date"
                            floatingLabelText="Start Date"
                            floatingLabelFixed={true}
                            container="inline"
                            mode="landscape"
                            defaultDate={new Date(project.startDate)}
                            autoOk={true}
                            disabled={!this.props.projectEdit}
                            textFieldStyle={styles.datePicker}
                            underlineDisabledStyle={{display: 'none'}}
                        />
                        <br />
                        <DatePicker
                            name="endDate"
                            hintText="End Date"
                            floatingLabelText="End Date"
                            floatingLabelFixed={true}
                            container="inline"
                            mode="landscape"
                            defaultDate={new Date(project.endDate)}
                            autoOk={true}
                            disabled={!this.props.projectEdit}
                            textFieldStyle={styles.datePicker}
                            underlineDisabledStyle={{display: 'none'}}
                        />
                        <br />
                        <TextField
                            name="notes"
                            floatingLabelText="Notes"
                            floatingLabelFixed={true}
                            floatingLabelStyle={{textAlign: 'left', float: 'left'}}
                            defaultValue={project.notes}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            multiLine={true}
                            style={styles.input}
                            />
                            <br />
                        {/*<TextField
                            name="billingCycle"
                            floatingLabelText="Billing Cycle"
                            floatingLabelFixed={true}
                            defaultValue={project.billingCycle}
                            hintText="weekly, bi-weekly, monthly..."
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            style={styles.input}
                            />*/}
                        <br />
                        <SelectField
                            value={this.state.completed}
                            onChange={this.handleStatusChange}
                            name="Status"
                            floatingLabelText="Status"
                            floatingLabelFixed={true}
                            hintText={project.completed ? "completed" : "in progress"}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            style={styles.selectMenu}
                            hintStyle={{color: '#076'}}
                            labelStyle={{color: '#076'}}
                        >
                           {[ <MenuItem key={0} value={0} primaryText="in progress" />,
                            <MenuItem key={1} value={1} primaryText="completed" /> ]}
                        </SelectField>
                        <br />
                        <TextField
                            name="totalTimeSpent"
                            floatingLabelText="Total Time Spent"
                            floatingLabelFixed={true}
                            defaultValue={this.state.totalTimeSpent}
                            disabled={!this.props.projectEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            style={styles.input}
                            />
                            <Divider inset={false} style={{color: "#076", height: 3}} />
                            { this.props.projectEdit ?
                                <div>
                                    <FlatButton key={`cancel${project.projectId}`} label="Cancel" onTouchTap={() =>                 this.props.handleProjectEdit()}
                                    />
                                    <FlatButton label="Save" key={`save${project.projectId}`} type="submit"                         form="project-edit-form"
                                    />
                                </div>
                                :
                                <div>
                                    <FlatButton key={`edit${project.projectId}`} label="Edit" style={{color: "#FFF",               backgroundColor: "#076"}} onTouchTap={() => this.props.handleProjectEdit()}
                                    />
                                    <FlatButton
                                        className="pull-right"
                                        key={`delete${project.projectId}`}
                                        label="DELETE" onTouchTap={() => this.props.handleDeleteProject(project.clientId, project._id, project.userId)}
                                    />
                                </div>}
                                <Divider inset={false} style={{color: "#076", height: 3}} />
                        </form>
                    }
                  />
              </Card>
                  }).sort(() => 1 )
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
        userId: state.loginReducer.user.userId,
        user: state.loginReducer.user,
        projectFilter: state.projectReducer.projectFilter,
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
        filterProjects: actions.filterProjects,
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);