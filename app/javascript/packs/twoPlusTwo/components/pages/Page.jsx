import React from "react";
import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";

class Page extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null
		};
	}

	render() {
		return (
			<div>
				<Navigation />
				{this._content()}
				<Footer />
			</div>
		);
	}

	_content() {
		return <p>No content</p>;
	}
}

export default Page;
