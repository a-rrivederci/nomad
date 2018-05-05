import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import OverButton from '../components/over-button'

// Transparent bar for Cockpit header and footer
const Bar = (props) => (
  <div id={props.id} className="d-flex p-5 bg-transparent">
    {props.children} 
  </div>
)


// The component which shows the stream
class StreamView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errored: false
		};
	}

	handleError(event) {
		this.setState({errored: true});
	}

	render() {
    var stream;

    if (this.state.errored) {
      stream = <i className="fa fa-spinner fa-4x text-light"></i>
    }
    else {
      stream = <img id="stream" src="http://localhost:8000/stream/" onError={(event) => this.handleError(event)} alt="Standby"/>
    }
    
		return (
			<div id="view" className="d-flex bg-transparent absolute-full">
				<div className="bg-dark w-100 d-flex justify-content-center align-items-center">
          {stream}
				</div>
			</div>
		);
	}
}


// The header of the control overlay
// currently displays a back navigtion and the statusbar
const Header = (props) => (
  // Use the global bar structure for the header
  <Bar id="overlay-header">
    
    <Link to="/dashboard">
      <OverButton id="overlay-back">
      <i className="fa fa-arrow-left fa-2x"></i>
      </OverButton>
    </Link>

    <div className="d-flex ml-auto rounded">
      <OverButton id="overlay-mode">{props.mode}</OverButton>
      <OverButton id="overlay-settings"><i className="fa fa-cog fa-2x"></i></OverButton>
    </div>
  </Bar>
);

// Footer of the control overlay displaying the map
// and the 
const Footer = () => (
  // Use the global bar structure for the footer
  <Bar id="overlay-footer">
    <div id="telemetry" className="mr-auto">
      <iframe title="telemetry-map" id="telemetry-map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d41659.092084554926!2d-123.1298649!3d49.26325970000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1521266536642"></iframe>
    </div>
  </Bar>
);

// Control overlay display component
class ControlOverlay extends Component {
  constructor(props) {
    super(props)
		this.state = {
			mode: {
				user: "USER",
				auto: "AUTO",
			},
			modeStatus: null,
    };
		this.state.modeStatus = this.state.mode.user;
  }

  handleKeyPress(event) {
		if (event.key === " ") {
      // If key is space switch the mode
			this.setState({ modeStatus: !this.state.modeStatus }, function stateUpdateComplete() {
				console.log(this.state.modeStatus);
				fetch('https://heroku-url', {
					method: 'POST',
					body: JSON.stringify({type:this.state.modeStatus}),
					headers: {
						"Content-Type": "application/json"
					},
				});
			}.bind(this));
		}
	}

  render() {
    return (
      <div id="overlay" className="d-flex flex-column absolute-full">
        {/*Display either the auto or user mode status in the header*/}
        <Header mode={this.state.modeStatus ? this.state.mode.user:this.state.mode.auto} />
        <Footer />
        <div id="key-window" 
          className="position-absolute"
          onKeyPress={(event) => this.handleKeyPress(event)}
          tabIndex="0">
        </div> 
      </div>
    );
  }
}


// Exported Cockpit module
class Cockpit extends Component {
  componentDidMount() {
    document.title = "Cockpit | NOMAD"
  }
  
  render() {
    return (
      <div id="cockpit" className="d-flex h-100">
        <StreamView />
        <ControlOverlay />
      </div>
    )
  }
}

export default Cockpit
