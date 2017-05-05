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
      console.log(projectName, hours);
      return data.dataArray.push([projectName, hours]);
    })
  ))
  console.log('data = ' + data);
  // this.setState({data});
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
      <Chart
        chartType="PieChart"
        data={data.dataArray}
        options={this.state.options}
        graph_id="PieChart"
        width={'100%'}
        height={'400px'}
        //legend_toggle={false}
      />
      </div>
    );
  }
}
// export default PieChart;

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