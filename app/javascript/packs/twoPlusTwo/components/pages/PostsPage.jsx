import React from "react";
import axios from "axios";
import Page from "../pages/Page";
import Post from "../posts/Post";
import PostList from "../posts/PostList";
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

  _previousIndex() {
    if (this.state.index === 0) {
      return this.state.index;
    }

    return this.state.index - 1;
  }

  _nextIndex() {
    if (this.state.index === this.state.posts.length - 1) {
      return this.state.index;
    }

    return this.state.index + 1;
  }

  changeCurrentPost(newIndex) {
    this.setState({ index: newIndex });
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
        changeCurrentPost={this.changeCurrentPost.bind(this)}
        previousIndex={this._previousIndex()}
        nextIndex={this._nextIndex()}
      />
    );
  }

  _content() {
    return (
      <div>
        <PostList
          posts={this.state.posts}
          currentIndex={this.state.index}
          changeCurrentPost={this.changeCurrentPost.bind(this)}
        />
        {this._currentView()}
      </div>
    );
  }
}

export default PostsPage;
