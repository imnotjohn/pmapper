import React, {Component} from 'react';
import './Input.css';

import imgSrc from './../../assets/test.png';

// variables for transformation matrix
let xScale; // value of 1 == no scaling
let ySkew;
let xSkew;
let yScale; // value of 1 == no scaling
let xTranslate; // (moving)
let yTranslate; // (moving)

export default class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			canvas: {
				width: "",
				height: "",
				src: "",
				autoPlay: true,
				controller: false,
			},
			transform: {
				xScale: 1,
				ySkew: 0,
				xSkew: 0,
				yScale: 1,
				xTranslate: 0,
				yTranslate: 0,
			},
			isPresentation: false,
		}
	}

	parameterHandler = (e, ctxRef) => {
		e.preventDefault();

		const transformState = {...this.state.transform};
		const key = e.target.name;
		const val = e.target.value;

		transformState[key] = parseFloat(val);

		this.setState({
			transform: transformState,
		}, () => {
			console.log(this.state.transform);

			xScale = transformState.xScale;
			ySkew = transformState.ySkew;
			xSkew = transformState.xSkew;
			yScale = transformState.yScale;
			xTranslate = transformState.xTranslate;
			yTranslate = transformState.yTranslate;

			// this.transformContext(ctxRef);
		});
	}

	presentationHandler = (e) => {
		e.preventDefault();

		this.setState({
			isPresentation: !this.state.isPresentation,
		});
	}

	drawContext = (ctxRef, ctxImg, ctxWidth, ctxHeight) => {
		ctxRef.drawImage(ctxImg, 0, 0, ctxWidth, ctxHeight);
	}

	transformContext = (ctx) => {
		ctx.setTransform(xScale, ySkew, xSkew, yScale, xTranslate, yTranslate);

		console.log(`getTransform: ${ctx.getTransform()}`);
	}

	componentDidMount() {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');
		const ctxImage = this.refs.contextImage;

		const ctxWidth = 1280/4;
		const ctxHeight = 720/4;

		this.transformContext(ctx);

		ctxImage.onload = () => {
			ctx.drawImage(ctxImage, 0, 0, ctxWidth, ctxHeight);
		}

		// ctxImage.onload = () => {
			// this.drawContext(ctx, ctxImage, 0, 0, ctxWidth, ctxHeight);
		// }
	}

	renderParameters = () => {
		return ( Object.keys(this.state.transform).map( (name, index) => {
			return (
				<div className="inputParameter" key={index}>
					<label htmlFor={name}>{name}</label>
					<input onChange={this.parameterHandler} name={name} type="number" step="0.1" value={this.state.transform[name]}/>
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
							<img ref="contextImage" src={imgSrc} alt="test" />
						</canvas>
					</div>
					<div ref="inputControls" id="inputControls">
						{this.renderParameters()}
						<span>
							<button ref="presBtn" style={{display: 'none'}} type="submit">
								{ this.state.isPresentation ? 'close' : 'open' }
							</button>
						</span>
					</div>
				</div>
			</div>
		);
	}
}
