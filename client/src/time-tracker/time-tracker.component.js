import React, { Component } from 'react';
// import { AppRegistry, StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import Stopwatch from './timer.component';
import RaisedButton from 'material-ui/RaisedButton';

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
    color: '#076',
    marginLeft: 7,
  }
};


export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchReset: false,
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }


  render() {
    return (
      <div style={this.props.style}>
        <h4 style={{display: "inline-block", color: "#076", marginRight: 10}} >Timetracker</h4>
        <Stopwatch msecs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}/>
        <RaisedButton label={!this.state.stopwatchStart ? "Start" : "Stop"} onTouchTap={this.toggleStopwatch} />
        <RaisedButton label="Reset" onTouchTap={this.resetStopwatch} />
      </div>
    );
  }
}