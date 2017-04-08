import { Chart } from 'react-google-charts';
import React from 'react';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        //width: 900,
          chart: {
            title: 'Time To Income Ratio',
            subtitle: 'time on the left, income on the right'
          },
          series: {
            0: { axis: 'time' }, // Bind series 0 to an axis named 'time'.
            1: { axis: 'income' } // Bind series 1 to an axis named 'income'.
          },
          axes: {
            y: {
              time: {label: 'hours'}, // Left y-axis.
              income: {side: 'right', label: '$'} // Right y-axis.
            }
          }
      },

      data:[
          ['Project', 'Time Spent', 'Income'],
          ['John Doe\'s Website', 9, 800],
          ['John Smith\'s Website', 6, 500],
          ['Sally Doe\'s Website', 4, 250],
          ['My Web App', 4, 0],
      ]
    }
  }
  render() {
    return (
      <Chart
        chartType="BarChart"
        //rows={this.state.rows}
        //columns={this.state.columns}
        data={this.state.data}
        options={this.state.options}
        graph_id="BarChart"
        width={'100%'}
        height={'400px'}
        //legend_toggle={false}
      />
    );
  }
}
export default BarChart;