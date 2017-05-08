import { Chart } from 'react-google-charts';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const data = { dataArray: [] }

const getData = clients => {
    data.dataArray = [
        ['Client', 'Income']
    ];
    clients.map(client => {
        let clientName = `${client.firstName} ${client.lastName}`
        let income = 0
        client.projects.map(project => {
            let rate = project.rate
            let hours = 0;
            project.invoices.map(invoice => (
                invoice.tasks.map(task => (
                    hours += task.hoursSpent
                ))
            ))
            return income += hours * rate;
        })
        return data.dataArray.push([clientName, income])
    })
    return data.dataArray;
}

class ClientProfitBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        //width: 900,
        colors: ['#076'],
          chart: {
            title: 'Most Profitable Clients',
            subtitle: 'time on the left, income on the right'
          },
          series: {
            0: { axis: 'income' } // Bind series 1 to an axis named 'income'.
          },
          axes: {
            y: {
              income: {label: '$'}
            }
          }
      },

      data:[]
    }
  }
  render() {
    getData(this.props.clients);
    return (
      <div className="col-xs-12">
        <Chart
          chartType="ColumnChart"
          //rows={this.state.rows}
          //columns={this.state.columns}
          data={data.dataArray}
          options={this.state.options}
          graph_id="ClientProfitBarChart"
          width={'100%'}
          height={'400px'}
          //legend_toggle={false}
        />
      </div>
    );
  }
}
// export default BarChart;

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
        // fetchUserClients: fetchUserClients,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfitBarChart);