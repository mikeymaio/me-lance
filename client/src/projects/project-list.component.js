import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import ProjectDetail from './project-detail.component';

// import classnames from 'classnames';

const tableData = [
  {
    id: '12321',
    name: 'John Smith\'s Website',
    client: 'John Smith',
    company: 'John Smith Inc',
    address: '123 Main St, Los Angeles CA 90026',
    email: 'email@email.com',
    phone: '555-555-5555',
    budget: '$5,000.00',
    hoursWorked: 7,
    deadline: '5/16/17'
  },
  {
    id: '12321',
    name: 'Sally\'s Website',
    client: 'Sally Smith',
    company: 'Sally Smith Inc',
    address: '123 Main St, Los Angeles CA 90026',
    email: 'email@email.com',
    phone: '555-555-5555',
    budget: '$3,000.00',
    hoursWorked: 7,
    deadline: '6/1/17'
  },
  {
    id: '12321',
    name: 'John Doe\'s Website',
    client: 'John Doe',
    company: 'John Doe LLC',
    address: '123 Main St, Los Angeles CA 90026',
    email: 'email@email.com',
    phone: '555-555-5555',
    budget: '$10,000.00',
    hoursWorked: 9,
    deadline: '6/21/17'
  },
];

export default class ProjectList extends React.Component {

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
                Your Projects
              </TableHeaderColumn>
            </TableRow>
            <TableRow displayBorder={true} style={{borderTop: '2px solid #007766'}} >
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>ID</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Name</TableHeaderColumn>
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Company</TableHeaderColumn>*/}
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Address</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Client</TableHeaderColumn>
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Phone</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Details</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            id="project-list"
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                {/*<TableRowColumn>{row.id}</TableRowColumn>*/}
                <TableRowColumn colSpan="4">{row.name}</TableRowColumn>
                {/*<TableRowColumn>{row.company}</TableRowColumn>*/}
                {/*<TableRowColumn>{row.address}</TableRowColumn>*/}
                <TableRowColumn colSpan="4">{row.client}</TableRowColumn>
                {/*<TableRowColumn>{row.phone}</TableRowColumn>*/}
                <TableRowColumn colSpan="4">
                    <ProjectDetail
                        id={row.id}
                        name={row.name}
                        budget={row.budget}
                        deadline={row.deadline}
                        hoursWorked={row.hoursWorked}
                        client={row.client}
                        company={row.company}
                        address={row.address}
                        email={row.email}
                        phone={row.phone}
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
                <RaisedButton label="Add Project" backgroundColor='#007766' labelColor="white" style={{margin: 10,}} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

