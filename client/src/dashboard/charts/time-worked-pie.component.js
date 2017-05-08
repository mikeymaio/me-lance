import { Chart } from 'react-google-charts';
import React from 'react';

import { fetchUserClients } from '../../clients/clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const data = { dataArray: [] }

const getData = clients => {
	  data.dataArray = [['Task', 'Hours Worked']];
    clients.map( client => (
    client.projects.map( project => {
      let projectName = project.projectName;
      let hours = 0;
      project.invoices.map( invoice => (
        invoice.tasks.map( task => (
          hours += task.hoursSpent
        ))
      ))
      return data.dataArray.push([projectName, hours]);
    })
  ))
}


class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Time Use',
        titleTextStyle: {
        color: '#076',
        fontName: 'sans-serif',
        fontSize: 16,
        },
        legend: { textStyle: {color: '#076', fontSize: 14}},
        is3D: false,
      },
    };
  }


  render() {
    getData(this.props.clients);
    return (
      <div className="col-xs-12">
      {data.dataArray.length === 1 ?
      <p style={{marginTop: '25%'}} > You don't have any active projects</p> :
      <Chart
        chartType="PieChart"
        data={data.dataArray}
        options={this.state.options}
        graph_id="PieChart"
        width={'100%'}
        height={'400px'}
      />
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        clients: state.clientReducer.clients,
        clientEdit: state.clientReducer.clientEdit,
        isLoading: state.clientReducer.isLoading,
        userId: state.loginReducer.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserClients: fetchUserClients,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);