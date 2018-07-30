import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import PostsPage from "./components/pages/PostsPage";

const App = props => (
	<Router>
		<div>
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/posts" component={PostsPage} />
		</div>
	</Router>
);

export default App;
