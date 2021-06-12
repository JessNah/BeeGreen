import React from 'react';
import Test from "../Test";
import { Tile } from 'carbon-components-react';
import './DashBoard.scss';
import {ReactComponent as ReactSvg} from '../assets/undraw_winners_ao2o.svg';
import {ReactComponent as ReactSvg2} from '../assets/undraw_empty_street_sfxm.svg';
import di from '../assets/di.png';
import micro from '../assets/micro.png'
import withAnimationEaseIn from "../Utilities/withAnimationEaseIn/withAnimationEaseIn.js";
import RatingTag from "../RatingTag/RatingTag";


const DashBoard = (props) => {
	console.log(props);
	const Img = withAnimationEaseIn(ReactSvg);
	const Img2 = withAnimationEaseIn(ReactSvg2);
	return (
		<React.Fragment>
			<div className={"DashboardWrapper"}>
				<div style={{display: "flex", paddingTop: "60px", paddingLeft: "80px", paddingBottom: "40px"}}>
					<Img className={"DashboardVictoryImg"} style={{width: 800, maxHeight: "500px"}}/>
					<Tile className={"DashboardTileVictory"}>
						<div className={"DashboardTileHeader"}>
							You're on a roll!
						</div>
						<div className={"TileText"}>
							Your average cart ranks:
						</div>
						<RatingTag score={3} />
						<div className={"TileText"}>
							On average, you always take the effort to improve atleast 2 items in your cart!
						</div>
						<div className={"TileTextEmphasize"}>
							Way to go you!
						</div>
						<div className={"TileText"}>
							Just this month, you've used BeeGreen 11 times! 
						</div>
						<div className={"TileText"}>
							Your favorite store to use BeeGreen in is InstaCart.
						</div>
						<div className={"TileText"}>
							You are in the top 5% of shoppers in your region!
						</div>
						<div className={"TileTextEmphasize"}>
							Congratulations, over the last month, you saved 21 kg of CO2
						</div>
					</Tile>
				</div>
				<div className={"DashboardBanner"}>
					<div>
						<div className={"BannerHeader"}>Online purchases this year</div>
						<div className={"BannerContent"}>11</div>
					</div>
					<div>
						<div className={"BannerHeader"}>Carbon saving substitutions made</div>
						<div className={"BannerContent"}>32</div>
					</div>
					<div>
						<div className={"BannerHeader"}>Average cart score</div>
						<div className={"BannerContent"}>Good</div>
					</div>
				</div>
				<div style={{display: "flex", paddingTop: "20px", paddingLeft: "30px", paddingBottom: "0px"}}>
					<Tile className={"DashboardTileVictory"}>
						<div className={"DashboardTileHeader"}>
							How you compare to others in your region
						</div>
						<div className={"TileText"}>
							Your favorite online store is InstaCart.
						</div>
						<div className={"TileText"}>
							Your average InstaCart cart ranks:
						</div>
						<RatingTag score={3} />
						<div className={"TileText"}>
							Other InstaCart shoppers in your region have an average cart rank of:
						</div>
						<RatingTag score={7} />
						<div className={"TileText"}>
							Did you know that your average cart is 1.73x better than the national average in the US?
						</div>
						<div className={"TileText"}>
							Your overall online carbon score this month is 2.6x better than others in your region!
						</div>
						<div className={"TileTextEmphasize"}>
							That's incredible! You are setting a standard!
						</div>
					</Tile>
					<Img2 className={"DashboardVictoryImg"} style={{width: 700, maxHeight: "400px", marginLeft: "80px"}}/>
				</div>
				<div className={"DashboardTilesWrapper DashboardContent"}>
					<Tile className={"DashboardTile"}>
						<div className={"DashboardTileHeader"}>
							Your most noteworthy buy this year
						</div>
						<div style={{display:"flex", justifyContent:"flex-start", paddingTop: "20px"}}>
							<img src={di} style={{maxHeight: "80px", paddingRight: "30px", paddingLeft: "30px"}}/>
							<div>
								<div className={"TileTextEmphasize"} style={{marginTop: "-20px"}}>
									Tru Earth Hypoallergenic, Eco-friendly and Biodegradable Plastic-Free Laundry Detergent
								</div>
								<div className={"TileText"}>
									Bought from Amazon on 04/24/21
								</div>
								<div className={"TileText"}>
									This item scored:
								</div>
								<div style={{marginTop: "10px"}}> 
									<RatingTag score={0.3} />
								</div>
							</div>
						</div>
					</Tile>
					<Tile className={"DashboardTile"}>
						<div className={"DashboardTileHeader"}>
							Your lowest scoring buy this year							
						</div>
						<div style={{display:"flex", justifyContent:"flex-start", paddingTop: "20px"}}>
							<img src={micro} style={{maxHeight: "90px", paddingRight: "30px", paddingLeft: "20px"}}/>
							<div>
								<div className={"TileTextEmphasize"} style={{marginTop: "-10px"}}>
									Panasonic 2.2 Cu. Ft. Microwave (NNST966W) - White
								</div>
								<div className={"TileText"}>
									Bought from Best Buy on 04/28/21
								</div>
								<div className={"TileText"}>
									This item scored:
								</div>
								<div style={{marginTop: "10px"}}> 
									<RatingTag score={9} />
								</div>
							</div>
						</div>
					</Tile>
				</div>
				<div className={"DashboardTilesWrapper DashboardContent"}>
					<Tile className={"DashboardTile"}
							style={{width: "600px", height: "350px"}}>
						<div className={"DashboardTileHeader"}>
							This month shopping vs last month footprint
						</div>
						<div>
							
						</div>
						<div>
							
						</div>
						<div>
							
						</div>
						<div>
							
						</div>
						<div>
							
						</div>
					</Tile>
					<Tile className={"DashboardTile"}
							style={{width: "600px", height: "350px"}}>
						<div className={"DashboardTileHeader"}>
							Your year at a glance
						</div>
						<div>
							
						</div>
						<div>
							
						</div>
						<div>
							
						</div>
						<div>
						
						</div>
						<div>
							
						</div>
					</Tile>
				</div>
				{/* <Test/> */}
			</div>
		</React.Fragment>
	);
}

export default DashBoard;
