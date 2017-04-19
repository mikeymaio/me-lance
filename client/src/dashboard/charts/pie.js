
import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF0900',
		'#007766',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#55ccbb',
		'#FFCE56'
		]
	}]
};

export default class PieChart2 extends React.Component {

  render() {
    return (
      <div>
        <h2>Pie Example</h2>
        <Pie data={data} />
      </div>
    );
  }
};