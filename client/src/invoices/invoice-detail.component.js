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

import * as actions from './invoices.actions';

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
  },
  {
    date: '1/2/17',
    hours: '6',
    description: 'blahblahblah',
    status: 'in progress',
  },
  {
    date: '1/3/17',
    hours: '5',
    description: 'blahblahblah',
    status: 'complete',
  },
];

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
  }

  actionButtons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleInvoiceDetailModal}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleInvoiceDetailModal}
      />,
    ];

  render() {

    return (
      <div>
        <FlatButton label="+" style={{margin: 'auto', width: '50%'}} onTouchTap={this.props.handleInvoiceDetailModal}/>
        <Dialog
          title="Invoice Details"
          actions={this.actionButtons}
          modal={true}
          //open={this.props.isDetailModalOpen}
          //onRequestClose={this.props.handleInvoiceDetailModal}
          open={this.props.isDetailModalOpen}
          //onRequestClose={}
          autoScrollBodyContent={true}>
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
                Invoice #:
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="Billing Period" style={{textAlign: 'left'}}>
                Billing Period: <TextField />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="The project name" style={{textAlign: 'left'}}>
                    Project Name: <TextField />
                </TableHeaderColumn>
                <TableHeaderColumn colSpan="6" tooltip="The project's ID no." style={{textAlign: 'left'}}>
                    Project Id:
                </TableHeaderColumn>
              </TableRow>
            <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your Name" style={{textAlign: 'left'}}>
                Name: <TextField />
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="The client's name" style={{textAlign: 'left'}}>
                Client Name: <TextField />
              </TableHeaderColumn>
              </TableRow>
              <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your address" style={{textAlign: 'left'}}>
                Adress: <TextField />
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="the client's address" style={{textAlign: 'left'}}>
                Client Address: <TextField />
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
                <TableRowColumn colSpan="3"><TextField value={row.date} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField value={row.hours} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField value={row.description} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField value={row.status} /></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                <RaisedButton label="Add Row" backgroundColor='#007766' labelColor="white" style={{margin: 10,}} />
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
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isDetailModalOpen: state.invoiceReducer.isDetailModalOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleInvoiceDetailModal: actions.handleInvoiceDetailModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);