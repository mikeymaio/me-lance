import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.component';
import SignUpModal from './signup-modal.component';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<div className="App-header">
        </div>*/}
        <Header />
        <div className="container" style={{backgroundColor: "white"}}>
          <SignUpModal />
        </div>
      </div>
    );
  }
}

export default App;
