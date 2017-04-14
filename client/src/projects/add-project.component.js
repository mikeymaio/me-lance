import React from 'react';

import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Loader from '../loader/loader.component';

import * as actions from './projects.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const billingOptions = [
  <MenuItem key={1} value="hr" primaryText="hr" />,
  <MenuItem key={2} value="day" primaryText="day" />,
  <MenuItem key={3} value="week" primaryText="week" />,
  <MenuItem key={4} value="fixed price" primaryText="fixed price" />,
  <MenuItem key={5} value="other" primaryText="other" />,
];

class AddProject extends React.Component {

    state = {
    billingOptionValue: "hr",
    selectedClient: "Select A Client"
  };

  handleBillingChange = (event, index, value) => {
    this.setState({billingOptionValue: value});
  };

handleClientChange = (event, index, value) => {
    this.setState({selectedClient: value});
  };

    actionButtons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleAddProjectModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        //onTouchTap={this.props.handleAddProjectModal}
      />,
    ];

    render() {
        return (

      <div>
        <h2>New Client</h2>
        <Divider />
        <form id="project-add-form" onSubmit={(event) => {
            event.preventDefault()
            console.log('project-add-form submitted')
            let clientName = this.state.selectedClient
            let projectName = event.target.projectName.value
            let rate = event.target.rate.value
            let ratePer = this.state.billingOptionValue
            let budget = event.target.budget.value
            let startDate = event.target.startDate.value
            let endDate = event.target.endDate.value
            let timeSpent = 0
            let billingCycle = event.target.billingCycle.value
            let userId = this.props.userId

            this.props.handleAddProject(clientName, projectName, rate, ratePer, budget, startDate, endDate, timeSpent, billingCycle, userId)
            }}>
            { this.props.isLoading ? <Loader /> : false }
            {/*<TextField
                //id={project.clientName}
                name="clientName"
                floatingLabelText="Client Name"
                hintText="John Doe"
                />*/}
            <SelectField
                    value={this.state.selectedClient}
                    onChange={this.handleClientChange}
                    //maxHeight={200}
                    name="clientName"
                    floatingLabelText="Client Name"
                    hintText="Client Name"
                >
                {this.props.clients.map( ( client, index ) => (
                    <MenuItem key={index} value={`${client.firstName} ${client.lastName}`} primaryText={`${client.firstName} ${client.lastName}`} />
                ))}
                </SelectField>
            <TextField
                //id={project.projectName}
                name="projectName"
                floatingLabelText="Project Name"
                hintText="My Awesome Project"
                />
            <TextField
                //id={project.rate}
                name="rate"
                floatingLabelText="Charge"
                hintText="100"
                />
                <SelectField
                    value={this.state.billingOptionValue}
                    onChange={this.handleChange}
                    //maxHeight={200}
                    name="ratePer"
                    floatingLabelText="Per"
                >
                    {billingOptions}
                </SelectField>
            {/*<TextField
                //id={project.ratePer}
                name="ratePer"
                floatingLabelText="Per"
                hintText="hour"
                />*/}
            <br />
            <TextField
                //id={project.budget}
                name="budget"
                floatingLabelText="Budget"
                hintText="10,000"
                />
            <DatePicker
                name="startDate"
                hintText="Start Date"
                container="inline"
                mode="landscape"
                //autoOk={true}
            />
            <br />
            <DatePicker name="endDate" hintText="End Date" container="inline" mode="landscape" autoOk={true} />
            <TextField
                //id={project.notes}
                name="notes"
                floatingLabelText="Notes"
                hintText="Notes about the project"
                multiLine={true}
                />
            <TextField
                //id={project.billingCycle}
                name="billingCycle"
                floatingLabelText="Billing Cycle"
                hintText="2 weeks"
                />
            <TextField
                //id={project.invoiceTemp}
                name="invoiceTemp"
                floatingLabelText="Invoice Template"
                hintText="none"
                />
                <Divider inset={false} style={{color: "#076", height: 3}} />
                {/*{ this.props.projectEdit ?*/}
                    <div>
                        <FlatButton label="Cancel" onTouchTap={() => this.props.handleProjectEdit()} />
                        <FlatButton type="submit" form="project-add-form" label="Save" //onTouchTap={() => this.props.handleClientEdit()}
                        />
                     </div>
                    {/*:*/}
                    {/*<div>*/}
                    {/*</div>*/}
                    {/*}*/}
                    {/*<Divider inset={false} style={{color: "#076", height: 3}} />*/}
            </form>
            <br />
            {/*<div className="col-xs-12" style={{marginTop: 10}} >
              <Divider />
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.props.handleProjectView('projectList')}
              />
              <FlatButton
                label="Save"
                form="project-add-form"
                type="submit"
                primary={true}
                keyboardFocused={true}
                //onTouchTap={() => this.props.handleProjectView('projectList')}
              />
            </div>*/}
        {/*</Dialog>*/}
    </div>
);
    }
}

// export default ListExampleContacts;

function mapStateToProps(state) {
    return {
        isAddProjectModalOpen: state.clientReducer.isAddProjectModalOpen,
        clients: state.clientReducer.clients,
        userId: state.loginReducer.user.userId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleAddProjectModal: actions.handleAddProjectModal,
        handleProjectView: actions.handleProjectView,
        handleAddProject: actions.handleAddProject,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);