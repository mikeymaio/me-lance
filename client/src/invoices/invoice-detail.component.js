import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './invoice.actions';

import moment from 'moment';

import MuiEditableTable from '../editable-table.component';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

import taxByState from '../tax-by-state';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import './invoice.css';


  const formatDate = date => {
    return moment(date).format("MM/DD/YY")
}

const colSpec = [
    {title: 'Date', fieldName: 'date', inputType: "DatePicker", formatDate: formatDate,  width: "25%"},
    {title: 'Hours', fieldName: 'hoursSpent', inputType: "TextField", width: "25%"},
    {title: 'Description', fieldName: 'description', inputType: "TextField", width: "25%"},
];

// const dataSourceConfig = {
//   text: 'abbrev',
//   value: 'tax',
// };

class InvoiceDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
      dataTable: [],
      taxValue: 0,
    };



// this.download = invoice => {
// const doc = new jsPDF('l','pt','c6');

//     doc.setFontSize(22);

//     var specialElementHandlers = {
//         '#invoice-editor-btns': function (element, renderer) {
//             return true;
//         }
//     };
//     const source = document.getElementById('invoice-update-form')
//         doc.fromHTML(source.innerHTML, 15, 15, {
//             'width': 170,
//             'elementHandlers': specialElementHandlers
//         });
//         doc.save(`invoice${invoice._id}.pdf`);
//   }




  this.onChange = (dataTable) => {
      console.log(dataTable)
      this.setState({dataTable})
  };

  this.handleTaxChange = (event, index, value) => this.setState({taxValue: value});


  this.formatPrice =  rate => {
        // const rateInCents = rate/100;
        return rate.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2});
    }



    this.getTotal = (invoice, project) => {
      console.log(project.ratePer)
      if (project.ratePer === "hr") {
        let hours = 0;
        invoice.tasks.map ( task => {
            task.hoursSpent ? hours += Number(task.hoursSpent) : hours += 0;
        })
        console.log(hours);
        let total = hours * project.rate;
        return total;
      } else if (project.ratePer === "fixed price") {
          return project.rate;
      }
    }

        this.save = this.save.bind(this);
        this.saveToComputer = this.saveToComputer.bind(this);

}

    saveToComputer() {
        this.save('save');
    }
    save(method) {

        if (!navigator.onLine) {
            console.warn('No active internet connection!');
            return false;
        }

        // const gadget = new cloudprint.Gadget();
        const name = 'invoice';
        const a4 = {
            width: 595.28,
            height: 841.89
        };
        const element = document.querySelector('#invoice-update-form');
        const cache_width = element.style.width;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const zoomFactor = 1.33333;

        //RETINA
        const originalWidth = element.offsetWidth;
        const originalHeight = element.offsetHeight;
        const scaledCanvas = document.createElement('canvas');
        const scaledContext = scaledCanvas.getContext('2d');

        // document.body.classList.add('print-preview');
        element.style.width = (a4.width * zoomFactor) + 'px';
        element.style.height = (a4.height * zoomFactor) + 'px';

        //RETINA
        element.style.width = originalWidth + "px";
        element.style.height = originalHeight + "px";
        element.style.position = 'absolute';
        element.style.top = '0';
        element.style.left = '0';

        scaledCanvas.width = originalWidth * 2;
        scaledCanvas.height = originalHeight * 2;
        scaledCanvas.style.width = originalWidth + 'px';
        scaledCanvas.style.height = originalHeight + 'px';

        scaledContext.webkitImageSmoothingEnabled = false;
        scaledContext.mozImageSmoothingEnabled = false;
        scaledContext.imageSmoothingEnabled = false;
        scaledContext.scale(2, 2);

        html2canvas(element, {
          onrendered: function(canvas) {
            window.print(canvas);
          },
            imageTimeout: 2000,
            removeContainer: true,
            canvas: scaledCanvas
        })
        // .then((canvas) => {
        //     // Has to be JPEG since PNG crashes jsPDF
        //     // https://github.com/MrRio/jsPDF/issues/702
        //     var img = canvas.toDataURL('image/jpeg');
        //     pdf.addImage(img, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
        //     pdf.save(name + '.pdf');

        // });

        // element.style.position = 'relative';
        // element.style.width = cache_width;

        // document.body.classList.remove('print-preview');
    }


componentDidMount() {
  const client = this.props.clients[this.props.cIndex];
  const project = client.projects[this.props.pIndex];
  const invoice = project.invoices[this.props.iIndex];

  invoice.tax ? this.setState({taxValue: invoice.tax}) : false;

  this.setState({dataTable: invoice.tasks});
}

  render() {

    const client = this.props.clients[this.props.cIndex];
    const project = client.projects[this.props.pIndex];
    const invoice = project.invoices[this.props.iIndex];

    return (
      <div style={{width: '100%'}}>
        <div style={{margin: 0, width: "100%", height: 40, position: "relative", zIndex: 2000}}>
          <FlatButton label="<- Back" backgroundColor='transparent' style={{margin: 0, float: "left"}} onTouchTap={() =>      this.props.handleInvoiceView("invoiceList")}
          />
          <RaisedButton label="Export" backgroundColor='#fff' labelColor="#076" style={{margin: 0, float: "right"}}           onTouchTap={this.saveToComputer}
          />
        </div>



        <form id="invoice-update-form" onSubmit={ event => {
          event.preventDefault();
            let tasks = this.state.dataTable;
            let clientId = client.clientId;
            let projectId = project._id;
            let invoiceId = invoice._id
            let userId = this.props.user.userId
            let tax = this.state.taxValue
            console.log(tasks);

            this.props.handleUpdateInvoice(tasks, tax, userId, clientId, projectId, invoiceId)
          } } >

        <h1 className="print-only" style={{color: "#076", textAlign: "left"}} >{ this.props.user.company ? this.props.user.company : `${this.props.user.firstName} ${this.props.user.lastName}`}</h1>

        <Table
          //height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          wrapperStyle={{width: "100%"}}
        >
          <TableHeader
            //style={{borderBottom: '3px solid #007766'}}
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >

            <TableRow>
              <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                Invoice #: {invoice.invoiceNo}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                Billing Period: {`${moment(invoice.billingPeriodStart).format("MM/DD/YY")} - ${moment(invoice.billingPeriodEnd).format("MM/DD/YY")}` }
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
                <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                    Project Name: {project.projectName}
                </TableHeaderColumn>
                <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                    Project Id: {project._id}
                </TableHeaderColumn>
              </TableRow>
            <TableRow>
              <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                Name: {`${this.props.user.firstName} ${this.props.user.lastName}`}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                Client Name: {project.clientName}
              </TableHeaderColumn>
              </TableRow>
              <TableRow>
              <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                Address: {this.props.user.address}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                Client Address: {client.address}
              </TableHeaderColumn>
            </TableRow>
            {/*<TableRow displayBorder={true} style={{borderTop: '2px solid #007766'}} >
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="Date worked">Date</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'left'}} tooltip="Hours worked">Hours</TableHeaderColumn>
              <TableHeaderColumn colSpan="5" style={{textAlign: 'left'}} tooltip="Description of task">Description</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={{textAlign: 'left'}} tooltip="Edit"></TableHeaderColumn>
            </TableRow>*/}
          </TableHeader>
          <TableBody
          id="table-body"
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
          {/*{invoice.tasks.map( (row, index) => (
          <TableRow key={index} selected={row.selected}>
                <TableRowColumn colSpan="3"><DatePicker name={`date${index}`} defaultValue={row.date} disabled={!this.props.invoiceEdit} /></TableRowColumn>
                <TableRowColumn colSpan="3"><TextField name={`hours${index}`} defaultValue={row.hoursSpent} disabled={!this.props.invoiceEdit}/></TableRowColumn>
                <TableRowColumn colSpan="5"><TextField name={`description${index}`} defaultValue={row.description} multiLine={true} disabled={!this.props.invoiceEdit}/></TableRowColumn>
                <TableRowColumn colSpan="1"><IconButton tooltip={this.props.invoiceEdit ? "Done" : "Edit"} touch={true} tooltipPosition="bottom-left" onTouchTap={() => this.props.handleInvoiceEdit()} children={this.props.invoiceEdit ? <i className="material-icons">&#xE876;</i> : <i className="material-icons">&#xE254;</i>} /></TableRowColumn>
              </TableRow>
              ))}>*/}

            <MuiEditableTable
              colSpec={colSpec}
              rowData={invoice.tasks.map( (row, index) => {
                return {date: new Date(row.date) || new Date(),
                hoursSpent: row.hoursSpent ? row.hoursSpent.toString() : '0',
                description: row.description,
                key: index}
              })
              }
              onChange={this.onChange}
              style={{textAlign: "left"}}
              editable={this.props.invoiceEdit}
              //reorderable={true}
          />

          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="4">Subtotal</TableRowColumn>
              <TableRowColumn colSpan="4">Tax</TableRowColumn>
              <TableRowColumn colSpan="4"><strong>Total</strong></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="4"><p style={{fontSize: 16}}>{this.formatPrice(this.getTotal(invoice, project))}</p></TableRowColumn>
              <TableRowColumn colSpan="4">
                {/*<AutoComplete
                  //floatingLabelText="Same text, different values"
                  filter={AutoComplete.fuzzyFilter}
                  openOnFocus={true}
                  dataSource={taxByState}
                  dataSourceConfig={dataSourceConfig}
                  //anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                  //targetOrigin={{ vertical: 'bottom', horizontal: 'center',}}
                />*/}
                <SelectField
                  value={this.state.taxValue}
                  onChange={this.handleTaxChange}
                  disabled={!this.props.invoiceEdit}
                  underlineDisabledStyle={{display: "none"}}
                  labelStyle={{color: "#076"}}
                  maxHeight={200}
                  style={{width: 120, height:45, lineHeight: 50, margin: 0, padding: 0, display: "static"}}>
                      { taxByState.map( (state, index) => {
                          return <MenuItem value={state.tax} label={`${state.tax}%`} primaryText={state.abbrev} key={index} />
                      })}
                </SelectField>
              </TableRowColumn>
              <TableRowColumn colSpan="4"><p style={{fontSize: 16}}><strong>{this.formatPrice((this.getTotal(invoice, project) * (this.state.taxValue / 100)) + this.getTotal(invoice, project))}</strong></p></TableRowColumn>
            </TableRow>
            <TableRow id="no-print">
              <TableRowColumn id="invoice-editor-btns" colSpan="12" style={{textAlign: 'center'}}>
                { this.props.invoiceEdit ?
                <div>
                  <RaisedButton label="Cancel" backgroundColor='#fff' labelColor="#076" style={{margin: 10,}} type="button" onTouchTap={() => this.props.handleInvoiceEdit()} />
                  <RaisedButton label="Save" backgroundColor='#076' labelColor="#fff" style={{margin: 10,}} type="submit" form="invoice-update-form"/>
                  <RaisedButton label="Delete" backgroundColor='#007766' labelColor="#fff" style={{margin: 10, float:"right"}} type="button" onTouchTap={() => this.props.handleDeleteInvoice(this.props.user.userId, client.clientId, project._id, invoice._id)} />
                </div>
                :
                <div>
                  <RaisedButton label="Edit" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} onTouchTap={() => this.props.handleInvoiceEdit()}/>
                </div>
        }
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                Please transfer the amount within 30 days
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        </form>
        {/*{ this.props.invoiceEdit ?
                <div>
                  <RaisedButton label="Cancel" backgroundColor='#fff' labelColor="#076" style={{margin: 10,}} type="button" onTouchTap={() => this.props.handleInvoiceEdit()} />
                  <RaisedButton label="Save" backgroundColor='#076' labelColor="#fff" style={{margin: 10,}} type="submit" form="invoice-update-form"/>
                  <RaisedButton label="Delete" backgroundColor='#007766' labelColor="#fff" style={{margin: 10, float:"right"}} type="button" onTouchTap={() => this.props.handleDeleteInvoice(this.props.user.userId, client.clientId, project._id, invoice._id)} />
                </div>
                :
                <div>
                  <RaisedButton label="Edit" backgroundColor='#007766' labelColor="#fff" style={{margin: 10,}} onTouchTap={() => this.props.handleInvoiceEdit()}/>
                </div>
        }*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        cIndex: state.invoiceReducer.clientIndex,
        pIndex: state.invoiceReducer.projectIndex,
        iIndex: state.invoiceReducer.invoiceIndex,
        clients: state.clientReducer.clients,
        user: state.loginReducer.user,
        invoiceEdit: state.invoiceReducer.invoiceEdit,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      handleInvoiceEdit: actions.handleInvoiceEdit,
      handleInvoiceView: actions.handleInvoiceView,
      handleUpdateInvoice: actions.handleUpdateInvoice,
      handleDeleteInvoice: actions.handleDeleteInvoice,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);