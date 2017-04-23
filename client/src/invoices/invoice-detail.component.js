import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
// import TextField from 'material-ui/TextField';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './invoice.actions';

import moment from 'moment';

import EditTable from 'material-ui-table-edit';


const headers = [
  {value: 'Date', type: 'TextField', width: 200},
  {value: 'Hours Worked', type: 'TextField', width: 200},
  {value: 'Description', type: 'TextField', width: 200},
]

class InvoiceDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
    };

        this.formatDate = date => {
    return moment(date).format("MM/DD/YY")
}

  }


  render() {

    const client = this.props.clients[this.props.cIndex];
    const project = client.projects[this.props.pIndex];
    const invoice = project.invoices[this.props.iIndex];

    return (
      <div>
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
                Invoice #: {invoice._id}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="Billing Period" style={{textAlign: 'left'}}>
                Billing Period: {`${moment(invoice.billingPeriodStart).format("MM/DD/YY")} - ${moment(invoice.billingPeriodEnd).format("MM/DD/YY")}` }
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
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}} tooltip="Date worked">Date</TableHeaderColumn>
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}} tooltip="Hours worked">Hours</TableHeaderColumn>
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}} tooltip="Description of task">Description</TableHeaderColumn>
            </TableRow>*/}
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
          {/*{invoice.tasks.map( (row, index) => (*/}
          {/*<TableRow key={index} selected={row.selected}>
                <TableRowColumn colSpan="4"><TextField name={row.date} defaultValue={row.date} /></TableRowColumn>
                <TableRowColumn colSpan="4"><TextField name={row.hours} defaultValue={row.hoursSpent} /></TableRowColumn>
                <TableRowColumn colSpan="4"><TextField name={row.description} defaultValue={row.description} /></TableRowColumn>
                {/*<TableRowColumn colSpan="3"><TextField name={row.status} defaultValue={row.status} /></TableRowColumn>*/}
              {/*</TableRow>*/}
              {/*))}>*/}
          <EditTable
            headerColumns={headers}
            rows={invoice.tasks.map( row => (
              {columns: [
                {value: row.date},
                {value: row.hoursSpent},
                {value: row.description}
                ]}
            ))}>
            </EditTable>
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            {/*<TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                <RaisedButton label="Add Row" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} />
              </TableRowColumn>
            </TableRow>*/}
            <TableRow>
              <TableRowColumn colSpan="4">Subtotal</TableRowColumn>
              <TableRowColumn colSpan="4">Tax</TableRowColumn>
              <TableRowColumn colSpan="4">Total</TableRowColumn>
            </TableRow>
            {/*<TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>*/}
          </TableFooter>
        </Table>
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);