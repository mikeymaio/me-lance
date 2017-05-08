import React from 'react';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import MuiEditableTable from '../editable-table.component';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './invoice.actions';

import moment from 'moment';

import taxByState from '../tax-by-state';

import './invoice.css';

  const formatDate = date => {
    return moment(date).format("MM/DD/YY")
}

const colSpec = [
    {title: 'Date', fieldName: 'date', inputType: "DatePicker", formatDate: formatDate,  width: "25%"},
    {title: 'Hours', fieldName: 'hoursSpent', inputType: "TextField", width: "25%"},
    {title: 'Description', fieldName: 'description', inputType: "TextField", width: "25%"},
];

class InvoiceDetail extends React.Component {

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
      taxValue: 0,
    };

  this.onChange = (dataTable) => {
      this.setState({dataTable})
  };

  this.handleTaxChange = (event, index, value) => this.setState({taxValue: value});

  this.formatPrice =  rate => {
        return rate.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    }

    this.getTotal = (invoice, project) => {
      if (project.ratePer === "hr") {
        let hours = 0;
        invoice.tasks.map ( task => {
            return task.hoursSpent ? hours += Number(task.hoursSpent) : hours += 0;
        })
        let total = hours * project.rate;
        return total;
      } else if (project.ratePer === "fixed price") {
          return project.rate;
      }
    }

        this.save = this.save.bind(this);

}

  save() {
      if (!navigator.onLine) {
          console.warn('No active internet connection!');
          return false;
      }
      const element = document.querySelector('#invoice-update-form');
      window.print(element);
  }


componentDidMount() {
  const client = this.props.clients[this.props.cIndex];
  const project = client.projects[this.props.pIndex];
  const invoice = project.invoices[this.props.iIndex];

  if (invoice.tax) {
    this.setState({taxValue: invoice.tax})
  }
  this.setState({dataTable: invoice.tasks});
}

  render() {

    const client = this.props.clients[this.props.cIndex];
    const project = client.projects[this.props.pIndex];
    const invoice = project.invoices[this.props.iIndex];

    return (
      <div style={{width: '100%'}}>
        <div style={{margin: 0, width: "100%", height: 40, position: "relative", zIndex: 2000}}>
          <FlatButton
            label="<- Back"
            backgroundColor='transparent'
            style={{margin: 0, float: "left"}}
            onTouchTap={() => this.props.handleInvoiceView("invoiceList")}
          />
          <RaisedButton
            label="Export"
            backgroundColor='#fff'
            labelColor="#076"
            style={{margin: 0, float: "right"}}
            onTouchTap={this.save}
          />
        </div>
        <form id="invoice-update-form" onSubmit={ event => {
          event.preventDefault();
          let tasks = this.state.dataTable;
          let clientId = client.clientId;
          let projectId = project._id;
          let invoiceId = invoice._id
          let userId = this.props.user.userId
          let tax = this.state.taxValue

          this.props.handleUpdateInvoice(tasks, tax, userId, clientId, projectId, invoiceId)
          }} >

          <h1
            className="print-only"
            style={{color: "#076", textAlign: "left"}}>
              { this.props.user.company ? this.props.user.company : `${this.props.user.firstName} ${this.props.user.lastName}`}
          </h1>

          <Table
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            wrapperStyle={{width: "100%", marginBottom: '20px'}}
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
                  Invoice #: {invoice.invoiceNo}
                </TableHeaderColumn>
                <TableHeaderColumn
                  colSpan="6"
                  style={{textAlign: 'left'}}>
                  Billing Period: {`${moment(invoice.billingPeriodStart).format("MM/DD/YY")} - ${moment(invoice.billingPeriodEnd).format("MM/DD/YY")}` }
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                  <TableHeaderColumn
                    colSpan="6"
                    style={{textAlign: 'left'}}>
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
                rowData={invoice.tasks.map( (row, index) => {
                  return {date: new Date(row.date) || new Date(),
                  hoursSpent: row.hoursSpent ? row.hoursSpent.toString() : '0',
                  description: row.description,
                  key: index}
                })
                }
                onChange={this.onChange}
                style={{textAlign: "left"}}
                editable={this.props.invoiceEdit}
              />
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn colSpan="4">Subtotal</TableRowColumn>
                <TableRowColumn colSpan="4">Tax</TableRowColumn>
                <TableRowColumn colSpan="4"><strong>Total</strong></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan="4">
                  <p style={{fontSize: 16}}>{this.formatPrice(this.getTotal(invoice, project))}</p>
                </TableRowColumn>
                <TableRowColumn colSpan="4">
                  <SelectField
                    value={this.state.taxValue}
                    onChange={this.handleTaxChange}
                    disabled={!this.props.invoiceEdit}
                    underlineDisabledStyle={{display: "none"}}
                    labelStyle={{color: "#076"}}
                    maxHeight={200}
                    style={{width: 120, height:45, lineHeight: 50, margin: 0, padding: 0, display: "static"}}>
                        { taxByState.map( (state, index) => {
                            return <MenuItem value={state.tax} label={`${state.tax}%`} primaryText={state.abbrev} key={index} />
                        })}
                  </SelectField>
                </TableRowColumn>
                <TableRowColumn colSpan="4"><p style={{fontSize: 16}}><strong>{this.formatPrice((this.getTotal(invoice, project) * (this.state.taxValue / 100)) + this.getTotal(invoice, project))}</strong></p></TableRowColumn>
              </TableRow>
              <TableRow id="no-print">
                <TableRowColumn
                  id="invoice-editor-btns"
                  colSpan="12"
                  style={{textAlign: 'center'}}>
                  { this.props.invoiceEdit ?
                  <div>
                    <RaisedButton
                      label="Cancel"
                      backgroundColor='#fff'
                      labelColor="#076"
                      style={{margin: 10,}}
                      type="button"
                      onTouchTap={() => this.props.handleInvoiceEdit()} />
                    <RaisedButton
                      label="Save"
                      backgroundColor='#076'
                      labelColor="#fff"
                      style={{margin: 10}}
                      type="submit"
                      form="invoice-update-form"/>
                    <RaisedButton
                      label="Delete"
                      backgroundColor='#007766'
                      labelColor="#fff"
                      style={{margin: 10, float:"right"}}
                      type="button"
                      onTouchTap={() => this.props.handleDeleteInvoice(this.props.user.userId, client.clientId, project._id, invoice._id)} />
                  </div>
                  :
                  <div>
                    <RaisedButton
                      label="Edit"
                      backgroundColor='#007766'
                      labelColor="#fff"
                      style={{margin: 10}}
                      onTouchTap={() => this.props.handleInvoiceEdit()}/>
                  </div>
          }
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn
                  colSpan="12"
                  style={{textAlign: 'center', paddingBottom: '12px'}}>
                  Please transfer the amount within 30 days
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
      handleUpdateInvoice: actions.handleUpdateInvoice,
      handleDeleteInvoice: actions.handleDeleteInvoice,
    },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);