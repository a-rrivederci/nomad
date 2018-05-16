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
      }
    }
	}

	handleKeyDown(event) {
    console.log(event.key);

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

		this.setState({ movement: obj }, function stateUpdateComplete() {
      // update firebase
      console.log(this.state.movement);
		}.bind(this));
	}

  /*
  handleKeyUp(event) {
    let obj = {
      forward: false,
      backward: false,
      right: false,
      left: false,
    };
		this.setState({ movement: obj }, function stateUpdateComplete() {
      // update firebase
      console.log(this.state.movement);
		}.bind(this));
  }
  */

	render() {
		return (
      <div id="meter-movement-track"
        className=""
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
    const rootRef = firebase.database().ref().child('rpi');
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
