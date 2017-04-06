import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

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

export default class InvoiceTable extends React.Component {

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

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
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
                Invoice #:
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="Billing Period" style={{textAlign: 'left'}}>
                Billing Period:
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn colSpan="6" tooltip="The project name" style={{textAlign: 'left'}}>
                    Project Name:
                </TableHeaderColumn>
                <TableHeaderColumn colSpan="6" tooltip="The project's ID no." style={{textAlign: 'left'}}>
                    Project Id:
                </TableHeaderColumn>
              </TableRow>
            <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your Name" style={{textAlign: 'left'}}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="The client's name" style={{textAlign: 'left'}}>
                Client Name:
              </TableHeaderColumn>
              </TableRow>
              <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Your address" style={{textAlign: 'left'}}>
                Adress:
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" tooltip="the client's address" style={{textAlign: 'left'}}>
                Client Address:
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
                <TableRowColumn>{row.date}</TableRowColumn>
                <TableRowColumn>{row.hours}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}
