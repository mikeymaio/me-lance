import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleNotification } from './notification.actions';

class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 3000,
      message: '',
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };



  handleRequestClose = () => {
    this.props.handleNotification();
  };

  render() {
    return (
        <Snackbar
          open={this.props.isNotificationOpen}
          message={this.props.message}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleRequestClose}
        />
    );
  }
}

function mapStateToProps(state) {
    return {
        isNotificationOpen: state.notificationReducer.isNotificationOpen,
        message: state.notificationReducer.message,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleNotification: handleNotification,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);