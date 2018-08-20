import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Post from "../posts/Post";
import PostList from "../posts/PostList";
import UpdatePostForm from "../posts/UpdatePostForm";
import NewPostForm from "../posts/NewPostForm";
import AdminControls from "../layout/AdminControls";
import { CurrentUserConsumer } from "../../CurrentUser";

export default class PostsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      index: 0,
      showFetchPostForm: false,
      showUpdatePostForm: false
    };
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

  deletePost(id) {
    axios
      .delete(`/api/posts/${id}`)
      .then(response => {
        var updatedPosts = this.state.posts.slice();
        updatedPosts.splice(this.state.index, 1);
        this.setState({ posts: updatedPosts, index: this.previousIndex() });
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

  handlePostUpdate(response) {
    const newPost = response["data"]["post"];
    var posts = this.state.posts.slice();
    const newPostIndex = posts.findIndex(function(post) {
      return post.id == newPost.id;
    });

    posts.splice(newPostIndex, 1, newPost);
    this.setState({ posts: posts });
  }

  toggleFetchPostForm() {
    this.setState({ showFetchPostForm: !this.state.showFetchPostForm });
  }

  toggleUpdatePostForm() {
    this.setState({ showUpdatePostForm: !this.state.showUpdatePostForm });
  }

  render() {
    return (
      <CurrentUserConsumer>
        {context => {
          const { user } = context.state;

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
              {user && user.admin ? (
                <AdminControls>
                  <i
                    className="fa fa-edit fa-lg"
                    onClick={this.toggleUpdatePostForm.bind(this)}
                  />
                  <i
                    className="fa fa-trash fa-lg"
                    onClick={() => this.deletePost(this.currentPost().id)}
                  />
                  <i
                    className="fa fa-file fa-lg"
                    onClick={this.toggleFetchPostForm.bind(this)}
                  />
                </AdminControls>
              ) : null}
              {this.state.showFetchPostForm ? (
                <NewPostForm
                  callback={this.updatePosts.bind(this)}
                  toggle={this.toggleFetchPostForm.bind(this)}
                />
              ) : null}
              {this.state.showUpdatePostForm ? (
                <UpdatePostForm
                  toggle={this.toggleUpdatePostForm.bind(this)}
                  post={this.currentPost()}
                  callback={this.handlePostUpdate.bind(this)}
                />
              ) : null}
            </div>
          );
        }}
      </CurrentUserConsumer>
    );
  }
}
