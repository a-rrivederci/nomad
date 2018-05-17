import React, {Component} from 'react'
import firebase from 'firebase'

import FullPage from '../components/full-page'

import {Header, Footer} from '../components/bar'

// Dashboard header and navigation bar.
// Contains the main-menu, and user-menu
const DashHeader = (props) => (
  <Header id="meter-header">
    <div id="meter-menu-button" className="toggle-button">
      <i className="fa fa-wifi fa-2x"></i>
    </div>


    <div id="meter-user-menu" className="d-flex ml-auto">
      <div className="d-flex mr-3align-items-center">
        <span id="brand" className="text-uppercase mx-3">NOMAD</span>
      </div>
    </div>
  </Header>
)

// Footer of the dashboard page containing the Nomad systems
// status a link to the documentations and logo
const DashFooter = () => (
  <Footer id="meter-footer">
    <span className="mx-3">Attackle &copy;2018</span>
  </Footer>
)

// Control schema window
class MovementTrack extends Component {
	constructor(props) {
		super(props);
		this.state = {
      movement: {
        forward: false,
        backward: false,
        right: false,
        left: false,
      },
      active: false
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.setState({ active: !this.state.active }, function updateFirebase() {
        const rootRef = firebase.database().ref();
        const controlRef = rootRef.child('control');
        // console.log(this.state.movement);
        controlRef.set({ active: this.state.active });
      });
    }
  }

	handleKeyDown(event) {
    if (!this.state.active) {
      // console.log(event.key)
      // Allow no key presses to stop the rover
      return;
    }

    // console.log("Active")

		let obj;
		switch(event.key) {
			case "ArrowUp":
        obj = { 
          forward: true,
          backward: false,
          right: false,
          left: false,
        };
				break;
			case "ArrowDown":
        obj = { 
          forward: false,
          backward: true,
          right: false,
          left: false,
        };
				break;
      case "ArrowRight":
        obj = { 
          forward: false,
          backward: false,
          right: true,
          left: false,
        };
        break;
      case "ArrowLeft":
				obj = { 
          forward: false,
          backward: false,
          right: false,
          left: true,
        };
				break;
      default:
        obj = { 
          forward: false,
          backward: false,
          right: false,
          left: false,
        };
				break;
		}

		this.setState({ movement: obj }, function updateFirebase() {
      const rootRef = firebase.database().ref();
      const movementRef = rootRef.child('movement');
      // console.log(this.state.movement);
      movementRef.set(obj);
		});
	}

	render() {
		return (
      <div id="meter-movement-track"
        className=""
        onKeyPress={(event) => this.handleKeyPress(event)}
        onKeyDown={(event) => this.handleKeyDown(event)}
        tabIndex="0" >
        {this.props.children}
      </div>
		);
	}
}


const ValueLabelFormat = (props) => (
  <div className="col">
    <div className="row">
      <span id="sensor-value" className="col container text-center">{props.value}</span>
    </div>
    <div className="row">
      <span className="col container text-center">{props.label}</span>
    </div>
  </div>
)

// Displays the data received from the rover
class DataTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        motorSpeed: 0,
        leftIR: 0,
        midIR: 0,
        rightIR: 0,
      }
    }
  }

  componentDidMount() {
    // Track changes in firebase for 'data' child 
    const rootRef = firebase.database().ref();
    const dataRef = rootRef.child('data')
    dataRef.on('value', snap => {
      this.setState({
        data: snap.val()
      });
    });
  }

  generateItem(item) {
    return <ValueLabelFormat key={item.label} value={item.value} label={item.label} />
  }

  render() {
    const sensors = [
      {
        value: this.state.data.leftIR,
        label: "Left IR"
      },
      {
        value: this.state.data.midIR,
        label: "Mid IR"
      },
      {
        value: this.state.data.rightIR,
        label: "Right IR"
      }
    ];

    return(
      <MovementTrack>
        <DashHeader />
        <div className="container text-dark">
          <div className="mx-auto mb-auto text-dark">
            <div className="row">
              <div id="motor-speed-value" className="col container text-center">{this.state.data.motorSpeed}</div>
            </div>
            <div  className="row mb-5">
              <div id="motor-speed-label" className="col container text-center">RPM</div>
            </div>
          </div>
          <div className="mx-auto mb-auto text-dark row">
            {sensors.map(this.generateItem)}            
          </div>
        </div>
        <DashFooter />
      </MovementTrack>
    );
  }
}

// Main exported Meter page
class Meter extends Component {
  componentDidMount() {
    document.title = 'Meter | NOMAD'
  }

  render() {
    return (
      <FullPage id="meter">
        <DataTrack />
      </FullPage>
    );
  }
}

export default Meter
