import React from "react";

class Post extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<h2>{this.props.subtitle}</h2>
				<p>{this.props.text}</p>
			</div>
		);
	}
}

export default Post;
