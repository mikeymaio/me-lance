import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
// import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';

// import RaisedButton from 'material-ui/RaisedButton';

import ClientDetail from './client-detail.component';
import AddClient from './add-client.component';
// import classnames from 'classnames';


class ClientList extends React.Component {

  handleAddClient = () => {

  }

  render() {

    return (
      <div>
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
            displayRowCheckbox={false}
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={false}
          >
            {this.props.clients.map( (row, index) => (
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
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                <AddClient />
                {/*<RaisedButton label="Add Client" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} />*/}
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
        clients: state.clientReducer.clients
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);