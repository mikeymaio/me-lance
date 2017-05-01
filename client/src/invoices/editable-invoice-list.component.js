
import React from 'react';

import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

import {List, ListItem, makeSelectable} from 'material-ui/List';


import * as actions from './invoice.actions';
import { fetchUserClients } from '../clients/clients.actions';

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

componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {

    const FilterLink = ({
        filter,
        currentFilter,
        children
    }) => {
        if (filter === currentFilter) {
            return <span style={{marginLeft: '5px', color: "#aaa"}}>{children}</span>;
        }
        return (
            <a href="#"
            style={{marginLeft: '5px', color: "#076"}}
            onClick={e => {
            e.preventDefault();
            this.props.filterInvoices(filter)
            }} >
            {children}
            </a>
        );
    };

    // const getVisibleInvoices = (
    //     invoices,
    //     filter
    //     ) => {
    //         switch(filter) {
    //         case 'SHOW_ALL':
    //             return invoices
    //         case 'SHOW_COMPLETED':
    //             return invoices.filter(
    //             i => i.completed
    //             )
    //         case 'SHOW_ACTIVE':
    //             return invoices.filter(
    //             i => !i.completed
    //             )
    //         default:
    //             return invoices
    //         }
    // }

    // const visibleInvoices = getVisibleInvoices(
    //     this.props.invoices,
    //     this.props.invoiceFilter
    // )

    return (
      <div>
          <h3 style={{color: "#076", display: "inline-block"}}>Your Invoices</h3>
          <p style={{color: '#076'}}>
            Show:
                <FilterLink
                    filter="SHOW_ALL"
                    currentFilter={this.props.invoiceFilter}
                    >
                    All
                </FilterLink>
                <FilterLink
                    filter="SHOW_ACTIVE"
                    currentFilter={this.props.invoiceFilter}
                    >
                    Active
                </FilterLink>
                <FilterLink
                    filter="SHOW_COMPLETED"
                    currentFilter={this.props.invoiceFilter}
                    >
                    Completed
                </FilterLink>
            </p>
            {/*{visibleInvoices.map( (row, index) => (*/}
            {this.props.clients.map( ( client, cIndex ) => (
                client.projects.map( (project, pIndex) => (
                   <Card key={pIndex}>
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
                                { project.invoices.filter(i => {
                                    new Date(i.billingPeriodEnd) < new Date() ? i.completed = true : false;
                                    console.log(i);
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
                                    return <ListItem
                                        key={iIndex}
                                        value={iIndex}
                                        primaryText={`${this.formatDate(invoice.billingPeriodStart)} - ${this.formatDate(invoice.billingPeriodEnd)}`}
                                        secondaryText={`Invoice#: ${invoice.invoiceNo}`}
                                        rightIconButton={<IconButton tooltip="View Details" touch={true} tooltipPosition="bottom-left" onTouchTap={() => this.props.handleInvoiceView("invoiceDetail", cIndex, pIndex, iIndex)} children={<i className="material-icons">&#xE145;</i>} />}
                                        />
                                }).sort(() => 1 )}
                                <CardActions>
                                    <FlatButton label="New Invoice" onTouchTap={ () => this.props.handleInvoiceView("addInvoice", cIndex, pIndex)} />
                                </CardActions>
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
        handleInvoiceView: actions.handleInvoiceView,
        filterInvoices: actions.filterInvoices,
        fetchUserClients: fetchUserClients,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);