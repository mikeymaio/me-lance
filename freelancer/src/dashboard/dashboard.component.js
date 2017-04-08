import { Chart } from 'react-google-charts';
import React from 'react';

import Divider from 'material-ui/Divider';
import PieChart from './charts/time-worked-pie.component';
import BarChart from './charts/time-to-income-bar.component';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <PieChart />
        <Divider style={{height: 3}} />
        <BarChart />
      </div>
    );
  }
}
export default Dashboard;