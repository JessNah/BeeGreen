import React, { Component } from 'react';
import './Welcome.scss';
import {ReactComponent as ReactSvg} from '../assets/undraw_add_to_cart_vkjp.svg';
import {ReactComponent as ReactSvg2} from '../assets/undraw_empty_cart_co35.svg';
import {ReactComponent as ReactSvg3} from '../assets/undraw_Online_information_re_erks.svg';
import {ReactComponent as ReactSvg4} from '../assets/undraw_the_world_is_mine_nb0e.svg';
import extensionPreviewImg from '../assets/ExtensionPreview.gif'
import withAnimationEaseIn from "../Utilities/withAnimationEaseIn/withAnimationEaseIn.js";
import withAnimationEaseOut from "../Utilities/withAnimationEaseOut/withAnimationEaseOut.js";
import { Bee32 } from "@carbon/icons-react"
import { messages_en } from "../Messages/messages_en";
import { Button, ProgressIndicator, ProgressStep } from "carbon-components-react";

class Welcome extends Component {

	render(){
		const Img = withAnimationEaseIn(ReactSvg);
		const Img2 = withAnimationEaseIn(ReactSvg2);
		const Img3 = withAnimationEaseIn(ReactSvg3);
		const Img4 = withAnimationEaseIn(ReactSvg4);
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
				<div className={"BannerWrapperWelcome BannerWrapperFirst"}>
					<div className={"BannerLeft"}>
						<Img2 className={"Banner1Img"}/>
					</div>
					<div className={"BannerRight"}>
						<div className={"BannerRight1Header"}>
							{messages_en.welcomeBanner1}
						</div>
						<div className={"BannerRight1SubText"}>
							{messages_en.welcomeBanner1Sub}
						</div>
						<Button 
							className={"BannerButton"}
							onClick={() => {console.log("TODO")}}>
								{messages_en.welcomeBanner1Btn}
						</Button>
					</div>
				</div>
				<div className={"BannerWrapperWelcome2"}>
					<div className={"BannerLeftText"} style={{paddingTop: "40px"}}>
						<div className={"BannerRight1Header"}>
							{messages_en.welcomeBanner2}
						</div>
						<div className={"BannerRight1SubText"}>
							{messages_en.welcomeBanner2Sub}
						</div>
					</div>
					<div className={"BannerRight"}>
						<Img3 className={"Banner2Img"}/>
					</div>
				</div>
				<div className={"BannerWrapperWelcome3"}>
					<img className={"Banner3Img"} src={extensionPreviewImg} />
					<div className={"Banner3RightText"}>
						<div className={"BannerRight1Header"} style={{marginTop: "120px"}}>
							{messages_en.welcomeBanner3}
						</div>
						<div className={"BannerRight1SubText"}>
							{messages_en.welcomeBanner3Sub}
						</div>
						<ProgressIndicator
							currentIndex={2}>
							<ProgressStep
								index={0}
								current={false}
								complete={true}
								label={messages_en.welcome4Progress1}
							/>
							<ProgressStep
								index={1}
								current={false}
								complete={true}
								label={messages_en.welcome4Progress2}
							/>
							<ProgressStep
								index={2}
								current={true}
								complete={true}
								label={messages_en.welcome4Progress3}
							/>
						</ProgressIndicator>
					</div>
				</div>
				<div className={"BannerWrapperWelcome"}>
					<div className={"BannerLeftText"} style={{paddingTop: "40px"}}>
						<div className={"BannerRight1Header"}>
							{messages_en.welcomeBanner4}
						</div>
						<div className={"BannerRight1SubText"}>
							{messages_en.welcomeBanner4Sub}
						</div>
					</div>
					<div className={"BannerRight"}>
						<Img4 className={"Banner2Img"}/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Welcome;
