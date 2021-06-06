import React, { Component } from "react";
import HomePage from "./HomePage/HomePage";
import DashBoard from "./DashBoard/DashBoard";
import HeaderBar from "./HeaderBar/HeaderBar";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

class BeeGreen extends Component {
	constructor() {
		super();
		this.state = { loggedIn: false }
	}

	render() {
		return (
			<React.Fragment>
				<header>
					<HeaderBar/>
				</header>
				<Switch>
						<Route path={"/dashboard/"} render={()=> React.cloneElement(<DashBoard/>, {loggedIn: this.state.loggedIn})} />
						<Route exact path={"/" || !this.state.loggedIn} render={()=> React.cloneElement(<HomePage/>, {loggedIn: this.state.loggedIn})} />
						<Redirect from='*' to='/' />
					</Switch>
			</React.Fragment>
		);
	}
}
export default withRouter(BeeGreen);