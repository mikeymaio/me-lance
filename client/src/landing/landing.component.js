import React, {Component} from 'react';

// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import LoginModal from '../login/login-modal.component';

import * as actions from '../header/header.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import LoggedToggle from '../demo-toggle-temp';


class Landing extends Component {

  render() {
    return (
      <div>
      <div className="container-fluid" style={{backgroundColor: '#007766', color: 'white',
                  height: 500,
                  padding: 20}}>
                  <div className="pull-left"><h4>Freelancer</h4></div>
                  <div className="pull-right"><LoginModal /></div>
                  <div className="col-xs-12" style={{textAlign: 'center', marginTop: 20}}>
                    <h1>Boost Your Productivity Today!</h1>
                    {/*<img src="https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.economywatch.com%2Ffiles%2Fimagecache%2Fstory%2Fstory%2Fproductivity_4.jpg&f=1" style={{height: '50%', width: '50%'}}/>*/}
                  </div>
      </div>
      <div className="container-fluid" style={{
        //backgroundColor: '#007766', color: 'white',
                  height: 500,
                  padding: 20,}}>
                  {/*<LoggedToggle />*/}
                  <p style={{textAlign: 'center'}}>Description of application here...(with images, icons, links, etc...)</p>
      </div>
      </div>
    );
  }
}

// export default Header;


function mapStateToProps(state) {
    return {
        // isModalOpen: state.headerReducer.isModalOpen,
        // isDrawerOpen: state.headerReducer.isDrawerOpen,
        isLoading: state.headerReducer.isLoading,
        isLoggedIn: state.headerReducer.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleSession: actions.handleSession,
        // handleModal: actions.handleModal,
        // handleDrawer: actions.handleDrawer,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

