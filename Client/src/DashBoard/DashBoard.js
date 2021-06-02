import React from 'react';
import Test from "../Test";
import { Button } from 'carbon-components-react';
import './DashBoard.scss';


const DashBoard = (props) => {
	console.log(props);
	return (
		<React.Fragment>
			<Button>Hello React!</Button>
			<Test/>
		</React.Fragment>
	);
}

export default DashBoard;
