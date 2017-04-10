import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiEditableTable from "mui-editable-table";

import RaisedButton from 'material-ui/RaisedButton';

// import ProjectDetail from './project-detail.component';

// import classnames from 'classnames';






class ProjectListEditable extends React.Component {


  render() {

      const shouldBeReadOnly = function(rowData) {
          return rowData['title'] != 'Mrs';
      };

    const colSpec = [
        {title: 'Name', fieldName: 'name', inputType: "TextField", width: '100%'},
        {title: 'Client', fieldName: 'client', inputType: "TextField", width: '100%'},
        {title: 'Details', fieldName: 'details', inputType: "TextField", width: '100%'},
        // {title: 'Phone No.', fieldName: 'phone', inputType: "TextField", width: 100},
        // {title: 'Address', fieldName: 'address', inputType: "TextField", width: 100},
        // {title: 'Employed', fieldName: 'employed', inputType: "Toggle", width: 100}
    ];

    const rowData = this.props.projects;

    const onChange = (dataTable) => {
        console.log(dataTable)
    };

    //   const clientDetailClass = classnames({'hide': })
    return (
      <div>
        <MuiEditableTable
            colSpec={colSpec}
            rowData={rowData}
            onChange={onChange}
            reorderable={true}
        />
        <RaisedButton label="Add Project" backgroundColor='#007766' labelColor="white" style={{margin: 10,}} />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // isAddClientModalOpen: state.clientReducer.isAddClientModalOpen,
        projects: state.projectReducer.projects
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleAddClientModal: actions.handleAddClientModal,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListEditable);