import React, { Component } from 'react';
import './Welcome.scss';
import {ReactComponent as ReactSvg} from '../assets/undraw_add_to_cart_vkjp.svg';
import withAnimationEaseIn from "../Utilities/withAnimationEaseIn/withAnimationEaseIn.js";
import withAnimationEaseOut from "../Utilities/withAnimationEaseOut/withAnimationEaseOut.js";
import { Bee32 } from "@carbon/icons-react"

class Welcome extends Component {

	render(){
		const Img = withAnimationEaseIn(ReactSvg);
		return (
			<React.Fragment>
				<div className={"HeaderGradient"}>
					<div className={"ApplicationName"}>
						Welcome to Bee Green
						<Bee32
							style={{
								marginLeft: "8px",
								position: "absolute",
								marginTop: "3px"
							}}
						/>
					</div>
					If we all make a small change, we can make a big impact.
				</div>
				<div className={"ImageWrapper"}>
					<div className="Phone_Graphic_Handle">
						<Img className={"WelcomeImage"} style={{width: 800}}/>
					</div>: 
				</div>
			</React.Fragment>
		);
	}

}

export default Welcome;
