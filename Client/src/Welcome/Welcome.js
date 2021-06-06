import React, { Component } from 'react';
import './Welcome.scss';
import {ReactComponent as ReactSvg} from '../assets/undraw_add_to_cart_vkjp.svg';
import withAnimationEaseIn from "../Utilities/withAnimationEaseIn/withAnimationEaseIn.js";
import withAnimationEaseOut from "../Utilities/withAnimationEaseOut/withAnimationEaseOut.js";
import { Bee32 } from "@carbon/icons-react"
import { messages_en } from "../Messages/messages_en";

class Welcome extends Component {

	render(){
		const Img = withAnimationEaseIn(ReactSvg);
		return (
			<React.Fragment>
				<div className={"HeaderGradient"}>
					<div className={"ApplicationName"}>
						{messages_en.welcomeToApp}
						<Bee32
							style={{
								marginLeft: "8px",
								position: "absolute",
								marginTop: "3px"
							}}
						/>
					</div>
					{messages_en.appTagLine}
				</div>
				<div className={"ImageWrapper"}>
					<div className="Phone_Graphic_Handle">
						<Img className={"WelcomeImage"} style={{width: 900}}/>
					</div>: 
				</div>
				<div className={"CommunityWrapper"}>
					{messages_en.communityTextHeader}
				</div>
			</React.Fragment>
		);
	}
}

export default Welcome;
