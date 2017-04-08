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
      rows: [
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7],
      ],
      columns: [
        {
          type: 'string',
          label: 'Age',
        },
        {
          type: 'number',
          label: 'Weight',
        },
      ],

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
        //rows={this.state.rows}
        //columns={this.state.columns}
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