import React, {Component} from 'react';
import Scroll from 'react-scroll';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import LoginModal from '../login/login-modal.component';

import * as actions from '../login/login.actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './landing.css';

const Link       = Scroll.Link;
const Element    = Scroll.Element;
const Events     = Scroll.Events;
const scroll     = Scroll.animateScroll;
const scrollSpy  = Scroll.scrollSpy;

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
          <Link className="pull-left logo" to="#" style={{lineHeight: 3.15, color: '#fff', textDecoration: 'none', fontSize: 16, marginRight: 35}} onClick={this.scrollToTop}>Me-Lance</Link>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul className="nav navbar-nav" style={{display: 'block', margin: 'auto', width: '85%'}}>
          <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} activeClass="active" to="about" spy={true} smooth={true} duration={500} >About</Link></li>
          <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} activeClass="active" to="invoice" spy={true} smooth={true} duration={500} >Invoices</Link></li>
          <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><Link style={styles.link} activeClass="active" to="charts" spy={true} smooth={true} duration={500}>Stats</Link></li>
          <li
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1">
            <Link
              to="#"
              style={styles.link}
              onTouchTap={() => {
                this.props.handleLoginModal()
                this.props.handleLoginSlides(1);
                }
              }>
              Sign Up
            </Link>
          </li>
          <li className="login-link"><LoginModal /></li>
				</ul>
			</div>
      </div>
		</nav>

    <div style={{backgroundColor: '#fff'}}>
      <img
        src="https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.skipprichard.com%2Fwp-content%2Fuploads%2F2012%2F05%2FI-love-my-job.jpg&f=1"
        alt="I love my job"
        style={{width: '100%', height: 575, maxWidth: 975, display: 'block', margin: 'auto'}}
      />

      <div style={{height: 100, width: '75%', backgroundColor: 'rgba(0, 119, 102, 0.5)', position: 'absolute', top: '15%', left: '10%'}}>
        <h1 style={{position: "relative", color: '#eee', textAlign: 'center', fontWeight: 'bold', marginTop: 29}}>Boost Your Productivity Today!</h1>
      </div>
      </div>
      <div className="container-fluid" style={{padding: 20,}}>

        <Element name="about" className="element col-xs-12" style={{margin: 6, padding: '140px 40px 20px 40px', display: 'block', width: '100%',
        }} >
          <Paper zDepth={2} style={{width: '40%', height: '40%', float: 'right', marginLeft: 20}} children={
            <img
              src="https://s16.postimg.org/i3y6xzd1h/Time_Tracker.jpg"
              alt="time tracker"
              style={{width: '100%', height: '100%'}} />
            } />
          <h1>Save time...</h1>
          <p>At the heart of Me-Lance, is the time tracker. Just click start when you are ready to get to work. When you are done, you will be prompted to select a project, add a description of the tasks completed, and even edit the time you've spent. With one click, a new task will be added to your current invoice. If an invoice doesn't exist, don't sweat it! We'll create one for you.</p>
        </Element>

        <Element name="invoice" className="element col-xs-12" style={{margin: 6, padding: '140px 40px 20px 40px', display: 'block', width: '100%',
        }} >
          <Paper zDepth={2} style={{width: '60%', height: '60%', float: 'left', marginRight: 20}} children={
           <img
            src="https://s18.postimg.org/97qebyr3t/Screen_Shot_2017-05-03_at_8.26.04_PM.png"
            alt="invoice"
            style={{width: '100%', height: '100%'}}
          />
          }
          />
          <h1>Get paid faster</h1>
          <p>Manage your invoices with ease! You can edit your invoices at any time, add tasks manually, or edit as you need to. When you are ready, click export to download or print. Getting paid has never been so easy!</p>
        </Element>

        <Element name="charts" className="element col-xs-12" style={{margin: 6, padding: '140px 40px 20px 40px', display: 'block', width: '100%',
        }} >
          <Paper zDepth={2} style={{width: '60%', height: '60%', float: 'right', marginLeft: 20}} children={
            <img
              style={{width: '100%', height: '100%'}}
              src="https://s22.postimg.org/spbv0ajk1/Screen_Shot_2017-05-06_at_5.58.15_PM.png"
              alt="chart"
              />
          } />
          <h1>Keep track of your success</h1>
        <p>Interactive charts and statistics help you stay on track and discover your most profitable clients</p>
        </Element>

        <Element name="signup" className="element col-xs-12" style={{margin: 6, padding: '40px 40px 40px 20px', display: 'block', width: '100%'
        }}>
          <div style={{width: '75%', margin: 'auto', paddingLeft: 40, textAlign: 'center'}}>
            <h4 style={{color: '#076'}} >What are you waiting for?</h4>
            <RaisedButton
              label="Join Now"
              labelStyle={{color: '#fff'}}
              buttonStyle={{backgroundColor: '#076'}}
              style={{lineHeight: 0}}
              onTouchTap={() => {
              this.props.handleLoginModal()
              this.props.handleLoginSlides(1);
            }
              } />
          </div>
        </Element>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isLoading: state.headerReducer.isLoading,
        isLoggedIn: state.headerReducer.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleLoginModal: actions.handleLoginModal,
        handleLoginSlides: actions.handleLoginSlides
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

