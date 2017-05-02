import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './charts.actions';

const style = {
  display: 'inline-block',
  margin: 0,
  padding: 0,
  height: 400,
};

class ChartsMenu extends React.Component {
    render() {
        return (
            <Paper style={style} className={this.props.className}>
            <Menu>
                <MenuItem primaryText="Time Use" onTouchTap={() => this.props.handleStatsView('TIME_USE')}/>
                <MenuItem primaryText="Time Vs Income" onTouchTap={() => this.props.handleStatsView('TIME_VS_INCOME')}/>
                <MenuItem primaryText="Hours Per Day" onTouchTap={() => this.props.handleStatsView('HRS_PER_DAY')}/>
            </Menu>
            </Paper>
        )
    }
}


// export default ChartsMenu;

function mapStateToProps(state) {
    return {
        // isLoginModalOpen: state.loginReducer.isLoginModalOpen,
        // loginModalSlideIndex: state.loginReducer.loginModalSlideIndex,
        user: state.loginReducer.user,
        statsView: state.chartsReducer.statsView,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // fetchDataFromApi: fetchDataFromApi,
        handleStatsView: actions.handleStatsView,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartsMenu);