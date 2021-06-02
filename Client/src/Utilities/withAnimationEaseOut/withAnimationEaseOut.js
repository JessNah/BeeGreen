import React, { Component } from "react";
import "./withAnimationEaseOut.scss";


const withAnimationEaseOut = (WrappedComponent) => {
	
	return class extends Component {
		state = {didMount: false}
		Timer;

		componentDidMount() {
			this.Timer = setTimeout(() => {
				this.setState({didMount: true});
			}, 500);
		}

		render(){
			let animationClass = this.state.didMount ? "fade_in" : "fade_in visible";
			return (
				<div className={animationClass}>
					<WrappedComponent {...this.props} />
				</div>
			);
		}

		componentWillUnmount() {
			clearTimeout(this.Timer);
		}
	};
};

export default withAnimationEaseOut;