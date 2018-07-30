import React from "react";

class PostList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.posts.map((post, i) => {
					return (
						<li key={i}>
							{post.title}
						</li>
					);
				})}
			</ul>
		)
	}
}

export default PostList;
