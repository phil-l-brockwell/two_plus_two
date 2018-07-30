import React from "react";

class PostList extends React.Component {
	render() {
		return (
			<div className="post-list">
				{this.props.posts.map((post, i) => {
					return (
						<div
							className={this.styleStringFor(i)}
							key={i}
							onClick={() => this.props.changeCurrentPost(i)}
						>
							{post.title}
						</div>
					);
				})}
			</div>
		);
	}

	styleStringFor(index) {
		var s = "post-list-item";

		if (index === this.props.currentIndex) {
			s += " current-post-list-item";
		}

		return s;
	}
}

export default PostList;
