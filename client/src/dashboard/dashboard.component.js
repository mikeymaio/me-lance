// import { Chart } from 'react-google-charts';
import React from 'react';

import Divider from 'material-ui/Divider';
import PieChart from './charts/time-worked-pie.component';
import BarChart from './charts/time-to-income-bar.component';

import PieChart2 from './charts/pie';

import ChartsMenu from './charts/charts-menu.component';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

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
  },
};

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };


  this.handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  }
  componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          tabItemContainerStyle={{background: '#fff'}}
        >
          <Tab label="Rundown" value={0} buttonStyle={{color: '#076'}}/>
          <Tab label="Stats" value={1} buttonStyle={{color: '#076'}} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          style={{maxHeight: 400, background: "#fff"}}
        >
          <div style={styles.slide}>
            <p>Here's the deal...</p>
          </div>
          <div style={styles.slide}>
            {/*<div>*/}
              <ChartsMenu className="col-xs-3"
              //autoWidth={false} width="100%" listStyle={{width: '0.01%'}} style={{width:'100%'}}
              />
              { this.props.statsView === 'TIME_USE' ?
              <PieChart /> : false
              }
              { this.props.statsView === 'TIME_VS_INCOME' ?
              <BarChart /> : false
              }
              { this.props.statsView === 'HRS_PER_DAY' ?
              <PieChart2 /> : false
              }
            {/*</div>*/}
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
        // clientEdit: state.clientReducer.clientEdit,
        // isLoading: state.clientReducer.isLoading,
        statsView: state.chartsReducer.statsView,
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
