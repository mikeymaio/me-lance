import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';

import * as actions from './time-tracker.actions'

import { handleAddInvoice, handleUpdateInvoice } from '../invoices/invoice.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class TimeTrackerModal extends React.Component {
    constructor(props) {
        super(props)

        this.state= {
            canSubmit: false,
        }


  this.errorMessages = {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
  },

  this.styles = {
    paperStyle: {
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
  }


  this.enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  this.disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  }

  this.submitForm = (data) => {
    // alert(JSON.stringify(data, null, 4));
    console.log(data);
    let idS = data.project.split("-")
    let cIndex = idS[0]
    let pIndex = idS[1]

    let description = data.description;

    let client = this.props.clients[cIndex];
    let project = client.projects[pIndex];


    let invoiceNo = project.invoices.length + 1;

    let currentInvoice = project.invoices[project.invoices.length - 1];
    let invoiceId = currentInvoice._id;
    let tax = currentInvoice.tax;

    let userId = this.props.userId;
    let clientId = client.clientId;
    let projectId = project._id;
    let billingPeriodStart = new Date();
    let billingPeriodEnd = moment(billingPeriodStart).add(14, 'days');

    let newInvoiceTasks = [{
        hoursSpent: data.time,
        date: new Date(),
        description: data.description
    }]

    const concatTasks = currentInvoice =>  {
        let tasksToAdd = [{
        hoursSpent: data.time,
        date: new Date(),
        description: data.description
        }]
        var newTasks = tasksToAdd.concat(currentInvoice.tasks);
        return newTasks;
    }

    let updateInvoiceTasks = concatTasks(currentInvoice)

    const newData = {
        cIndex,
        pIndex,
        description
    }
    console.log(newData);

    if ( new Date(currentInvoice.billingPeriodEnd) < new Date()) {
        // create a new invoice
        // return (
          return this.props.handleAddInvoice(invoiceNo, billingPeriodStart, billingPeriodEnd, newInvoiceTasks, userId, clientId, projectId);
        //this.props.handleClearStartTime()
        // )
    }
    // update invoice
        // return (
          return this.props.handleUpdateInvoice(updateInvoiceTasks, tax, userId, clientId, projectId, invoiceId)
        //this.props.handleClearStartTime()
        // )


  }

  this.notifyFormError = (data) => {
    console.error('Form error:', data);
  }


  this.handleOpen = () => {
    this.props.handleTimeModal()
  };

  this.handleClose = () => {
    this.props.handleTimeModal()
  };

    this.round2Fixed = (value) => {
        value = +value;

        if (isNaN(value))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + 2) : 2)));

        // Shift back
        value = value.toString().split('e');
        return (+(value[0] + 'e' + (value[1] ? (+value[1] - 2) : -2))).toFixed(2);
    }

    this.convertTimeToHours = (time1, time2) => {
        return this.round2Fixed((((time1 - time2) / 1000 ) / 60 ) / 60, 2 )
    }

}
  render() {

      let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        //label="Submit"
        //type="submit"
        form="add-time-form"
        //primary={true}
        //disabled={true}
        onTouchTap={this.handleClose}
        style={submitStyle}
        type="submit"
        label="Save"
        disabled={!this.state.canSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add To Invoice"
          actions={actions}
          modal={true}
          open={this.props.isTimeModalOpen}
          //contentStyle={{textAlign: 'center'}}
          //onRequestClose={this.props.handleLoginModal}
        >
        {console.log(this.props.timerStop - this.props.user.timerStart)}
        Add { this.convertTimeToHours(this.props.timerStop, this.props.user.timerStart) } hours to...
        <br />
        <Formsy.Form
            id="add-time-form"
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
          <FormsySelect
              name="project"
              required
              floatingLabelText="Project"
              //menuItems={this.selectFieldItems}
            >
            {this.props.clients.map( (client, cIndex) => (
                client.projects.map( (project, pIndex) => (
                    <MenuItem value={`${cIndex}-${pIndex}`} key={`${cIndex}-${pIndex}`} primaryText={project.projectName} />
                ))
            ))}
            </FormsySelect>
            <br />
            <FormsyText
                name="description"
                floatingLabelText="Description"
                hintText="description of task"
                multiLine={true}
            />
            <FormsyText
                name="time"
                value={this.convertTimeToHours(this.props.timerStop, this.props.user.timerStart)}
                style={{visibility: "hidden"}}
            />
            </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        userId: state.loginReducer.user.userId,
        clients: state.clientReducer.clients,
        // timerStart: state.timeTrackerReducer.timerStart,
        timerStop: state.timeTrackerReducer.timerStop,
        isTimeModalOpen: state.timeTrackerReducer.isTimeModalOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleTimerStart: actions.handleTimerStart,
        handleTimerStop: actions.handleTimerStop,
        handleTimeModal: actions.handleTimeModal,
        handleAddInvoice: handleAddInvoice,
        handleUpdateInvoice: handleUpdateInvoice,
        handleClearStartTime: actions.handleClearStartTime
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTrackerModal);