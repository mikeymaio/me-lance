// import { Chart } from 'react-google-charts';
import React from 'react';

import Divider from 'material-ui/Divider';
import PieChart from './charts/time-worked-pie.component';
import BarChart from './charts/time-to-income-bar.component';

import PieChart2 from './charts/pie';

import { fetchUserClients } from '../clients/clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {
    return (
      <div>
        <PieChart2 />
        <PieChart />
        <Divider style={{height: 3}} />
        <BarChart />
      </div>
    );
  }
}

// export default Dashboard;


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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);