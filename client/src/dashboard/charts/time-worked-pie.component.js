import { Chart } from 'react-google-charts';
import React from 'react';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Time Use',
        is3D: true,
      },
      data: [
          ['Task', 'Hours Worked'],
          ['John Doe\'s Website',     9],
          ['Sally Smiths\'s Website',      6],
          ['John Smith\'s Website',  2],
          ['My Web App', 4],
        ]

    };
  }
  render() {
    return (
      <Chart
        chartType="PieChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="PieChart"
        width={'100%'}
        height={'400px'}
        //legend_toggle={false}
      />
    );
  }
}
export default PieChart;