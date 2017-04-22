
import React from 'react';

import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import {List, ListItem, makeSelectable} from 'material-ui/List';


import * as actions from './invoice.actions';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';


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

    this.formatDate = date => {
    return moment(date).format("MM/DD/YY")
}

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
            {/*{visibleInvoices.map( (row, index) => (*/}
            {this.props.clients.map( client => (
                client.projects.reverse().map( (project, index) => (
                   <Card key={index}>
                        <CardHeader
                        title={project.clientName}
                        subtitle={project.projectName}
                        //avatar="images/ok-128.jpg"
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                        <CardText expandable={true}
                        children={
                            <List>
                                {console.log(project.invoices)}
                                { project.invoices.reverse().map( (invoice, iIndex) => {
                                    return <ListItem
                                        key={iIndex}
                                        value={iIndex}
                                        primaryText={`${this.formatDate(invoice.billingPeriodStart)} - ${this.formatDate(invoice.billingPeriodEnd)}`}
                                        secondaryText={`Invoice#: ${invoice._id}`}
                                        rightIconButton={<IconButton tooltip="View Details" touch={true} tooltipPosition="bottom-left" children={<i className="material-icons">&#xE145;</i>} />}
                                        />
                                })}
                            </List>
                            }
                        />
                    </Card>
                ))
            ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
        clients: state.clientReducer.clients,
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