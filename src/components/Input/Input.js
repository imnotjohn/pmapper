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
			transform: {
				xScale: 1,
				ySkew: 0,
				xSkew: 0,
				yScale: 1,
				xTranslate: 0,
				yTranslate: 0,
			}
		}
	}

	parameterHandler = (e) => {
		e.preventDefault();

		const transformState = {...this.state.transform};
		const key = e.target.name;
		const val = e.target.value;

		transformState[key] = val;

		this.setState({
			transform: transformState,
		});
	}

	componentDidMount() {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
	}

	renderParameters = () => {
			return ( Object.keys(this.state.transform).map( (name, index) => {
				return (
					<div className="inputParameter" key={index}>
						<label for={name}>{name}</label>
						<input onChange={this.parameterHandler} name={name} type="text" value={this.state.transform[name]}/>
					</div>
				);
			}))
	}

	render() {
		const inputTitle = this.props.inputTitle ? this.props.inputTitle : 'Input';

		return (
			<div id="inputContainer">
				<div id="inputText">
					{inputTitle}
					<br />
					<hr />
				</div>
				<div id="media">
					<div ref="inputVideo" id="inputVideo">
						<canvas ref="canvas" id="canvas">
						</canvas>
					</div>
					<div ref="inputControls" id="inputControls">
			{/*}
						<label for="xScale">xScale</label>
						<input name="xScale" type="number" value={this.state.transform.xScale}/>
			*/}

					{this.renderParameters()}
					</div>
				</div>
			</div>
		);
	}
}
