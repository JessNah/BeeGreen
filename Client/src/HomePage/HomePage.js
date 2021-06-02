import React from 'react';
import Dashboard from "../DashBoard/DashBoard";
import Welcome from "../Welcome/Welcome";

const HomePage = (props) => {
	return (
		<React.Fragment>
			{ props.loggedIn ?
				<Dashboard {...props} />
				: <Welcome {...props} /> }
		</React.Fragment>
	);
}

export default HomePage;
