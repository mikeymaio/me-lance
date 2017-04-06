import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';

import RaisedButton from 'material-ui/RaisedButton';

import ClientDetail from './client-detail.component';

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
    name: 'John Smith',
    company: 'John Smith Inc',
    address: '123 Main St, Los Angeles CA 90026',
    email: 'email@email.com',
    phone: '555-555-5555',
  },
  {
    id: '12321',
    name: 'Sally Smith',
    company: 'Sally Smith Inc',
    address: '123 Main St, Los Angeles CA 90026',
    email: 'email@email.com',
    phone: '555-555-5555',
  },
  {
    id: '12321',
    name: 'John Doe',
    company: 'John Doe LLC',
    address: '123 Main St, Los Angeles CA 90026',
    email: 'email@email.com',
    phone: '555-555-5555',
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
                Your Clients
              </TableHeaderColumn>
            </TableRow>
            <TableRow displayBorder={true} style={{borderTop: '2px solid #007766'}} >
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>ID</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Name</TableHeaderColumn>
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Company</TableHeaderColumn>*/}
              {/*<TableHeaderColumn colSpan="2" style={{textAlign: 'left'}}>Address</TableHeaderColumn>*/}
              <TableHeaderColumn colSpan="4" style={{textAlign: 'left'}}>Email</TableHeaderColumn>
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
                <TableRowColumn colSpan="4">{row.name}</TableRowColumn>
                {/*<TableRowColumn>{row.company}</TableRowColumn>*/}
                {/*<TableRowColumn>{row.address}</TableRowColumn>*/}
                <TableRowColumn colSpan="4">{row.email}</TableRowColumn>
                {/*<TableRowColumn>{row.phone}</TableRowColumn>*/}
                <TableRowColumn colSpan="4">
                    <ClientDetail
                        id={row.id}
                        name={row.name}
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
              <TableRowColumn colSpan="6" style={{textAlign: 'center'}}>
                <RaisedButton label="Add Client" backgroundColor='#007766' labelColor="white" style={{margin: 10,}} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}
