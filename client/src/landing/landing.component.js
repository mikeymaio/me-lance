import React, {Component} from 'react';
import SignUp from '../login/signup.component';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import LoginModal from '../login/login-modal.component';

// import * as actions from '../header/header.actions';
import * as actions from '../login/login.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Scroll from 'react-scroll';
import RaisedButton from 'material-ui/RaisedButton';

// import LoggedToggle from '../demo-toggle-temp';

import './landing.css';

const Link       = Scroll.Link;
const DirectLink = Scroll.DirectLink;
const Element    = Scroll.Element;
const Events     = Scroll.Events;
const scroll     = Scroll.animateScroll;
const scrollSpy  = Scroll.scrollSpy;

const durationFn = function(deltaTop) {
    return deltaTop;
};

const styles = {
  link: {
    color: '#fff',
  }
}

class Landing extends Component {
   constructor (props){
      super(props);
      this.scrollToTop = this.scrollToTop.bind(this);
  }


componentDidMount() {

    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });

    scrollSpy.update();

  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <div style={{backgroundColor: '#eee'}} >
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation" style={{backgroundColor: "#076", border: "none"}}>
			<div className="container-fluid">
         <div className="navbar-header">
           <Link className="pull-left logo" style={{lineHeight: 3.15, color: '#fff', textDecoration: 'none', fontSize: 16, marginRight: 35}} onClick={this.scrollToTop}>Freelancer</Link>
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    </div>

    {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul className="nav navbar-nav" style={{display: 'block', margin: 'auto', width: '85%'}}>
                <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} activeClass="active" to="about" spy={true} smooth={true} duration={500} >About</Link></li>
                <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} activeClass="active" to="timetracker" spy={true} smooth={true} duration={500}>TimeTracker</Link></li>
                <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} activeClass="active" to="invoice" spy={true} smooth={true} duration={500} >Invoices</Link></li>
                <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} onTouchTap={() => {
              this.props.handleLoginModal(),
              this.props.handleLoginSlides(1);
            }
              }>Sign Up</Link></li>
                <li className="login-link" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} ><LoginModal /></Link></li>
				</ul>
        {/*<div className="pull-right" style={{lineHeight: 3.6}}><LoginModal label="Login / Demo Account"/></div>*/}
			</div>
      </div>
		</nav>
  {/*</div>*/}

      {/*<div className="container-fluid" style={{backgroundColor: '#007766', color: 'white',
                  //height: 500,
                  paddingTop: 20
                  }}
                  >
                  <div className="pull-left"><h4>Freelancer</h4></div>
                  <div className="pull-right"><LoginModal /></div>
                  <div className="col-xs-12" style={{textAlign: 'center', marginTop: 20}}>
                    {/*<h1>Boost Your Productivity Today!</h1>*/}
                    {/*<img src="https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.economywatch.com%2Ffiles%2Fimagecache%2Fstory%2Fstory%2Fproductivity_4.jpg&f=1" style={{height: '50%', width: '50%'}}/>*/}
                  {/*</div>*/}

      {/*</div>*/}
      <div>
      <img src="https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.skipprichard.com%2Fwp-content%2Fuploads%2F2012%2F05%2FI-love-my-job.jpg&f=1" 
           style={{width: '100%', height: 500, maxWidth: 975, display: 'block', margin: 'auto'}}
      />

      <div style={{height: 100, width: '75%', backgroundColor: 'rgba(0, 119, 102, 0.5)', position: 'absolute', top: '15%', left: '10%'}}>
        <h1 style={{position: "relative", color: '#eee', textAlign: 'center', fontWeight: 'bold', marginTop: 29}}>Boost Your Productivity Today!</h1>
      </div>
      </div>
      <div className="container-fluid" style={{padding: 20,}}>

        <Element name="about" className="element col-xs-8 col-offset-xs-2" style={{margin: 10, padding: '70px 40px 70px 40px', display: 'block', width: '100%', border: '5px solid #076'}} >
          <img src="http://thetrendguys.com/wp-content/uploads/2012/09/Happy-Person-at-Work.jpg"
           style={{width: '60%', height: '40%', float: 'right', paddingLeft: 20}}
          />
          <p>Keep track of your progress with customized charts</p>
        </Element>

        <Element name="timetracker" className="element col-xs-8 col-offset-xs-2" style={{margin: 10, padding: '70px 40px 70px 40px', display: 'block', width: '100%', border: '5px solid #076'}} >
          <img
            src="http://i1076.photobucket.com/albums/w459/michaelmaio22/Screen%20Shot%202017-05-06%20at%205.58.15%20PM_zpsymcq2brg.png~original"
            style={{width: '60%', height: '60%', float: 'left', paddingRight: 20}}
          />
        <p>Description of TimeTracker here...(with images, icons, links, etc...) jflskjfsldfkjslfkjsflskfjskjh sghlkd jghghskgh dlskghjgl kjhsglksjghlk djghdgdsgd gdgsdgsdg dsgdsgd gsdgdgdggdsgdgdgd gdgdgdgg</p>
        </Element>

        <Element name="invoice" className="element col-xs-8 col-offset-xs-2" style={{margin: 10, padding: '70px 40px 70px 40px', display: 'block', width: '100%', border: '5px solid #076'}} >
           <img src="http://i1076.photobucket.com/albums/w459/michaelmaio22/Screen%20Shot%202017-05-03%20at%208.26.04%20PM_zpschkqnrps.png~original"
           style={{width: '60%', height: '60%', float: 'right', paddingLeft: 20}}
          />
          <p>Description of invoices here...(with images, icons, links, etc...) jflskjfsldfkjslfkjsflskfjskjh sghlkd jghghskgh dlskghjgl kjhsglksjghlk djghdgdsgd gdgsdgsdg dsgdsgd gsdgdgdggdsgdgdgd gdgdgdgg</p>
        </Element>

        <Element name="signup" className="element col-xs-8 col-offset-xs-2" style={{margin: 10, padding: '70px 40px 70px 40px', display: 'block', width: '100%', border: '5px solid #076'}}>
          {/*<SignUp />*/}
          <div style={{width: '75%', margin: 'auto', paddingLeft: 40, textAlign: 'center'}}>
            <h4 style={{color: '#076'}} >What are you waiting for?</h4>
            <RaisedButton
              label="Join Now"
              labelStyle={{color: '#fff'}}
              buttonStyle={{backgroundColor: '#076'}}
              style={{lineHeight: 0}}
              onTouchTap={() => {
              this.props.handleLoginModal(),
              this.props.handleLoginSlides(1);
            }
              } />
          </div>
          {/*<p>Join Now!</p>
          <RaisedButton label="Login / Demo Account" style={{color: '#fff'}} onTouchTap={this.props.handleLoginModal}/>*/}
        </Element>
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
        // handleSession: actions.handleSession,
        handleLoginModal: actions.handleLoginModal,
        handleLoginSlides: actions.handleLoginSlides
        // handleDrawer: actions.handleDrawer,
        // fetchDataFromApi: actions.fetchDataFromApi,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

