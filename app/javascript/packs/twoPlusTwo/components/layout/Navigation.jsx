import React from "react";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
	render() {
		return (
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/posts">Posts</Link>
				</li>
			</ul>
		);
	}
}

export default Navigation;
