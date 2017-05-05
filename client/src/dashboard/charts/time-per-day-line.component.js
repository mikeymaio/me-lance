import { Chart } from 'react-google-charts';
import React from 'react';

import { fetchUserClients } from '../../clients/clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

const data = { dataArray: [] }


// const data = { dataArray: [ [new Date(2014, 0),  5],
//         [new Date(2014, 1),   .4],
//         [new Date(2014, 2),   7],
//         [new Date(2014, 3),  2.9],
//         [new Date(2014, 4),  6.3],
//         [new Date(2014, 5),    9],
//         [new Date(2014, 6), 10.6],
//         [new Date(2014, 7), 10.3],
//         [new Date(2014, 8),  7.4],
//         [new Date(2014, 9),  4.4],
//         [new Date(2014, 10), 1.1],
//         [new Date(2014, 11), 2]
//         ] }

// const getData = clients => {
//     const userData = [];
//     clients.map( client => {
//     client.projects.map( project => (
//       project.invoices.map( invoice => (
//         invoice.tasks.map( task => {
//             let hours = 0;
//             let date = task.date;
//             hours += task.hoursSpent
//           return userData.push([ moment(date).format("ll"), hours ]);
//         })
//       ))
//     )
//   )
//   return data.dataArray = userData
// }
// )
//     console.log(data.dataArray);
// }

const getData = clients => {
	  // data.dataArray = [['Time Spent', 'Income']];
    clients.map( client => (
    client.projects.map( project => {
      let projectName = project.projectName;
      let rate = project.rate
      let hours = 0;
      project.invoices.map( invoice => (
        invoice.tasks.map( task => (
          hours += task.hoursSpent
        ))
    ))
      console.log(projectName, hours);
      if (project.ratePer === "hr") {
        return data.dataArray.push([projectName, hours, hours * rate]);
      } if (project.ratePer === "fixed price") {
        return data.dataArray.push([projectName, hours, rate]);
      }
      return data.dataArray;
    })
  ))
  console.log('data = ' + data);
  // this.setState({data});
}

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Time to Income',
        color: '#076',
        titleTextStyle: {
        color: '#076',
        fontName: 'sans-serif',
        fontSize: 16,
        hAxis: { title: 'Hours'},
        vAxis: { title: 'Income'},
        },
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Hours'},
          1: {axis: 'Income'}
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Hours: {label: 'Hours Worked'},
            Income: {label: '$'}
          }
        }
      },
    };
  }


  render() {
    getData(this.props.clients);
    return (
      <div className="col-xs-12">
      <Chart
        chartType="LineChart"
        //data={data.dataArray}
        rows={data.dataArray}
        columns={[{type:"string", label: "Project"}, {type:'number', label:'Hours'},
{type:'number', label:"Income Earned"},
//{type:'number', label:"Average Hours of Daylight"}
]}
        options={this.state.options}
        graph_id="LineChart"
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

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);


//       google.charts.load('current', {'packages':['line', 'corechart']});
//       google.charts.setOnLoadCallback(drawChart);

//     function drawChart() {

//       var button = document.getElementById('change-chart');
//       var chartDiv = document.getElementById('chart_div');

//       var data = new google.visualization.DataTable();
// ('date', 'Month');
// ('number', "Average Temperature");
// ('number', "Average Hours of Daylight");

//       data.addRows([
//         [new Date(2014, 0),  -.5,  5.7],
//         [new Date(2014, 1),   .4,  8.7],
//         [new Date(2014, 2),   .5,   12],
//         [new Date(2014, 3),  2.9, 15.3],
//         [new Date(2014, 4),  6.3, 18.6],
//         [new Date(2014, 5),    9, 20.9],
//         [new Date(2014, 6), 10.6, 19.8],
//         [new Date(2014, 7), 10.3, 16.6],
//         [new Date(2014, 8),  7.4, 13.3],
//         [new Date(2014, 9),  4.4,  9.9],
//         [new Date(2014, 10), 1.1,  6.6],
//         [new Date(2014, 11), -.2,  4.5]
//       ]);

//       var materialOptions = {
//         chart: {
//           title: 'Average Temperatures and Daylight in Iceland Throughout the Year'
//         },
//         width: 900,
//         height: 500,
//         series: {
//           // Gives each series an axis name that matches the Y-axis below.
//           0: {axis: 'Temps'},
//           1: {axis: 'Daylight'}
//         },
//         axes: {
//           // Adds labels to each axis; they don't have to match the axis names.
//           y: {
//             Temps: {label: 'Temps (Celsius)'},
//             Daylight: {label: 'Daylight'}
//           }
//         }
//       };

//       var classicOptions = {
//         title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
//         width: 900,
//         height: 500,
//         // Gives each series an axis that matches the vAxes number below.
//         series: {
//           0: {targetAxisIndex: 0},
//           1: {targetAxisIndex: 1}
//         },
//         vAxes: {
//           // Adds titles to each axis.
//           0: {title: 'Temps (Celsius)'},
//           1: {title: 'Daylight'}
//         },
//         hAxis: {
//           ticks: [new Date(2014, 0), new Date(2014, 1), new Date(2014, 2), new Date(2014, 3),
//                   new Date(2014, 4),  new Date(2014, 5), new Date(2014, 6), new Date(2014, 7),
//                   new Date(2014, 8), new Date(2014, 9), new Date(2014, 10), new Date(2014, 11)
//                  ]
//         },
//         vAxis: {
//           viewWindow: {
//             max: 30
//           }
//         }
//       };

//       function drawMaterialChart() {
//         var materialChart = new google.charts.Line(chartDiv);
//         materialChart.draw(data, materialOptions);
//         button.innerText = 'Change to Classic';
//         button.onclick = drawClassicChart;
//       }

//       function drawClassicChart() {
//         var classicChart = new google.visualization.LineChart(chartDiv);
//         classicChart.draw(data, classicOptions);
//         button.innerText = 'Change to Material';
//         button.onclick = drawMaterialChart;
//       }

//       drawMaterialChart();

//     }