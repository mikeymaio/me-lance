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
    this.setState({dataTable})
  };

}

  render() {

    const client = this.props.clients[this.props.cIndex];
    const project = client.projects[this.props.pIndex];

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
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn
                  colSpan="6"
                  style={{textAlign: 'left'}}>
                  Invoice #: {project.invoices.length + 1}
                </TableHeaderColumn>
                <TableHeaderColumn
                  colSpan="6"
                  style={{textAlign: 'left'}}>
                  Billing Period: <DatePicker
                                    name="billingPeriodStart"
                                    hintText="From"
                                    container="inline"
                                    mode="landscape"
                                    autoOk={true}
                                    firstDayOfWeek={0}
                                  />
                                  -
                                  <DatePicker
                                    name="billingPeriodEnd"
                                    hintText="To"
                                    container="inline"
                                    mode="landscape"
                                    autoOk={true}
                                    firstDayOfWeek={0}
                                  />
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                  <TableHeaderColumn
                    colSpan="6"
                    style={{textAlign: 'left'}}
                  >
                      Project Name: {project.projectName}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    colSpan="6"
                    style={{textAlign: 'left'}}>
                      Project Id: {project._id}
                  </TableHeaderColumn>
                </TableRow>
              <TableRow>
                <TableHeaderColumn
                  colSpan="6"
                  style={{textAlign: 'left'}}>
                  Name: {`${this.props.user.firstName} ${this.props.user.lastName}`}
                </TableHeaderColumn>
                <TableHeaderColumn
                  colSpan="6"
                  style={{textAlign: 'left'}}>
                  Client Name: {project.clientName}
                </TableHeaderColumn>
                </TableRow>
                <TableRow>
                <TableHeaderColumn
                  colSpan="6"
                  style={{textAlign: 'left'}}>
                  Address: {this.props.user.address}
                </TableHeaderColumn>
                <TableHeaderColumn
                  colSpan="6"
                  style={{textAlign: 'left'}}>
                  Client Address: {client.address}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
            id="table-body"
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              <MuiEditableTable
                colSpec={colSpec}
                rowData={rowData}
                onChange={this.onChange}
                style={{textAlign: "left"}}
                editable={true}
              />
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn
                  colSpan="12"
                  style={{textAlign: 'center'}}>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan="4">Subtotal</TableRowColumn>
                <TableRowColumn colSpan="4">Tax</TableRowColumn>
                <TableRowColumn colSpan="4">Total</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn
                  colSpan="12"
                  style={{textAlign: 'center'}}>
                  <RaisedButton
                    label="Cancel"
                    backgroundColor='#fff'
                    labelColor="#076"
                    style={{margin: 10,}}
                    type="button"
                    onTouchTap={() => this.props.handleInvoiceView("invoiceList")}
                  />
                  <RaisedButton
                    label="Save"
                    backgroundColor='#076'
                    labelColor="#fff"
                    style={{margin: 10,}}
                    type="submit"
                    form="invoice-add-form"
                  />
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </form>
      </div>
    );
  }
}

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
    },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInvoice);