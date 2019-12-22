import React, {Component} from 'react';
import './Input.css';

export default class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: "",
			height: "",
			url: "",
			videoType: "video/mp4",
			autoPlay: true,
			controller: false,
		}
	}
	render() {
		const inputTitle = this.props.inputTitle ? this.props.inputTitle : 'Input';

		return (
			<div id="inputContainer">
				<div className="inputText">
					{inputTitle}
					<br />
					<hr />
				</div>
				<div className="inputVideo">
				</div>
			</div>
		);
	}
}
