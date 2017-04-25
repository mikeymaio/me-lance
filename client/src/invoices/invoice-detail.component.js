import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './invoice.actions';

import moment from 'moment';

import MuiEditableTable from '../editable-table.component';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const taxByState = [
{name: "Alabama", abbrev: "AL", tax: 4},
{name: "Alaska", abbrev: "AK", tax: 0},
{name: "Arizona", abbrev: "AZ", tax: 5.6},
{name: "Arkansas", abbrev: "AR", tax: 6.5},
{name: "California", abbrev: "CA", tax: 7.5},
{name: "Colorado", abbrev: "CO", tax: 2.9},
{name: "Connecticut", abbrev: "CT", tax: 6.35},
{name: "Delaware", abbrev: "DE", tax: 0},
{name: "District of Columbia", abbrev: "DC", tax: 5.75},
{name: "Florida", abbrev: "FL", tax: 6},
{name: "Georgia", abbrev: "GA", tax: 4},
{name: "Hawaii", abbrev: "HI", tax: 4},
{name: "Idaho", abbrev: "ID", tax: 6},
{name: "Illinois", abbrev: "IL", tax: 6.25},
// Indiana: 7,
// Iowa: 6,
// Kansas: 6.5,
// Kentucky: 6,
// Louisiana: 4,
// Maine: 5.5,
// Maryland: 6,
// Massachusetts: 6.25,
// Michigan: 6,
// Minnesota: 6.88,
// Mississippi: 7,
// Missouri: 4.23,
// Montana: 0,
// Nebraska: 5.5,
// Nevada: 6.85,
// New Hampshire: 0,
// New Jersey: 7
// New Mexico: 5.13
// New York: 4,
// North Carolina: 4.75
// North Dakota: 5,
// Ohio: 5.75,
// Oklahoma: 4.5
// Oregon: 0,
// Pennsylvania: 6,
// Puerto Rico: 6,
// Rhode Island: 7,
// South Carolina: 6,
// South Dakota: 4,
// Tennessee: 7,
// Texas: 6.25
// Utah: 5.95
// Vermont: 6,
// Virginia: 5.3,
// Washington: 6.5,
// West Virginia: 6,
// Wisconsin: 5,
// Wyoming: 4
]

const colSpec = [
    {title: 'Date', fieldName: 'date', inputType: "DatePicker", type: "date", width: 200},
    {title: 'Hours', fieldName: 'hoursSpent', inputType: "TextField", type: "number", width: 200},
    {title: 'Description', fieldName: 'description', inputType: "TextField", type: "text", width: 200},
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

        this.formatDate = date => {
    return moment(date).format("MM/DD/YY")
}

  this.onChange = (dataTable) => {
    console.log(dataTable)
    this.setState({dataTable})
};

this.handleTaxChange = (event, index, value) => this.setState({taxValue: value});

  this.formatPrice =  rate => {
        // const rateInCents = rate/100;
        return rate.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    }


    this.getTotal = (invoice, project) => {
            let hours = 0;
            invoice.tasks.map ( task => {
                task.hoursSpent ? hours += task.hoursSpent : hours += 0;
            })
            console.log(hours);
            let total = hours * project.rate;
            return total;
        }

}

componentDidMount() {
  const client = this.props.clients[this.props.cIndex];
  const project = client.projects[this.props.pIndex];
  const invoice = project.invoices[this.props.iIndex];

  invoice.tax ? this.setState({taxValue: invoice.tax}) : false;

  this.setState({dataTable: invoice.tasks});
}

  render() {

    const client = this.props.clients[this.props.cIndex];
    const project = client.projects[this.props.pIndex];
    const invoice = project.invoices[this.props.iIndex];

    return (
      <div>
        <div style={{margin: 10, height: 30}}>
        <a
          href="#"
          style={{paddingTop: 5, float: "left", color: "#076"}}
          onClick={e => {
          e.preventDefault();
          this.props.handleInvoiceView("invoiceList")
          }} >
          back
        </a>
        </div>

        {/*<FlatButton label="<- Back" backgroundColor='#fff' labelColor="#076" style={{margin: 10, float: "left"}} onTouchTap={() => this.props.handleInvoiceView("invoiceList")} />*/}

        <form id="invoice-update-form" onSubmit={ event => {
          event.preventDefault();
            let tasks = this.state.dataTable;
            let clientId = client.clientId;
            let projectId = project._id;
            let invoiceId = invoice._id
            let userId = this.props.user.userId
            let tax = this.state.taxValue
            console.log(tasks);

            this.props.handleUpdateInvoice(tasks, tax, userId, clientId, projectId, invoiceId)
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
              rowData={invoice.tasks.map( row => {
                return {date: row.date,
                hoursSpent: row.hoursSpent,
                description: row.description}
              })}
              onChange={this.onChange}
              style={{textAlign: "left"}}
              //reorderable={true}
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
              <TableRowColumn colSpan="4"><p style={{fontSize: 16}}>{this.formatPrice(this.getTotal(invoice, project))}</p></TableRowColumn>
              <TableRowColumn colSpan="4">
                <SelectField value={this.state.taxValue} onChange={this.handleTaxChange} style={{width: 120, height:45, lineHeight: 50, margin: 0, padding: 0, display: "static"}}>
                    { taxByState.map( state => {
                        return <MenuItem value={state.tax} label={`${state.tax}%`} primaryText={state.abbrev} />
                    })}
                </SelectField>
              </TableRowColumn>
              <TableRowColumn colSpan="4"><p style={{fontSize: 16}}><strong>{this.formatPrice((this.getTotal(invoice, project) * (this.state.taxValue / 100)) + this.getTotal(invoice, project))}</strong></p></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                { this.props.invoiceEdit ?
                <div>
                  <RaisedButton label="Cancel" backgroundColor='#fff' labelColor="#076" style={{margin: 10,}} type="button" onTouchTap={() => this.props.handleInvoiceEdit()} />
                  <RaisedButton label="Save" backgroundColor='#076' labelColor="#fff" style={{margin: 10,}} type="submit" form="invoice-update-form"/>
                  <RaisedButton label="Delete" backgroundColor='#007766' labelColor="#fff" style={{margin: 10, float:"right"}} type="button" onTouchTap={() => this.props.handleDeleteInvoice(this.props.user.userId, client.clientId, project._id, invoice._id)} />
                </div>
                :
                <div>
                  <RaisedButton label="Edit" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} onTouchTap={() => this.props.handleInvoiceEdit()}/>
                </div>
        }
              </TableRowColumn>
            </TableRow>
            {/*<TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>*/}
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
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);