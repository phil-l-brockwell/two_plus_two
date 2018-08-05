import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Post from "../posts/Post";
import PostList from "../posts/PostList";
import Form from "../layout/Form";
import AdminControls from "../layout/AdminControls";

class PostsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      index: 0,
      showPostForm: false
    };
    this.postFields = [
      { name: "title" },
      { name: "subtitle" },
      { name: "text", type: "textarea" }
    ];
  }

  fetchPosts() {
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
    this.fetchPosts();
  }

  previousIndex() {
    if (this.state.index === 0) {
      return this.state.index;
    }
    return this.state.index - 1;
  }

  nextIndex() {
    if (this.state.index === this.state.posts.length - 1) {
      return this.state.index;
    }
    return this.state.index + 1;
  }

  changeCurrentPost(newIndex) {
    this.setState({ index: newIndex });
  }

  currentPost() {
    return this.state.posts[this.state.index];
  }

  updatePosts(response) {
    var newPost = response["data"]["post"];
    var posts = this.state.posts.slice();
    posts.push(newPost);
    this.setState({ posts: posts });
  }

  togglePostForm() {
    this.setState({ showPostForm: !this.state.showPostForm });
  }

  render() {
    return (
      <div className="content">
        <PostList
          posts={this.state.posts}
          currentIndex={this.state.index}
          changeCurrentPost={this.changeCurrentPost.bind(this)}
        />
        <Post
          post={this.currentPost()}
          changeCurrentPost={this.changeCurrentPost.bind(this)}
          previousIndex={this.previousIndex()}
          nextIndex={this.nextIndex()}
        />
        {this.props.currentUser && this.props.currentUser.admin ? (
          <AdminControls>
            <button onClick={this.togglePostForm.bind(this)}>post</button>
          </AdminControls>
        ) : null}
        {this.state.showPostForm ? (
          <Form
            callback={this.updatePosts.bind(this)}
            toggle={this.togglePostForm.bind(this)}
            url="/api/posts"
            resource="post"
            fields={this.postFields}
          />
        ) : null}
      </div>
    );
  }
}

PostsPage.propTypes = {
  currentUser: PropTypes.object
};

export default PostsPage;
