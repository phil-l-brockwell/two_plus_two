import React from "react";
import axios from "axios";
import Page from "../pages/Page";
import Post from "../posts/Post";
import PostList from "../posts/PostList";
import PostChanger from "../posts/PostChanger";
import LoadingScreen from "../layout/LoadingScreen";

class PostsPage extends Page {
	constructor() {
		super();
		this.state = {
			posts: [],
			index: 0
		};
	}

	_fetchPosts() {
		axios
			.get("api/posts")
			.then(response => {
				this.setState({ posts: response.data["posts"] });
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidMount() {
		this._fetchPosts();
	}

	moveBack() {
		if (this.state.index === 0) {
			return;
		}

		this.setState({ index: this.state.index - 1 });
	}

	moveForward() {
		if (this.state.index === this.state.posts.length - 1) {
			return;
		}

		this.setState({ index: this.state.index + 1 });
	}

	_currentPost() {
		return this.state.posts[this.state.index];
	}

	_currentView() {
		let currentPost = this._currentPost();

		if (!currentPost) {
			return <LoadingScreen />;
		}

		return (
			<Post
				title={currentPost.title}
				subtitle={currentPost.subtitle}
				text={currentPost.text}
			/>
		);
	}

	_content() {
		return (
			<div>
				{this._currentView()}
				<PostList posts={this.state.posts} currentIndex={this.state.index} />
				<PostChanger direction={"back"} move={this.moveBack.bind(this)} />
				<PostChanger direction={"forward"} move={this.moveForward.bind(this)} />
			</div>
		);
	}
}

export default PostsPage;
