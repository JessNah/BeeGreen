import React from 'react';
import Test from "../Test";
import { Tile } from 'carbon-components-react';
import './DashBoard.scss';
import {ReactComponent as ReactSvg} from '../assets/undraw_winners_ao2o.svg';
import {ReactComponent as ReactSvg2} from '../assets/undraw_empty_street_sfxm.svg';
import withAnimationEaseIn from "../Utilities/withAnimationEaseIn/withAnimationEaseIn.js";


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
						<div>
							Coffee
						</div>
						<div>
							score
						</div>
						<div>
							56k CO emissions
						</div>
						<div>
							04/24/32
						</div>
						<div>
							Instacart
						</div>
					</Tile>
				</div>
				<div className={"DashboardBanner"}>
					<div>
						<div>Online purchases this year</div>
						<div>32</div>
					</div>
					<div>
						<div>Carbon saving substitutions made</div>
						<div>76</div>
					</div>
					<div>
						<div>Average cart score</div>
						<div>Good</div>
					</div>
				</div>
				<div style={{display: "flex", paddingTop: "20px", paddingLeft: "30px", paddingBottom: "0px"}}>
					<Tile className={"DashboardTileVictory"}>
						<div className={"DashboardTileHeader"}>
							How you compare to others in your area
						</div>
						<div>
							Coffee
						</div>
						<div>
							score
						</div>
						<div>
							56k CO emissions
						</div>
						<div>
							04/24/32
						</div>
						<div>
							Instacart
						</div>
					</Tile>
					<Img2 className={"DashboardVictoryImg"} style={{width: 700, maxHeight: "400px", marginLeft: "80px"}}/>
				</div>
				<div className={"DashboardTilesWrapper DashboardContent"}>
					<Tile className={"DashboardTile"}
							style={{width: "600px", height: "350px"}}>
						<div className={"DashboardTileHeader"}>
							This month shopping vs last month footprint
						</div>
						<div>
							Coffee
						</div>
						<div>
							score
						</div>
						<div>
							56k CO emissions
						</div>
						<div>
							04/24/32
						</div>
						<div>
							Instacart
						</div>
					</Tile>
					<Tile className={"DashboardTile"}
							style={{width: "600px", height: "350px"}}>
						<div className={"DashboardTileHeader"}>
							Your year at a glance
						</div>
						<div>
							Coffee
						</div>
						<div>
							score
						</div>
						<div>
							56k CO emissions
						</div>
						<div>
							04/24/32
						</div>
						<div>
							Instacart
						</div>
					</Tile>
				</div>
				<div className={"DashboardTilesWrapper DashboardContent"}>
					<Tile className={"DashboardTile"}>
						<div className={"DashboardTileHeader"}>
							Your most noteworthy buy this year
						</div>
						<div>
							Coffee
						</div>
						<div>
							score
						</div>
						<div>
							56k CO emissions
						</div>
						<div>
							04/24/32
						</div>
						<div>
							Instacart
						</div>
					</Tile>
					<Tile className={"DashboardTile"}>
						<div className={"DashboardTileHeader"}>
							Your lowest scoring buy this year
						</div>
						<div>
							Coffee
						</div>
						<div>
							score
						</div>
						<div>
							56k CO emissions
						</div>
						<div>
							04/24/32
						</div>
						<div>
							Instacart
						</div>
					</Tile>
				</div>
				{/* <Test/> */}
			</div>
		</React.Fragment>
	);
}

export default DashBoard;
