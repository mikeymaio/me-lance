import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';

import DatePicker from 'material-ui/DatePicker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './invoice.actions';

import moment from 'moment';

import MuiEditableTable from '../editable-table.component';


const colSpec = [
    {title: 'Date', fieldName: 'date', inputType: "DatePicker", type: "date", width: 200},
    {title: 'Hours', fieldName: 'hoursSpent', inputType: "TextField", type: "number", width: 200},
    {title: 'Description', fieldName: 'description', inputType: "TextField", type: "text", width: 200},
];

const rowData = [
    { date: null, hours: '', description: ''},
];

class AddInvoice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
      dataTable: [],
    };

        this.formatDate = date => {
    return moment(date).format("MM/DD/YY")
}

  this.onChange = (dataTable) => {
    console.log(dataTable)
    this.setState({dataTable})
};

}


  render() {

    const client = this.props.clients[this.props.cIndex];
    const project = client.projects[this.props.pIndex];
    // const invoice = project.invoices[this.props.iIndex];

        return (

     <div>
        <form id="invoice-add-form" onSubmit={ event => {
            event.preventDefault();

            let invoiceNo = project.invoices.length + 1
            let billingPeriodStart = event.target.billingPeriodStart.value === '' ? event.target.billingPeriodStart.value : event.target.billingPeriodStart.value;
            let billingPeriodEnd = event.target.billingPeriodEnd.value === '' ? event.target.billingPeriodEnd.value : event.target.billingPeriodEnd.value;
            let tasks = this.state.dataTable;
            let clientId = client.clientId;
            let projectId = project._id;
            let userId = this.props.user.userId
            console.log(tasks);


            this.props.handleAddInvoice(invoiceNo, billingPeriodStart, billingPeriodEnd, tasks, userId, clientId, projectId)
          } } >
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            //style={{borderBottom: '3px solid #007766'}}
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Invoice #" style={{textAlign: 'left'}}>
                Invoice #: {project.invoices.length + 1}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="Billing Period" style={{textAlign: 'left'}}>
                Billing Period: <DatePicker name="billingPeriodStart" hintText="From" container="inline"
                mode="landscape" autoOk={true} firstDayOfWeek={0} /> - <DatePicker name="billingPeriodEnd" hintText="To" container="inline" mode="landscape" autoOk={true} firstDayOfWeek={0} />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="The project name" style={{textAlign: 'left'}}>
                    Project Name: {project.projectName}
                </TableHeaderColumn>
                <TableHeaderColumn colSpan="6" tooltip="The project's ID no." style={{textAlign: 'left'}}>
                    Project Id: {project._id}
                </TableHeaderColumn>
              </TableRow>
            <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your Name" style={{textAlign: 'left'}}>
                Name: {`${this.props.user.firstName} ${this.props.user.lastName}`}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="The client's name" style={{textAlign: 'left'}}>
                Client Name: {project.clientName}
              </TableHeaderColumn>
              </TableRow>
              <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your address" style={{textAlign: 'left'}}>
                Address: {this.props.user.address}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="the client's address" style={{textAlign: 'left'}}>
                Client Address: {client.address}
              </TableHeaderColumn>
            </TableRow>
            {/*<TableRow displayBorder={true} style={{borderTop: '2px solid #007766'}} >
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="Date worked">Date</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="Hours worked">Hours</TableHeaderColumn>
              <TableHeaderColumn colSpan="5" style={{textAlign: 'left'}} tooltip="Description of task">Description</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={{textAlign: 'left'}} tooltip="Edit"></TableHeaderColumn>
            </TableRow>*/}
          </TableHeader>
          <TableBody
          id="table-body"
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
          {/*{invoice.tasks.map( (row, index) => (
          <TableRow key={index} selected={row.selected}>
                <TableRowColumn colSpan="3"><DatePicker name={`date${index}`} defaultValue={row.date} disabled={!this.props.invoiceEdit} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField name={`hours${index}`} defaultValue={row.hoursSpent} disabled={!this.props.invoiceEdit}/></TableRowColumn>
                <TableRowColumn colSpan="5"><TextField name={`description${index}`} defaultValue={row.description} multiLine={true} disabled={!this.props.invoiceEdit}/></TableRowColumn>
                <TableRowColumn colSpan="1"><IconButton tooltip={this.props.invoiceEdit ? "Done" : "Edit"} touch={true} tooltipPosition="bottom-left" onTouchTap={() => this.props.handleInvoiceEdit()} children={this.props.invoiceEdit ? <i className="material-icons">&#xE876;</i> : <i className="material-icons">&#xE254;</i>} /></TableRowColumn>
              </TableRow>
              ))}>*/}

            <MuiEditableTable
              colSpec={colSpec}
              rowData={rowData}
              onChange={this.onChange}
              style={{textAlign: "left"}}
              editable={true}
              //reorderable={true}
          />

          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                 {/*{ this.props.invoiceEdit ?
                 <div>
                <RaisedButton label="Cancel" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} type="button" onTouchTap={() => this.props.handleInvoiceEdit()} />
                <RaisedButton label="Save" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} type="submit" form="invoice-add-form"/>
                </div>
                : false
                 }*/}
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4">Subtotal</TableRowColumn>
              <TableRowColumn colSpan="4">Tax</TableRowColumn>
              <TableRowColumn colSpan="4">Total</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                {/*<div>*/}
            <RaisedButton label="Cancel" backgroundColor='#fff' labelColor="#076" style={{margin: 10,}} type="button" onTouchTap={() => this.props.handleInvoiceView("invoiceList")} />
            <RaisedButton label="Save" backgroundColor='#076' labelColor="#fff" style={{margin: 10,}} type="submit" form="invoice-add-form"/>
        {/*</div>*/}
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        </form>
      </div>
);
    }
}

// export default ListExampleContacts;

function mapStateToProps(state) {
    return {
        cIndex: state.invoiceReducer.clientIndex,
        pIndex: state.invoiceReducer.projectIndex,
        iIndex: state.invoiceReducer.invoiceIndex,
        clients: state.clientReducer.clients,
        user: state.loginReducer.user,
        invoiceEdit: state.invoiceReducer.invoiceEdit,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      handleInvoiceEdit: actions.handleInvoiceEdit,
      handleInvoiceView: actions.handleInvoiceView,
      handleAddInvoice: actions.handleAddInvoice,
      handleUpdateInvoice: actions.handleUpdateInvoice,
      handleDeleteInvoice: actions.handleDeleteInvoice,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInvoice);