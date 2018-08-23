import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Post from "../posts/Post";
import PostList from "../posts/PostList";
import UpdatePostForm from "../posts/UpdatePostForm";
import NewPostForm from "../posts/NewPostForm";
import AdminControls from "../layout/AdminControls";
import DeletePostButton from "../posts/DeletePostButton";
import { CurrentUserConsumer } from "../../CurrentUser";

export default class PostsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      currentIndex: 0,
      showNewPostForm: false,
      showUpdatePostForm: false
    };
    this.changeCurrentPostIndex = this.changeCurrentPostIndex.bind(this);
    this.toggleUpdatePostForm = this.toggleUpdatePostForm.bind(this);
    this.toggleNewPostForm = this.toggleNewPostForm.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleUpdatePost = this.handleUpdatePost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  fetchPosts() {
    axios
      .get("/api/posts")
      .then(response => {
        this.setState({ posts: response.data.posts });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  changeCurrentPostIndex(newIndex) {
    this.setState({ currentIndex: newIndex });
  }

  currentPost() {
    return this.state.posts[this.state.currentIndex] || {};
  }

  handleDeletePost(deletedPostId) {
    var posts = this.state.posts.slice();
    const deletedPostIndex = posts.findIndex(post => {
      return post.id === deletedPostId;
    });

    posts.splice(deletedPostIndex, 1);
    this.setState(prevState => ({
      posts: posts,
      currentIndex: prevState.currentIndex - 1
    }));
  }

  handleCreatePost(newPost) {
    var posts = this.state.posts.slice();
    posts.push(newPost);
    this.setState({ posts: posts });
  }

  handleUpdatePost(updatedPost) {
    var posts = this.state.posts.slice();
    const updatedPostIndex = posts.findIndex(post => {
      return post.id === updatedPost.id;
    });

    posts.splice(updatedPostIndex, 1, updatedPost);
    this.setState({ posts: posts });
  }

  toggleNewPostForm() {
    this.setState(prevState => ({
      showNewPostForm: !prevState.showNewPostForm
    }));
  }

  toggleUpdatePostForm() {
    this.setState(prevState => ({
      showUpdatePostForm: !prevState.showUpdatePostForm
    }));
  }

  render() {
    const currentPost = this.currentPost();
    const { posts, showNewPostForm, showUpdatePostForm } = this.state;

    return (
      <CurrentUserConsumer>
        {context => {
          const { user } = context.state;

          return (
            <div className="content">
              <PostList
                posts={posts}
                currentPost={currentPost}
                changeCurrentPostIndex={this.changeCurrentPostIndex}
              />
              <Post post={currentPost} />
              {user && user.admin ? (
                <AdminControls>
                  <i
                    className="fa fa-edit fa-lg"
                    onClick={this.toggleUpdatePostForm}
                  />
                  <DeletePostButton
                    post={currentPost}
                    handleDeletePost={this.handleDeletePost}
                  />
                  <i
                    className="fa fa-file fa-lg"
                    onClick={this.toggleNewPostForm}
                  />
                </AdminControls>
              ) : null}
              {showNewPostForm ? (
                <NewPostForm
                  handleCreatePost={this.handleCreatePost}
                  toggle={this.toggleNewPostForm}
                />
              ) : null}
              {showUpdatePostForm ? (
                <UpdatePostForm
                  toggle={this.toggleUpdatePostForm}
                  post={currentPost}
                  handleUpdatePost={this.handleUpdatePost}
                />
              ) : null}
            </div>
          );
        }}
      </CurrentUserConsumer>
    );
  }
}
