// import { Chart } from 'react-google-charts';
import React from 'react';

import Divider from 'material-ui/Divider';
import PieChart from './charts/time-worked-pie.component';
import BarChart from './charts/time-to-income-bar.component';

import PieChart2 from './charts/pie';

import LineChart from './charts/time-per-day-line.component';

import ClientProitBarCHart from './charts/most-profitable-clients.component';

import ChartsMenu from './charts/charts-menu.component';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import { handleDashboardSlides } from './dashboard.actions';
import { fetchUserClients } from '../clients/clients.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 0,
    overflow: 'hidden',
  },
  button: {
    color: '#076'
  },
  tab: {
    wordBreak: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal'
  }
};

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {
    return (
      <div style={{marginBottom: 20}}>
        <Tabs
          onChange={this.props.handleDashboardSlides}
          value={this.props.dashboardSlideIndex}
          //onChange={this.handleChange}
          //value={this.state.slideIndex}
          tabItemContainerStyle={{background: '#fff'}}
        >
          <Tab label="Time Use" value={0} buttonStyle={styles.button} style={styles.tab} />
          {/*<Tab label="Time to Income" value={1} buttonStyle={styles.button} style={styles.tab} />*/}
          <Tab label="Client Profit" value={1} buttonStyle={styles.button} style={styles.tab} />
        </Tabs>
        <SwipeableViews
          index={this.props.dashboardSlideIndex}
          onChangeIndex={this.props.handleDashboardSlides}
          style={{maxHeight: 400, background: "#fff"}}
        >
          <div style={styles.slide}>
            <PieChart />
          </div>
          {/*<div style={styles.slide}>
            <LineChart />
          </div>*/}
          <div style={styles.slide}>
            <ClientProitBarCHart />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

// export default Dashboard;


function mapStateToProps(state) {
    return {
        clients: state.clientReducer.clients,
        dashboardSlideIndex: state.dashboardReducer.dashboardSlideIndex,
        // clientEdit: state.clientReducer.clientEdit,
        // isLoading: state.clientReducer.isLoading,
        statsView: state.chartsReducer.statsView,
        userId: state.loginReducer.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserClients: fetchUserClients,
        handleDashboardSlides: handleDashboardSlides,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
