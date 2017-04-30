
import React from 'react';
import {Pie} from 'react-chartjs-2';

import { fetchUserClients } from '../../clients/clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const data = {
	labels: [],
	datasets: [{
		data: [],
		backgroundColor: [],
		// hoverBackgroundColor: []
	}]
};

const getData = clients => {
		data.labels = []
		data.datasets = [{data: [], backgroundColor: [], hoverBackgroundColor: []}]
		clients.map( client => (
    client.projects.map( project => {
      data.labels.push(project.projectName)
      let hours = 0;
      project.invoices.map( invoice => {
        invoice.tasks.map( task => (
          hours += task.hoursSpent
        ))
				let color = '#'+Math.floor(Math.random()*16777215).toString(16);
				return data.datasets[0].backgroundColor.push(color);
			})
      return data.datasets[0].data.push(hours);
    })
  ))
}

class PieChart2 extends React.Component {


  render() {
		getData(this.props.clients)
    return (
      <div>
        <h2>Time Usage</h2>
        <Pie data={data}
					width={100}
					height={100}
					options={{
        		maintainAspectRatio: false
    			}}
				/>
      </div>
    );
  }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PieChart2);