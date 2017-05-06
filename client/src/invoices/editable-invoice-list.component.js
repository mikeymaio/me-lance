
import React from 'react';

import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

import {List, ListItem, makeSelectable} from 'material-ui/List';

import Divider from 'material-ui/Divider';


import * as actions from './invoice.actions';
import { fetchUserClients } from '../clients/clients.actions';

import IconButton from 'material-ui/IconButton';

import FilterLink from '../filter-link.component';

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

componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {

    return (
      <div>
          <h3 style={{color: "#076", display: "inline-block"}}>Your Invoices</h3>
          <p style={{color: '#076'}}>
            Show:
                <FilterLink
                    filter="SHOW_ALL"
                    currentFilter={this.props.invoiceFilter}
                    action={this.props.filterInvoices}
                    >
                    All
                </FilterLink>
                <FilterLink
                    filter="SHOW_ACTIVE"
                    currentFilter={this.props.invoiceFilter}
                    action={this.props.filterInvoices}
                    >
                    Active
                </FilterLink>
                <FilterLink
                    filter="SHOW_COMPLETED"
                    currentFilter={this.props.invoiceFilter}
                    action={this.props.filterInvoices}
                    >
                    Completed
                </FilterLink>
            </p>
            {this.props.clients.map( ( client, cIndex ) => (
                client.projects.map( (project, pIndex) => (
                   <Card
                    key={pIndex}
                    containerStyle={{padding: 0, paddingBottom: 0}}
                    >
                        <CardHeader
                        title={project.projectName}
                        subtitle={project.clientName}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                        <CardText expandable={true} className="cardText" style={{padding: 0}}
                        children={
                            <List className="list" style={{padding: 0}} >
                                <Divider />
                                { project.invoices.filter(i => {
                                    new Date(i.billingPeriodEnd) < new Date() ? i.completed = true : false;
                                    if (this.props.invoiceFilter === 'SHOW_ALL') {
                                        return true;
                                    }
                                    if (this.props.invoiceFilter === 'SHOW_ACTIVE') {
                                        return !i.completed;
                                    }
                                    if (this.props.invoiceFilter === 'SHOW_COMPLETED') {
                                        return i.completed;
                                    }
                                    return true;
                                })
                                .map( (invoice, iIndex) => {
                                    return (
                                        <div style={{padding: 0}}>
                                            <ListItem
                                                key={iIndex}
                                                value={iIndex}
                                                primaryText={`${this.formatDate(invoice.billingPeriodStart)} - ${this.formatDate(invoice.billingPeriodEnd)}`}
                                                secondaryText={`Invoice#: ${invoice.invoiceNo}`}
                                                rightIconButton={<IconButton tooltip="View Details" touch={true} tooltipPosition="bottom-left" onTouchTap={() => this.props.handleInvoiceView("invoiceDetail", cIndex, pIndex, iIndex)} children={<i className="material-icons">&#xE145;</i>} />}
                                                />
                                            <Divider inset={true} />
                                        </div>
                                        )
                                    }).sort(() => 1 )}
                                <CardActions className="cardActions" style={{padding: 10}}>
                                    <FlatButton
                                        label="New Invoice"
                                        style={{backgroundColor: '#076', color: '#fff', padding: 0}}
                                        onTouchTap={ () => this.props.handleInvoiceView("addInvoice", cIndex, pIndex)}
                                    />
                                </CardActions>
                            </List>
                            }
                        />
                        <Divider style={{backgroundColor: '#187'}} />
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
        handleInvoiceView: actions.handleInvoiceView,
        filterInvoices: actions.filterInvoices,
        fetchUserClients: fetchUserClients,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);