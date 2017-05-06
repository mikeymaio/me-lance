import React, { Component } from 'react';
// import { AppRegistry, StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import Stopwatch from './timer.component';
import RaisedButton from 'material-ui/RaisedButton';

import moment from 'moment';

import * as actions from './time-tracker.actions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeTrackerModal from './time-tracker-modal.component';

const options = {
  container: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
    width: 220,
    height: '100%',
    display: 'inline-block',
    color: '#076',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 7,
  }
};


class TimeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchReset: false,
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true}),
    this.props.handleClearStartTime(this.props.userId);
  }

  startTimer() {
    // this.toggleStopwatch();
    let startTime = new Date().getTime();
    // const time = moment.unix(startTime);
    console.log('startTime = '+startTime);
    // this.props.handleTimerStart(startTime);
    this.props.handleSaveStartTime(startTime, true, this.props.userId)

  }

  stopTimer() {
    // this.toggleStopwatch();
    let stopTime = new Date().getTime();
    // const time = moment.unix(stopTime);
    console.log('endTime = '+stopTime);
    this.props.handleSaveTimerStop(stopTime, false, this.props.userId);
    this.props.handleTimeModal();
  }

  render() {
    return (
      <div id={this.props.id} style={this.props.style} className="col-xs-12">
        <h4 style={{display: "inline-block", color: this.props.textColor, marginRight: 5}} >Timetracker</h4>
        <Stopwatch msecs start={this.props.user.timerRunning}
        startTime={this.props.user.timerStart}
          reset={this.state.stopwatchReset}
          options={options}/>
          {!this.props.user.timerRunning ?
        <RaisedButton label="Start" onTouchTap={this.startTimer} /> :
        <RaisedButton label="Stop" onTouchTap={this.stopTimer} />
          }
        <RaisedButton label="Reset" onTouchTap={this.resetStopwatch} />
        <TimeTrackerModal formId={this.props.formId} />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        timerStart: state.timeTrackerReducer.timerStart,
        timerStop: state.timeTrackerReducer.timerStop,
        userId: state.loginReducer.user.userId,
        user: state.loginReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleTimerStart: actions.handleTimerStart,
        handleTimerStop: actions.handleTimerStop,
        handleTimeModal: actions.handleTimeModal,
        handleSaveStartTime: actions.handleSaveStartTime,
        handleSaveTimerStop: actions.handleSaveTimerStop,
        handleClearStartTime: actions.handleClearStartTime,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracker);