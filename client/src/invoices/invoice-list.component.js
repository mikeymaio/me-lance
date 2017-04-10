
import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';

import RaisedButton from 'material-ui/RaisedButton';

import InvoiceDetail from './invoice-detail.component';

import TextField from 'material-ui/TextField';

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
    id: '12321',
    client: 'John Smith',
    project: 'John\'s Website',
    date: '4/21/17',
    hours: '5',
    status: 'in progress',
  },
  {
    id: '12321',
    client: 'Sally Smith',
    project: 'Another website',
    date: '4/22/17',
    hours: '5',
    status: 'in progress',
  },
  {
    id: '12321',
    client: 'John Doe',
    project: 'another website',
    date: '4/23/17',
    hours: '5',
    status: 'completed',
  },
];

export default class ClientList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
    };
  }

  handleAddClient = () => {

  }

  render() {

    //   const clientDetailClass = classnames({'hide': })
    return (
      <div>
        <Table
        colSpan="12"
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
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                {/*<TableRowColumn>{row.id}</TableRowColumn>*/}
                <TableRowColumn colSpan="4"><TextField defaultValue={row.client} /></TableRowColumn>
                {/*<TableRowColumn>{row.company}</TableRowColumn>*/}
                {/*<TableRowColumn>{row.address}</TableRowColumn>*/}
                <TableRowColumn colSpan="4"><TextField defaultValue={row.project} /></TableRowColumn>
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
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                <RaisedButton label="New Invoice" backgroundColor='#007766' labelColor="white" style={{margin: 10,}} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

