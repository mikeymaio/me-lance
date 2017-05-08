import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

import Formsy from 'formsy-react';
import { FormsySelect, FormsyText } from 'formsy-material-ui/lib';

import * as actions from './time-tracker.actions'

import { handleAddInvoice, handleUpdateInvoice } from '../invoices/invoice.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

class TimeTrackerModal extends React.Component {
    constructor(props) {
        super(props)

        this.state= {
            canSubmit: false,
        }

  this.styles = {
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
    let idS = data.project.split("-")
    let cIndex = idS[0]
    let pIndex = idS[1]

    let client = this.props.clients[cIndex];
    let project = client.projects[pIndex];

    let invoiceNo = project.invoices.length + 1;

    let currentInvoice = project.invoices[project.invoices.length - 1];

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

    if ( !currentInvoice || new Date(currentInvoice.billingPeriodEnd) < new Date() ) {
        // create a new invoice
        return (
          this.props.handleAddInvoice(invoiceNo, billingPeriodStart, billingPeriodEnd, newInvoiceTasks, userId, clientId, projectId),
          this.props.handleClearStartTime(userId)
        )
    }
    // update invoice
    let invoiceId = currentInvoice._id;
    let tax = currentInvoice.tax;
    const concatTasks = currentInvoice =>  {
        let tasksToAdd = [{
        hoursSpent: data.time,
        date: new Date(),
        description: data.description
        }]
        var newTasks = tasksToAdd.concat(currentInvoice.tasks);
        return newTasks;
    }
    let updateInvoiceTasks = concatTasks(currentInvoice);

    return (
      this.props.handleUpdateInvoice(updateInvoiceTasks, tax, userId, clientId, projectId, invoiceId),
      this.props.handleClearStartTime(userId)
    )


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

      let { submitStyle } = this.styles;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        form={this.props.formId}
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
        >
        Add { this.convertTimeToHours(this.props.timerStop, this.props.user.timerStart) } hours to...
        <br />
        <Formsy.Form
            id={this.props.formId}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
          <FormsySelect
              name="project"
              required
              floatingLabelText="Project"
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
            <br />
            <FormsyText
                name="time"
                floatingLabelText="Hours"
                hintText="Hours Worked"
                value={this.convertTimeToHours(this.props.timerStop, this.props.user.timerStart)}
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