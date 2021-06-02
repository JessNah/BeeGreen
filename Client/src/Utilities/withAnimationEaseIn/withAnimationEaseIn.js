import React, { Component } from "react";
import "./withAnimationEaseIn.scss";


const withAnimationEaseIn = (WrappedComponent) => {
	
	return class extends Component {
		state = {didMount: false}
		Timer;

		componentDidMount() {
			this.Timer = setTimeout(() => {
				this.setState({didMount: true});
			}, 500);
		}

		render(){
			let animationClass = this.state.didMount ? "fade_in visible" : "fade_in";
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

export default withAnimationEaseIn;