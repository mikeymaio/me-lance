
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';

import RaisedButton from 'material-ui/RaisedButton';

// import InvoiceDetail from './invoice-detail.component';

import TextField from 'material-ui/TextField';

import {Card, CardHeader, CardText} from 'material-ui/Card';

// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';

import * as actions from './invoice.actions';

// import classnames from 'classnames';

// const styles = {
//   propContainer: {
//     width: 200,
//     overflow: 'hidden',
//     margin: '20px auto 0',
//   },
//   propToggleHeader: {
//     margin: '20px auto 10px',
//   },
// };


const tableData = [
  {
    date: '1/1/17',
    hours: '5.5',
    description: 'blahblahblah',
    status: 'in progress',
    _id: '123456789'
  },
  {
    date: '1/2/17',
    hours: '6',
    description: 'blahblahblah',
    status: 'in progress',
    _id: '123456788'
  },
  {
    date: '1/3/17',
    hours: '5',
    description: 'blahblahblah',
    status: 'complete',
    _id: '123456787'
  },
];

class InvoiceList extends React.Component {

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
      this.props.filterInvoices(filter)
    }} >
    {children}
    </a>
  );
};

const getVisibleInvoices = (
  invoices,
  filter
 ) => {
    switch(filter) {
      case 'SHOW_ALL':
        return invoices
      case 'SHOW_COMPLETED':
        return invoices.filter(
          i => i.completed
        )
      case 'SHOW_ACTIVE':
        return invoices.filter(
          i => !i.completed
        )
      default:
        return invoices
    }
  }

const visibleInvoices = getVisibleInvoices(
  this.props.invoices,
  this.props.invoiceFilter
)
    return (
      <div>
          <h3 style={{color: "#076", display: "inline-block"}}>Your Invoices</h3>
          <p>
          Show:
          <FilterLink
            filter="SHOW_ALL"
            >
            All
          </FilterLink>
          <FilterLink
            filter="SHOW_ACTIVE"
            >
            Active
          </FilterLink>
          <FilterLink
            filter="SHOW_COMPLETED"
            >
            Completed
          </FilterLink>
          </p>
            {visibleInvoices.map( (row, index) => (
                   <Card key={index}>
                    <CardHeader
                      title={row.client}
                      subtitle={row.project}
                      //avatar="images/ok-128.jpg"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true} 
                    children={
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
                Invoice #: {row._id}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="Billing Period" style={{textAlign: 'left'}}>
                Billing Period: <TextField name="billingPeriod" />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="The project name" style={{textAlign: 'left'}}>
                    Project Name: <TextField name="projectName" />
                </TableHeaderColumn>
                <TableHeaderColumn colSpan="6" tooltip="The project's ID no." style={{textAlign: 'left'}}>
                    Project Id:
                </TableHeaderColumn>
              </TableRow>
            <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your Name" style={{textAlign: 'left'}}>
                Name: <TextField name="yourName" />
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="The client's name" style={{textAlign: 'left'}}>
                Client Name: <TextField name="clientName" />
              </TableHeaderColumn>
              </TableRow>
              <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your address" style={{textAlign: 'left'}}>
                Adress: <TextField name="yourAddress" />
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="the client's address" style={{textAlign: 'left'}}>
                Client Address: <TextField name="clientAddress" />
              </TableHeaderColumn>
            </TableRow>
            <TableRow displayBorder={true} style={{borderTop: '2px solid #007766'}} >
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="Date worked">Date</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="Hours worked">Hours</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="Description of task">Description</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="The status of the task">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn colSpan="3"><TextField name={row.date} defaultValue={row.date} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField name={row.hours} defaultValue={row.hours} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField name={row.description} defaultValue={row.description} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField name={row.status} defaultValue={row.status} /></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                <RaisedButton label="Add Row" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} />
              </TableRowColumn>
            </TableRow>
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
                    }
                  />
              </Card>
            ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
        invoices: state.invoiceReducer.invoices,
        invoiceFilter: state.invoiceReducer.invoiceFilter,
        userId: state.loginReducer.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // fetchUserInvoices: actions.fetchUserInvoices,
        filterInvoices: actions.filterInvoices,
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);