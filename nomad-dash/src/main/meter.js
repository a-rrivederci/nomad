import React, {Component} from 'react'
import firebase from 'firebase'

import FullPage from '../components/full-page'

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

  render() {
    return(
      <MovementTrack>
        {this.state.data.motorSpeed}
        {this.state.data.leftIR}
        {this.state.data.midIR}
        {this.state.data.rightIR}
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
