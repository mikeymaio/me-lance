import React from 'react';

import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import AutoComplete from 'material-ui/AutoComplete';


import Loader from '../loader/loader.component';

import * as actions from './projects.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const styles = {
    input: {
    display: 'inline-block',
    margin: 5,
    width: '50%',
    textAlign: 'left',
  },
  datePicker: {
    marginTop: 15,
  },
  selectMenu: {
    display: 'inline-block',
    width: '50%',
    textAlign: 'left',
    margin: 0,
  }
}

const billingOptions = [
  <MenuItem key={1} value="hr" primaryText="hr" />,
  <MenuItem key={2} value="day" primaryText="day" />,
  <MenuItem key={3} value="week" primaryText="week" />,
  <MenuItem key={4} value="fixed price" primaryText="fixed price" />,
  <MenuItem key={5} value="other" primaryText="other" />,
];

class AddProject extends React.Component {

    state = {
    //billingOptionValue: "hr",
    billingOptionValue: "",
    selectedClient: '',
    selectedClientIndex: '',
    selectedTemplate: null,
  };


handleBillingChange = (event, index, value) => {
    this.setState({billingOptionValue: value});
  };

handleClientChange = (event, index, value) => {
    this.setState({selectedClient: value, selectedClientIndex: index});
  };


handleTemplateChange = (event, index, value) => {
    this.setState({selectedTemplate: value});
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
        <h3 style={{color: "#076", display: "inline-block"}} >New Project</h3>
        <Divider />
        <form id="project-add-form" onSubmit={(event) => {
            event.preventDefault()
            console.log('project-add-form submitted')
            //let clientName = this.state.selectedClient;
            let clientName = `${this.props.clients[this.state.selectedClientIndex].firstName} ${this.props.clients[this.state.selectedClientIndex].lastName}`;
            let projectName = event.target.projectName.value;
            let rate = event.target.rate.value;
            let ratePer = this.state.billingOptionValue;
            let budget = event.target.budget.value;
            let notes = event.target.notes.value;
            let startDate = event.target.startDate.value;
            let endDate = event.target.endDate.value;
            let timeSpent = 0;
            let billingCycle = event.target.billingCycle.value;
            let template = this.state.selectedTemplate;
            let userId = this.props.userId;
            let clientId = this.props.clients[this.state.selectedClientIndex].clientId;

            this.props.handleAddProject(clientName, projectName, rate, ratePer, budget, notes, startDate, endDate, timeSpent, billingCycle, template, userId, clientId)

            }}>

            { this.props.isLoading ? <Loader /> : false }
            {/*<div>*/}
             <SelectField
                value={this.state.selectedClient}
                onChange={this.handleClientChange}
                //maxHeight={200}
                name="clientName"
                floatingLabelText="Client Name"
                //floatingLabelStyle={{textAlign: "left"}}
                hintText="Select Client"
                style={styles.selectMenu}
            >
            {
                //this.props.templates === [] ?
               // <MenuItem key="newTemp" value="New Template" primaryText="New Template" /> :
                this.props.clients.map( ( client, index ) => (
                    <MenuItem key={index} value={index} primaryText={`${client.firstName} ${client.lastName}`} />
                ))
            }
                </SelectField>
                <br />
            <TextField
                //className="pull-right"
                //id={project.projectName}
                name="projectName"
                floatingLabelText="Project Name"
                //floatingLabelFixed={true}
                hintText="My Awesome Project"
                style={styles.input}
                />
                <br />
            <DatePicker
                name="startDate"
                hintText="Start Date"
                container="inline"
                mode="landscape"
                autoOk={true}
                style={styles.input}
                textFieldStyle={styles.datePicker}
            />
            <br />
            <DatePicker
                name="endDate"
                hintText="End Date"
                container="inline"
                mode="landscape"
                autoOk={true}
                style={styles.input}
                textFieldStyle={styles.datePicker}
                //formatDate={() => MM/DD/YY }
            />
                <br />
            <TextField
                //id={project.rate}
                name="rate"
                floatingLabelText="Charge"
                hintText="$"
                style={styles.input}
            />
            <br />
            <SelectField
                value={this.state.billingOptionValue}
                onChange={this.handleBillingChange}
                name="ratePer"
                floatingLabelText="Per"
                //floatingLabelFixed={true}
                //hintText="hr"
                style={styles.selectMenu}
                //hintStyle={{color: '#076'}}
                labelStyle={{color: '#076'}}
            >
                {billingOptions}
            </SelectField>
            {/*<AutoComplete
                floatingLabelText="per"
                filter={AutoComplete.caseInsensitiveFilter}
                openOnFocus={true}
                dataSource={billingOptions2}
                style={styles.input}
                //textFieldStyle={styles.input}
            />*/}
                <br />
            <TextField
                //id={project.rate}
                name="budget"
                floatingLabelText="Budget"
                hintText="10,000"
                style={styles.input}
            />
            <br />
            <TextField
                //id={project.rate}
                name="notes"
                floatingLabelText="Notes"
                hintText="Notes"
                multiLine={true}
                style={styles.input}
            />
                <br />
            <TextField
                //id={project.billingCycle}
                name="billingCycle"
                floatingLabelText="Billing Cycle"
                hintText="weekly, bi-weekly, monthly..."
                style={styles.input}
                />
                <br />
            {/*<AutoComplete
                name="invoiceTemp"
                floatingLabelText="Invoice Template"
                filter={AutoComplete.caseInsensitiveFilter}
                openOnFocus={true}
                dataSource={this.props.templates.map(template => {
                return template.title;
            })}
                style={styles.input}
                    //textFieldStyle={styles.input}
                />*/}
                <br />
            <SelectField
                value={this.state.selectedTemplate}
                onChange={this.handleTemplateChange}
                //maxHeight={200}
                name="invoiceTemp"
                floatingLabelText="Invoice Template"
                hintText="Select Invoice Template"
                style={styles.selectMenu}
            >
            {/*{this.props.templates === [] ?*/}
                <MenuItem key="newTemp" value="New Template" primaryText="New Template" />
                {this.props.templates.map( ( template, index ) => (
                    <MenuItem key={index} value={template.title} primaryText={template.title} />
                ))}
            {/*}*/}
                </SelectField>

                <Divider inset={false} style={{color: "#076", height: 3}} />
                {/*{ this.props.projectEdit ?*/}
                    <div>
                        <FlatButton label="Cancel" onTouchTap={() => this.props.handleProjectView("projectList")} />
                        <FlatButton type="submit" form="project-add-form" label="Save" //onTouchTap={() => this.props.handleClientEdit()}
                        />
                     </div>
            </form>
    </div>
);
    }
}

// export default ListExampleContacts;

function mapStateToProps(state) {
    return {
        isAddProjectModalOpen: state.clientReducer.isAddProjectModalOpen,
        clients: state.clientReducer.clients,
        userId: state.loginReducer.user.userId,
        templates: state.loginReducer.user.templates
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