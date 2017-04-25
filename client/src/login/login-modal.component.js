import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

// import SignUp from './signup-stepper.component';

import * as actions from './login.actions';

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
    //padding: 10,
  },
  paper: {
    height: 150,
  //width: '45%',
  //margin: 'auto',
  padding: 5,
  textAlign: 'center',
  backgroundColor: '#eee'
  }
};

class LoginModal extends React.Component {

//       componentDidMount() {
//     this.props.fetchDataFromApi()
//   }

  render() {

    const actionButtons =
    this.props.loginModalSlideIndex === 0 ?
    [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleLoginModal}
      />,
      <FlatButton
        label="Submit"
        form="login-form"
        type="submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleLoginModal}
      />,
    ] :
    [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleLoginModal}
      />,
      <FlatButton
        label="Submit"
        form="signup-form"
        type="submit"
        primary={true}
        keyboardFocused={true}
        //onTouchTap={this.props.handleLoginModal}
      />,
      // <button type="submit" form="sign-form">SignUp</button>
    ];

    return (
      <div>
        <FlatButton label="Login / Demo Account" style={{color: '#fff'}} onTouchTap={this.props.handleLoginModal}/>
        <Dialog
          actions={actionButtons}
          modal={false}
          open={this.props.isLoginModalOpen}
          onRequestClose={this.props.handleLoginModal}
          autoScrollBodyContent={true}
          bodyStyle={{padding: 1}}
        >
        <Tabs
          onChange={this.props.handleLoginSlides}
          value={this.props.loginModalSlideIndex}
        >
          <Tab label="Login" value={0} />
          <Tab label="Sign Up" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.props.loginModalSlideIndex}
          onChangeIndex={this.props.handleLoginSlides}
        >
          <div style={styles.slide}>
            {/*<h2 style={styles.headline}>Log In</h2>*/}
            <Paper
            className="col-xs-6 col-xs-offset-3"
            style={styles.paper}
            zDepth={2}
              children={
              <h3
              //className="col-xs-9 col-xs-offset-3"
              >To demo the app, log in with<br />username: demo<br />password: demo123</h3>
              } />
              { this.props.isLoading ?
            <CircularProgress style={{position: 'absolute', left: '47%', top: '45%', zIndex: 500}} size={60} thickness={7} />
            : false }
      <form id="login-form" onSubmit={(event) => {
            event.preventDefault()

            let userName = event.target.username.value
            let password = event.target.password.value

            this.props.handleLogin(userName, password)

            event.target.username.value = ''
            event.target.password.value = ''
          }}>
            <TextField
              id="username"
              name="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your username"
              errorText="This field is required"
            /><br />
            <TextField
              id="password"
              name="password"
              type="password"
              floatingLabelText="Password"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your password"
              errorText="This field is required"
            />
            </form>
          </div>
          <div style={styles.slide}>
            {/*<SignUp />*/}
            {/*<Paper
            className="col-xs-6 col-xs-offset-3"
            style={styles.paper}
            zDepth={2}
              children={
              <CircularProgress size={60} thickness={7} />
              } />*/}
              { this.props.isLoading ?
              <CircularProgress style={{position: 'absolute', left: '147%', top: '45%', zIndex: 500}} size={60} thickness={7} />
              : false }
            <form id="signup-form" onSubmit={(event) => {
            event.preventDefault()

            let userName = event.target.username.value
            let password = event.target.password.value
            let passwordConfirm = event.target.passwordConfirm.value
            let email = event.target.email.value

            this.props.handleSignUp(userName, password, passwordConfirm, email)

            event.target.username.value = ''
            event.target.password.value = ''
            event.target.passwordConfirm.value = ''
            event.target.email.value = ''
          }}>
            <TextField
              id="username"
              name="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your username"
              errorText="This field is required"
            /><br />
            <TextField
              id="password"
              name="password"
              type="password"
              floatingLabelText="Password"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your password"
              errorText="This field is required"
            />
            <TextField
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              floatingLabelText="Confirm Password"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="re-enter your password"
              errorText="This field is required"
            /><br />
            <TextField
              id="email"
              name="email"
              floatingLabelText="Email"
              floatingLabelFixed={true}
              className="col-xs-9 col-xs-offset-3"
              hintText="enter your email"
              errorText="This field is required"
            />
            </form>
          </div>
        </SwipeableViews>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isLoginModalOpen: state.loginReducer.isLoginModalOpen,
        loginModalSlideIndex: state.loginReducer.loginModalSlideIndex,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleLoginModal: actions.handleLoginModal,
        handleLoginSlides: actions.handleLoginSlides,
        fetchDataFromApi: actions.fetchDataFromApi,
        handleLogin: actions.handleLogin,
        handleSignUp: actions.handleSignUp
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);


