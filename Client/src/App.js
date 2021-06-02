import React from 'react';
import { HashRouter } from "react-router-dom";
import './App.scss';
import BeeGreen from "./BeeGreen";


function App() {
	return (
		<div className="App">
			<HashRouter>
				<BeeGreen/>
			</HashRouter>
		</div>
	);
}

export default App;