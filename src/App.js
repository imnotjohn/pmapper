import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Input from './components/Input/Input';

// testing Presentation API
const presURLS = ['/components/Input/input1.html', '/components/Input/input2.html'];
const request = new PresentationRequest(presURLS);

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			presAvailabile: 'none',
		}
	}

	componentDidMount() {
		request.getAvailability()
			.then( (availability) => {
				// this.handleAvailabilityChange(availability.value);
				this.handleAvailabilityChange(true);
				availability.onchange = () => {
					this.handleAvailabilityChange(this.value);
				}
			}).catch( () => {
				this.handleAvailabilityChange(true);
			})
	}

	// testing Presentation API
	handleAvailabilityChange = (available) => {
		this.setState({
			presAvailable: available,
		});
	}

	startPresentation = (e) => {
		e.preventDefault();

		request.start();
	}

	render() {
  	  return (
    	<div className="App">

	  	  <button ref="presBtn" onClick={this.startPresentation} style={{display: this.state.presAvailable === 'true' ? 'none' : 'true'}}><img src={logo} alt="Design"/>
	  	  </button>

      	  <Input inputTitle="Foreground" />
      	  <Input inputTitle="Background" />

    	</div>
  	  );
	}
}
