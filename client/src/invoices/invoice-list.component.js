
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';

import RaisedButton from 'material-ui/RaisedButton';

import InvoiceDetail from './invoice-detail.component';

import TextField from 'material-ui/TextField';

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




class InvoiceList extends React.Component {


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
        {/*<SelectField
            value={0}
            onChange={this.props.filterInvoices}
            floatingLabelText="Filter"
            floatingLabelFixed={true}
          >
            <MenuItem key={0} value={0} primaryText="All" />
            {this.props.invoices.map( (invoice, index) => (
            <MenuItem key={index + 1} value={index + 1} primaryText={`${invoice.client}`} />
          ))}
          </SelectField>*/}
        <Table
        colSpan="12"
          height="300px"
          fixedHeader={true}
          fixedFooter={false}
          selectable={true}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="12" style={{textAlign: 'center'}}>
                Your Invoices
              </TableHeaderColumn>
            </TableRow>
            <TableRow displayBorder={true} style={{borderTop: '2px solid #007766'}} >
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>ID</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Client</TableHeaderColumn>
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Company</TableHeaderColumn>*/}
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Address</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Project</TableHeaderColumn>
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Phone</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Details</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            id="client-list"
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={false}
          >
            {visibleInvoices.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                {/*<TableRowColumn>{row.id}</TableRowColumn>*/}
                <TableRowColumn colSpan="4"><TextField name="clientName" defaultValue={row.client} /></TableRowColumn>
                {/*<TableRowColumn>{row.company}</TableRowColumn>*/}
                {/*<TableRowColumn>{row.address}</TableRowColumn>*/}
                <TableRowColumn colSpan="4"><TextField name="projectName" defaultValue={row.project} /></TableRowColumn>
                {/*<TableRowColumn>{row.phone}</TableRowColumn>*/}
                <TableRowColumn colSpan="4">
                    <InvoiceDetail
                        id={row.id}
                        client={row.client}
                        project={row.project}
                        date={row.date}
                        hours={row.hours}
                        status={row.status}
                    />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                <RaisedButton label="New Invoice" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
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