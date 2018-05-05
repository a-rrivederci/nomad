import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {Header, Footer} from '../components/bar'
import OverButton from '../components/over-button'
import FullPage from '../components/full-page'

// Dashboard header and navigation bar.
// Contains the main-menu, and user-menu
const DashHeader = (props) => (
  <Header id="dash-header">
    <div id="dash-menu-button" className="toggle-button">
      <i className="fa fa-navicon fa-2x"></i>
    </div>
    
    <Link to='/cockpit'>
      <OverButton id="dash-pilot-button">Pilot</OverButton>
    </Link>

    <div id="dash-user-menu" className="d-flex ml-auto">
      <span className="d-flex mr-3 align-items-center">{props.firstname} {props.lastname}</span>
      <div className="d-flex mr-3align-items-center"><i className="fa fa-user-circle-o fa-2x"></i></div>
    </div>
  </Header>
)


const FooterData = (props) => (
  <span className="mx-3">
      <a href={props.link}>
        {props.children}
      </a>
  </span>
)
// Footer of the dashboard page containing the Nomad systems
// status a link to the documentations and logo
const DashFooter = () => (
  <Footer id="dash-footer">
    <FooterData>Status</FooterData>
    <FooterData link="/">Docs</FooterData>
    <span id="brand" className="text-uppercase mx-3">NOMAD</span>
  </Footer>
)

// Window Component
const PlotWindow = (props) => (
  <div className="py-1 h-100">
    <div id={props.id} className="h-100 dash-window">
      {props.data}
    </div>
  </div>
)
const DataWindow = (props) => (
  <div className="py-1">
    <div id={props.id} className="dash-data dash-window">
      {props.data}
    </div>
  </div>
)

// Displays the data received from the rover
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        leftIR: 0,
        midIR: 0,
        rightIR: 0,
      },
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('rpi');
    const dataRef = rootRef.child('data')
    dataRef.on('value', snap => {
      this.setState({
        data: snap.val()
      });
    });
  }

  render(){
    return (
      <div id="dash-windows" className="container">
        <div className="row">
          <div className="col-sm-8">
            <PlotWindow data="Plot"/>
          </div>
          <div className="col-sm-4">
            <DataWindow data={this.state.data.leftIR} />
            <DataWindow data={this.state.data.rightIR} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <DataWindow data={this.state.data.leftIR} />
          </div>
          <div className="col-sm">
            <DataWindow data={this.state.data.midIR} />
          </div>
          <div className="col-sm">
            <DataWindow data={this.state.data.rightIR} />
          </div>
        </div>
      </div>
    );
  }
}

// Main exported Dashboard page
class Dash extends Component {
  componentDidMount() {
    document.title = "Dashboard | NOMAD"
  }

  render() {
    return (
      <FullPage id="dash">
        <DashHeader firstname="Agent" lastname="Coulson"/>
        <Body />
        <DashFooter />
      </FullPage>
    );
  }
}

export default Dash
